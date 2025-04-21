import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { userId } = await request.json();
    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required." },
        { status: 400 }
      );
    }

    const JW_SITE_ID = process.env.JWPLAYER_SITE_ID;
    const JW_API_KEY = process.env.JWPLAYER_API_KEY;
    const JW_MEDIA_API_URL = `https://api.jwplayer.com/v2/sites/${JW_SITE_ID}/media/`;
    const JW_SERIES_API_URL = `https://api.jwplayer.com/v2/sites/${JW_SITE_ID}/series/`;
    const JW_THUMBNAILS_API_URL = `https://api.jwplayer.com/v2/sites/${JW_SITE_ID}/thumbnails/`;

    const query = encodeURIComponent(
      `custom_params:(name:"contentType" AND value:"series") AND custom_params:(name:"inplayer_user_id" AND value:"${userId}")`
    );
    const url = `${JW_MEDIA_API_URL}?q=${query}&page=1&page_length=50`;

    const mediaResponse = await fetch(url, {
      headers: {
        Authorization: `Bearer ${JW_API_KEY}`,
      },
    });

    if (!mediaResponse.ok) {
      return NextResponse.json(
        { error: "Failed to fetch media." },
        { status: mediaResponse.status }
      );
    }

    const mediaData = await mediaResponse.json();
    const seriesList = mediaData.media || [];

    // Fetch thumbnails for all series IDs in bulk
    const thumbnails = await Promise.all(
      seriesList.map(async (series) => {
        try {
          const response = await fetch(
            `${JW_THUMBNAILS_API_URL}?q=media_id:+${series.id}+AND+is_poster:true`,
            {
              headers: {
                Authorization: `Bearer ${JW_API_KEY}`,
              },
            }
          );

          if (!response.ok) {
            console.error(
              `Failed to fetch thumbnail for series ID: ${series.id}`
            );
            return {
              id: series.id,
              staticThumbnail: null,
              motionThumbnail: null,
            };
          }

          const data = await response.json();
          const staticThumbnail =
            data.thumbnails.find((thumb) => thumb.thumbnail_type === "static")
              ?.delivery_url || null;
          const motionThumbnail =
            data.thumbnails.find((thumb) => thumb.thumbnail_type === "video")
              ?.delivery_url || null;

          return { id: series.id, staticThumbnail, motionThumbnail };
        } catch (error) {
          console.error(
            `Error fetching thumbnails for series ID: ${series.id}`,
            error
          );
          return {
            id: series.id,
            staticThumbnail: null,
            motionThumbnail: null,
          };
        }
      })
    );

    const thumbnailsMap = thumbnails.reduce((acc, thumb) => {
      acc[thumb.id] = {
        staticThumbnail: thumb.staticThumbnail,
        motionThumbnail: thumb.motionThumbnail,
      };
      return acc;
    }, {});

    const seriesDetails = await Promise.all(
      seriesList.map(async (series) => {
        const seriesId = series.id;

        // Fetch relationships (related videos) for the series
        const seriesDetailResponse = await fetch(
          `${JW_SERIES_API_URL}${seriesId}`,
          {
            headers: {
              Authorization: `Bearer ${JW_API_KEY}`,
            },
          }
        );

        let videoCount = 0;
        if (seriesDetailResponse.ok) {
          const seriesDetailData = await seriesDetailResponse.json();
          videoCount = seriesDetailData.relationships?.media?.length || 0;
        }

        // Get thumbnails for this series
        const { staticThumbnail, motionThumbnail } =
          thumbnailsMap[seriesId] || {};

        return {
          id: seriesId,
          title: series.metadata?.title || `Series ${seriesId}`,
          description:
            series.metadata?.description || "No description available",
          mainGenre: series.metadata?.custom_params?.main_genre || "Unknown",
          parentalRating:
            series.metadata?.custom_params?.parental_rating || "NR",
          staticThumbnail: staticThumbnail || null,
          motionThumbnail: motionThumbnail || null,
          videoCount,
        };
      })
    );

    return NextResponse.json({
      series: seriesDetails.filter((series) => series !== null),
    });
  } catch (error) {
    console.error("Error fetching series:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching series." },
      { status: 500 }
    );
  }
}
