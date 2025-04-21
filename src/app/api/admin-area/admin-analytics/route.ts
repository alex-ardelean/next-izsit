import { NextResponse } from "next/server";
import { withAdminErrorHandling } from "../../../../hoc/withAdminErrorHandling";

const inplayerBaseUrl = "https://services.inplayer.com";
const jwplayerBaseUrl = "https://api.jwplayer.com/v2";

const JWPLAYER_API_KEY = process.env.JWPLAYER_API_KEY;
const JWPLAYER_SITE_ID = process.env.JWPLAYER_SITE_ID;

export const GET = withAdminErrorHandling(async (req: Request) => {
  const tokenHeader = req.headers.get("Authorization");
  if (!tokenHeader) {
    return NextResponse.json(
      { error: "Authorization header is required." },
      { status: 401 }
    );
  }

  const token = tokenHeader.split(" ")[1];
  if (!token) {
    return NextResponse.json(
      { error: "Invalid Authorization header." },
      { status: 401 }
    );
  }

  // Extract `timeframe` from query parameters
  const url = new URL(req.url);
  const timeframe = url.searchParams.get("timeframe") || "7 Days";

  const size = 50;
  let page = 0;
  let allCreators = [];
  let totalFetched = 0;
  let total = 0;

  // Step 1: Fetch creators
  while (true) {
    const response = await fetch(
      `${inplayerBaseUrl}/accounts/registered-users?page=${page}&size=${size}&active=true`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (!response.ok) {
      console.error("Error fetching registered users:", await response.text());
      return NextResponse.json(
        { error: "Failed to fetch registered users." },
        { status: 500 }
      );
    }

    const data = await response.json();
    const { total: apiTotal, collection } = data;

    if (page === 0) total = apiTotal;

    const creators = collection.filter(
      (user) =>
        user.metadata?.account_role === "creator" &&
        user.metadata?.register_source === "inplayer"
    );

    allCreators = [...allCreators, ...creators];
    totalFetched += collection.length;

    if (totalFetched >= total || collection.length === 0) break;

    page++;
  }

  // Step 2: Fetch media for all creators
  const mediaResponse = await fetch(
    `${jwplayerBaseUrl}/sites/${JWPLAYER_SITE_ID}/media?page=1&page_length=10000`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${JWPLAYER_API_KEY}`,
      },
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
  const mediaByCreator: { [creatorId: string]: string[] } = {};
  mediaData.media.forEach((media: any) => {
    const creatorId = media.metadata?.custom_params?.inplayer_user_id;
    if (creatorId) {
      if (!mediaByCreator[creatorId]) {
        mediaByCreator[creatorId] = [];
      }
      mediaByCreator[creatorId].push(media.id);
    }
  });

  // Step 3: Fetch analytics in chunks using Promise.all
  const allMediaIds = Object.values(mediaByCreator).flat();
  const chunkSize = 10; // Adjust based on API limits
  const mediaChunks = chunkArray(allMediaIds, chunkSize);

  const playsByMedia: { [mediaId: string]: number } = {};

  const analyticsPromises = mediaChunks.map(async (chunk) => {
    const filters = chunk.map((mediaId) => ({
      field: "media_id",
      operator: "=",
      value: [mediaId], // Wrap the mediaId in an array
    }));

    try {
      const analyticsResponse = await fetch(
        `${jwplayerBaseUrl}/sites/${JWPLAYER_SITE_ID}/analytics/queries?format=json`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JWPLAYER_API_KEY}`,
          },
          body: JSON.stringify({
            metrics: [{ operation: "sum", field: "plays" }], // Only fetching "plays"
            dimensions: ["media_id"],
            filter: filters,
            relative_timeframe: timeframe,
          }),
        }
      );

      if (analyticsResponse.ok) {
        const analyticsData = await analyticsResponse.json();
        analyticsData.data?.rows.forEach(([mediaId, plays]) => {
          playsByMedia[mediaId] = plays; // Map plays to mediaId
        });
      } else {
        console.error(
          "Error fetching analytics:",
          await analyticsResponse.text()
        );
      }
    } catch (error) {
      console.error("Error fetching analytics for chunk:", error.message);
    }
  });

  // Await all analytics promises
  await Promise.all(analyticsPromises);

  // Step 4: Aggregate plays by creator
  const playsByCreator: { [creatorId: string]: number } = {};
  for (const [creatorId, mediaIds] of Object.entries(mediaByCreator)) {
    playsByCreator[creatorId] = mediaIds.reduce(
      (sum, mediaId) => sum + (playsByMedia[mediaId] || 0),
      0
    );
  }

  // Step 5: Map creators with play counts
  const creatorsWithViews = allCreators.map((creator) => ({
    id: creator.id,
    full_name: creator.full_name,
    plays: playsByCreator[creator.id] || 0, // Default to 0 if no plays
  }));

  return NextResponse.json({ creators: creatorsWithViews });
});

// Helper to chunk an array into smaller parts
function chunkArray(array: any[], chunkSize: number): any[][] {
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
}
