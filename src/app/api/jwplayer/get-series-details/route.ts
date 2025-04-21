import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const seriesId = searchParams.get("id");

  if (!seriesId) {
    return NextResponse.json(
      { error: "Series ID is required." },
      { status: 400 }
    );
  }

  try {
    const JW_SITE_ID = process.env.JWPLAYER_SITE_ID;
    const JW_API_KEY = process.env.JWPLAYER_API_KEY;
    const JW_MEDIA_API_URL = `https://api.jwplayer.com/v2/sites/${JW_SITE_ID}/media/`;
    const JW_SERIES_API_URL = `https://api.jwplayer.com/v2/sites/${JW_SITE_ID}/series/${seriesId}`;

    // Fetch series metadata from media API
    const mediaResponse = await fetch(`${JW_MEDIA_API_URL}${seriesId}`, {
      headers: {
        Authorization: `Bearer ${JW_API_KEY}`,
      },
    });

    if (!mediaResponse.ok) {
      return NextResponse.json(
        { error: "Failed to fetch series metadata." },
        { status: mediaResponse.status }
      );
    }

    const mediaData = await mediaResponse.json();

    // Fetch series details for relationships
    const seriesResponse = await fetch(JW_SERIES_API_URL, {
      headers: {
        Authorization: `Bearer ${JW_API_KEY}`,
      },
    });

    if (!seriesResponse.ok) {
      return NextResponse.json(
        { error: "Failed to fetch series relationships." },
        { status: seriesResponse.status }
      );
    }

    const seriesData = await seriesResponse.json();

    // Extract related video IDs
    const videoIds =
      seriesData.relationships?.media?.map(
        (media: { id: string }) => media.id
      ) || [];

    // Fetch detailed video metadata if there are video IDs
    const videoDetails =
      videoIds.length > 0
        ? await Promise.all(
            videoIds.map(async (videoId: string) => {
              const videoResponse = await fetch(
                `${JW_MEDIA_API_URL}${videoId}/`,
                {
                  headers: {
                    Authorization: `Bearer ${JW_API_KEY}`,
                  },
                }
              );

              if (!videoResponse.ok) {
                console.error(
                  `Failed to fetch video details for ID: ${videoId}`
                );
                return null;
              }

              const videoData = await videoResponse.json();

              return {
                id: videoData.id,
                title: videoData.metadata?.title || "Untitled Video",
                description:
                  videoData.metadata?.description || "No description",
                duration: videoData.duration || 0,
                parentalRating:
                  videoData.metadata?.custom_params?.parental_rating || "NR",
                thumbnail: videoData.metadata?.images?.poster?.url || null,
              };
            })
          )
        : [];

    return NextResponse.json({
      series: {
        id: mediaData.id,
        title: mediaData.metadata?.title || "Untitled Series",
        description: mediaData.metadata?.description || "No description",
        mainGenre: mediaData.metadata?.custom_params?.main_genre || "Unknown",
        parentalRating:
          mediaData.metadata?.custom_params?.parental_rating || "NR",
        contentType: mediaData.metadata?.custom_params?.contentType || "series",
      },
      videos: videoDetails.filter((video) => video !== null), // Filter out null entries
    });
  } catch (error) {
    console.error("Error fetching series details:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching series details." },
      { status: 500 }
    );
  }
}
