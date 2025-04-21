// src/app/api/admin-area/graph-analytics/route.ts

import { NextResponse } from "next/server";

const jwplayerBaseUrl = "https://api.jwplayer.com/v2";
const JWPLAYER_API_KEY = process.env.JWPLAYER_API_KEY;
const JWPLAYER_SITE_ID = process.env.JWPLAYER_SITE_ID;

/**
 * Formats a Date object as YYYY-MM-DD.
 */
function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * Returns an array of date strings (YYYY-MM-DD) between startDate and endDate (inclusive).
 */
function getDatesBetween(startDate: Date, endDate: Date): string[] {
  const dates: string[] = [];
  let current = new Date(startDate);
  while (current <= endDate) {
    dates.push(formatDate(current));
    current.setDate(current.getDate() + 1);
  }
  return dates;
}

export async function GET(req: Request) {
  try {
    // Parse timeframe from query parameters (default: "7 Days")
    const { searchParams } = new URL(req.url);
    const timeframe = searchParams.get("timeframe") || "7 Days";

    // Determine the date range.
    const endDate = new Date();
    let days = 7;
    if (timeframe === "30 Days") {
      days = 30;
    }
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - days);
    const start_date_str = formatDate(startDate);
    const end_date_str = formatDate(endDate);

    // Create a full date range array to "fill in" missing days.
    const fullDateRange = getDatesBetween(startDate, endDate);

    // STEP 1: Fetch all media items for the site.
    const mediaResponse = await fetch(
      `${jwplayerBaseUrl}/sites/${JWPLAYER_SITE_ID}/media?page=1&page_length=10000`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${JWPLAYER_API_KEY}` },
      }
    );
    if (!mediaResponse.ok) {
      console.error("Error fetching media:", await mediaResponse.text());
      return NextResponse.json(
        { error: "Failed to fetch media." },
        { status: 500 }
      );
    }
    const mediaData = await mediaResponse.json();
    const allMedia = mediaData.media || [];

    // STEP 2: Build a mapping: mediaId => contentType.
    const mediaIdToContentType: { [mediaId: string]: string } = {};
    allMedia.forEach((media: any) => {
      const contentType =
        media.metadata?.custom_params?.contentType || "unknown";
      mediaIdToContentType[media.id] = contentType;
    });
    const mediaIds = Object.keys(mediaIdToContentType);
    if (mediaIds.length === 0) {
      return NextResponse.json({ timeframe, data: [] });
    }

    // Helper: Chunk an array into smaller arrays.
    function chunkArray<T>(array: T[], chunkSize: number): T[][] {
      const chunks = [];
      for (let i = 0; i < array.length; i += chunkSize) {
        chunks.push(array.slice(i, i + chunkSize));
      }
      return chunks;
    }
    const mediaChunks = chunkArray(mediaIds, 10);

    // STEP 3: Query OTT analytics for each chunk using dimensions ["localized_date", "media_id"].
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
        // Use "localized_date" to group by day
        dimensions: ["localized_date", "media_id"],
        start_date: start_date_str,
        end_date: end_date_str,
      };

      try {
        const response = await fetch(
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
        if (!response.ok) {
          const errorText = await response.text();
          console.error("Error fetching analytics for chunk:", errorText);
          return [];
        }
        const data = await response.json();
        return data.data?.rows || [];
      } catch (error: any) {
        console.error("Error fetching analytics for chunk:", error.message);
        return [];
      }
    });
    const rowsArrays = await Promise.all(analyticsPromises);
    const analyticsRows = rowsArrays.flat();

    // STEP 4: Group rows by content type and date.
    // Each row is expected in the format:
    // [localized_date, media_id, sum(plays), sum(minutes_delivered_live), sum(minutes_delivered_vod)]
    const groupedData: {
      [contentType: string]: {
        [date: string]: { plays: number; watch_time: number };
      };
    } = {};

    analyticsRows.forEach((row) => {
      const [localized_date, media_id, plays, minutes_live, minutes_vod] = row;
      const contentType = mediaIdToContentType[media_id] || "unknown";
      if (!groupedData[contentType]) {
        groupedData[contentType] = {};
      }
      if (!groupedData[contentType][localized_date]) {
        groupedData[contentType][localized_date] = { plays: 0, watch_time: 0 };
      }
      groupedData[contentType][localized_date].plays += plays || 0;
      groupedData[contentType][localized_date].watch_time +=
        (minutes_live || 0) + (minutes_vod || 0);
    });

    // STEP 5: For each content type, fill in missing dates with zeros.
    const resultData = Object.entries(groupedData).map(
      ([contentType, dailyObj]) => {
        const dailyComplete = fullDateRange.map((date) => {
          if (dailyObj[date]) {
            return {
              date,
              plays: dailyObj[date].plays,
              watch_time: parseFloat(dailyObj[date].watch_time.toFixed(1)),
            };
          } else {
            return { date, plays: 0, watch_time: 0 };
          }
        });
        // Sort by date (fullDateRange is already sorted, but this ensures consistency)
        dailyComplete.sort((a, b) => a.date.localeCompare(b.date));
        return { contentType, daily: dailyComplete };
      }
    );

    return NextResponse.json({ timeframe, data: resultData });
  } catch (error: any) {
    console.error("Error in graph analytics:", error.message);
    return NextResponse.json(
      { error: "An error occurred while fetching graph analytics." },
      { status: 500 }
    );
  }
}
