import { NextResponse } from "next/server";

// Helper function for fetch with timeout
const fetchWithTimeout = async (
  url: string,
  options: RequestInit = {},
  timeout = 5000
): Promise<Response> => {
  return Promise.race([
    fetch(url, options),
    new Promise<Response>((_, reject) =>
      setTimeout(() => reject(new Error("Request timeout")), timeout)
    ),
  ]);
};

// Function to fetch all user videos
async function fetchAllUserVideos(
  userId: string,
  JW_MEDIA_API_URL: string,
  JW_API_KEY: string
): Promise<any[]> {
  const allVideos: any[] = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const response = await fetchWithTimeout(
      `${JW_MEDIA_API_URL}?q=custom_params:(name: "inplayer_user_id" AND value: "${userId}")&page=${page}&page_length=50`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${JW_API_KEY}`,
          "Content-Type": "application/json",
        },
      },
      5000 // 5-second timeout
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("JW Player API Error (Media):", errorData);
      throw new Error("Failed to fetch user videos.");
    }

    const data = await response.json();
    allVideos.push(...data.media);

    // Check if there are more videos to fetch
    hasMore = data.media.length === 50;
    page++;
  }

  return allVideos;
}

// Main POST handler
export async function POST(request: Request) {
  try {
    const {
      userId,
      timeframe,
      page = 1,
      pageLength = 10,
    }: {
      userId: string;
      timeframe: string;
      page: number;
      pageLength: number;
    } = await request.json();

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required." },
        { status: 400 }
      );
    }

    const JW_SITE_ID = process.env.JWPLAYER_SITE_ID!;
    const JW_API_KEY = process.env.JWPLAYER_API_KEY!;
    const JW_MEDIA_API_URL = `https://api.jwplayer.com/v2/sites/${JW_SITE_ID}/media/`;
    const JW_ANALYTICS_API_URL = `https://api.jwplayer.com/v2/sites/${JW_SITE_ID}/analytics/queries?format=json`;

    // Fetch all user's videos
    const allVideos = await fetchAllUserVideos(
      userId,
      JW_MEDIA_API_URL,
      JW_API_KEY
    );

    // Filter and paginate videos
    const filteredMedia = allVideos.filter(
      (item) => item.metadata?.custom_params?.contentType !== "series"
    );
    const paginatedMedia = filteredMedia.slice(
      (page - 1) * pageLength,
      page * pageLength
    );

    const userVideoIds = filteredMedia.map((video) => video.id);
    const paginatedVideoIds = paginatedMedia.map((video) => video.id);
    const totalVideos = filteredMedia.length;

    if (userVideoIds.length === 0) {
      return NextResponse.json(
        {
          totalVideos: 0,
          dailyStats: [],
          perVideoStats: [],
          message: "No videos found for the user.",
        },
        { status: 200 }
      );
    }

    // Fetch overall analytics
    const overallBody = {
      dimensions: ["media_id", "eastern_date"],
      metrics: [
        { operation: "sum", field: "plays" },
        { operation: "sum", field: "completes" },
      ],
      filter: [
        {
          field: "media_id",
          operator: "=",
          value: userVideoIds,
        },
      ],
      sort: [{ field: "eastern_date", order: "ASCENDING" }],
      page_length: 100,
      relative_timeframe: timeframe || "30 Days",
    };

    const overallAnalyticsResponse = await fetchWithTimeout(
      JW_ANALYTICS_API_URL,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JW_API_KEY}`,
        },
        body: JSON.stringify(overallBody),
      },
      5000
    );

    if (!overallAnalyticsResponse.ok) {
      const errorResponse = await overallAnalyticsResponse.json();
      throw new Error(
        errorResponse.message || "Failed to fetch overall analytics."
      );
    }

    const overallAnalyticsData = await overallAnalyticsResponse.json();

    // Group and aggregate daily stats
    const dailyStatsMap = overallAnalyticsData.data?.rows.reduce(
      (acc: any, row: any) => {
        const [_, date, plays, completes] = row;
        if (!acc[date]) {
          acc[date] = { date, plays: 0, completes: 0 };
        }
        acc[date].plays += plays;
        acc[date].completes += completes;
        return acc;
      },
      {}
    );

    const dailyStats = Object.values(dailyStatsMap);

    // Fetch paginated analytics
    const paginatedBody = {
      dimensions: ["media_id", "eastern_date"],
      metrics: [
        { operation: "sum", field: "plays" },
        { operation: "sum", field: "completes" },
      ],
      filter: [
        {
          field: "media_id",
          operator: "=",
          value: paginatedVideoIds,
        },
      ],
      sort: [{ field: "eastern_date", order: "ASCENDING" }],
      page_length: 100,
      relative_timeframe: timeframe || "30 Days",
    };

    const paginatedAnalyticsResponse = await fetchWithTimeout(
      JW_ANALYTICS_API_URL,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JW_API_KEY}`,
        },
        body: JSON.stringify(paginatedBody),
      },
      5000
    );

    if (!paginatedAnalyticsResponse.ok) {
      const errorResponse = await paginatedAnalyticsResponse.json();
      throw new Error(
        errorResponse.message || "Failed to fetch paginated analytics."
      );
    }

    const paginatedAnalyticsData = await paginatedAnalyticsResponse.json();

    // Group stats for paginated videos
    const groupedStats = paginatedVideoIds.reduce((acc: any, id: string) => {
      acc[id] = [];
      return acc;
    }, {});

    paginatedAnalyticsData.data?.rows.forEach((row: any) => {
      const [mediaId, date, plays] = row;
      if (groupedStats[mediaId]) {
        groupedStats[mediaId].push({ date, plays });
      }
    });

    const enrichedRows = paginatedMedia.map((video) => ({
      mediaId: video.id,
      title: video.metadata?.title || "Untitled Video",
      stats: groupedStats[video.id],
    }));

    return NextResponse.json({
      totalVideos,
      dailyStats,
      perVideoStats: enrichedRows,
    });
  } catch (error: any) {
    console.error("Error fetching analytics:", error.message);
    return NextResponse.json(
      { error: error.message || "An error occurred while fetching analytics." },
      { status: error.message.includes("timeout") ? 504 : 500 }
    );
  }
}
