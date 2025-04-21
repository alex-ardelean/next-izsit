// src/app/api/admin-area/content-type-analytics/page.ts
import { NextResponse } from "next/server";
import { withAdminErrorHandling } from "../../../../hoc/withAdminErrorHandling";

const jwplayerBaseUrl = "https://api.jwplayer.com/v2";
const JWPLAYER_API_KEY = process.env.JWPLAYER_API_KEY;
const JWPLAYER_SITE_ID = process.env.JWPLAYER_SITE_ID;

// Helper: format a Date object as YYYY-MM-DD
function formatDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// Helper: Chunk an array into smaller arrays.
function chunkArray(array: any[], chunkSize: number): any[][] {
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
}

export const GET = withAdminErrorHandling(async (req: Request) => {
  // Get query parameters.
  const { searchParams } = new URL(req.url);
  const timeframe = searchParams.get("timeframe") || "7 Days";

  // Compute explicit start_date and end_date.
  const endDate = new Date();
  const days = timeframe === "30 Days" ? 30 : 7;
  const startDate = new Date();
  startDate.setDate(endDate.getDate() - days);
  const start_date_str = formatDate(startDate);
  const end_date_str = formatDate(endDate);

  // STEP 1: Fetch all media items.
  const mediaResponse = await fetch(
    `${jwplayerBaseUrl}/sites/${JWPLAYER_SITE_ID}/media?page=1&page_length=10000`,
    {
      method: "GET",
      headers: { Authorization: `Bearer ${JWPLAYER_API_KEY}` },
    }
  );
  if (!mediaResponse.ok) {
    console.error("Error fetching media:", await mediaResponse.text());
    throw { message: "Failed to fetch media.", status: 500 };
  }
  const mediaData = await mediaResponse.json();
  const allMedia = mediaData.media || [];

  // STEP 2: Group media items by contentType.
  const mediaByContentType: { [contentType: string]: string[] } = {};
  allMedia.forEach((media: any) => {
    const contentType = media.metadata?.custom_params?.contentType || "unknown";
    if (!mediaByContentType[contentType]) {
      mediaByContentType[contentType] = [];
    }
    mediaByContentType[contentType].push(media.id);
  });

  // STEP 3: Flatten media IDs.
  const allMediaIds = Object.values(mediaByContentType).flat();
  const chunkSize = 10;
  const mediaChunks = chunkArray(allMediaIds, chunkSize);
  const analyticsByMedia: {
    [mediaId: string]: { plays: number; watch_time: number };
  } = {};

  // STEP 4: Fetch analytics in chunks.
  const analyticsPromises = mediaChunks.map(async (chunk) => {
    const filters = chunk.map((mediaId) => ({
      field: "media_id",
      operator: "=",
      value: [mediaId],
    }));
    const body = {
      include_metadata: 0,
      metrics: [
        { operation: "sum", field: "plays" },
        { operation: "sum", field: "minutes_delivered_live" },
        { operation: "sum", field: "minutes_delivered_vod" },
      ],
      dimensions: ["media_id"],
      filter: filters,
      start_date: start_date_str,
      end_date: end_date_str,
    };

    const analyticsResponse = await fetch(
      `${jwplayerBaseUrl}/sites/${JWPLAYER_SITE_ID}/analytics/queries?format=json&source=ott_cdn`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JWPLAYER_API_KEY}`,
        },
        body: JSON.stringify(body),
      }
    );
    if (analyticsResponse.ok) {
      const analyticsData = await analyticsResponse.json();
      analyticsData.data?.rows.forEach((row: any) => {
        const [mediaId, plays, minutes_live, minutes_vod] = row;
        analyticsByMedia[mediaId] = {
          plays: plays || 0,
          watch_time: (minutes_live || 0) + (minutes_vod || 0),
        };
      });
    } else {
      console.error(
        "Error fetching analytics:",
        await analyticsResponse.text()
      );
    }
  });
  await Promise.all(analyticsPromises);

  // STEP 5: Aggregate analytics by contentType.
  const aggregatedByContentType: {
    [contentType: string]: { plays: number; watch_time: number };
  } = {};
  for (const [contentType, mediaIds] of Object.entries(mediaByContentType)) {
    aggregatedByContentType[contentType] = mediaIds.reduce(
      (acc, mediaId) => {
        const metrics = analyticsByMedia[mediaId] || {
          plays: 0,
          watch_time: 0,
        };
        acc.plays += metrics.plays;
        acc.watch_time += metrics.watch_time;
        return acc;
      },
      { plays: 0, watch_time: 0 }
    );
  }

  // STEP 6: Prepare the final response.
  let contentTypeAnalytics = Object.entries(aggregatedByContentType)
    .map(([contentType, metrics]) => ({
      contentType,
      plays: metrics.plays,
      watch_time: metrics.watch_time,
    }))
    .filter(
      (item) => item.contentType !== "hub" && item.contentType !== "series"
    );

  const totalPlays = contentTypeAnalytics.reduce(
    (acc, item) => acc + item.plays,
    0
  );
  const totalWatchTime = contentTypeAnalytics.reduce(
    (acc, item) => acc + item.watch_time,
    0
  );
  contentTypeAnalytics = contentTypeAnalytics.map((item) => ({
    ...item,
    plays_percent: totalPlays > 0 ? (item.plays / totalPlays) * 100 : 0,
    watch_time_percent:
      totalWatchTime > 0 ? (item.watch_time / totalWatchTime) * 100 : 0,
  }));

  return NextResponse.json({
    timeframe,
    totals: { plays: totalPlays, watch_time: totalWatchTime },
    analytics: contentTypeAnalytics.sort((a, b) => b.plays - a.plays),
  });
});
