import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const videoIds = body.videoIds;

    if (!Array.isArray(videoIds) || videoIds.length === 0) {
      return NextResponse.json(
        {
          error:
            "Invalid request format. 'videoIds' must be a non-empty array.",
        },
        { status: 400 }
      );
    }

    // Fetch thumbnails for all video IDs
    const thumbnails = await Promise.all(
      videoIds.map(async (videoId) => {
        try {
          const response = await fetch(
            `https://api.jwplayer.com/v2/sites/${process.env.JWPLAYER_SITE_ID}/thumbnails/?q=media_id:+${videoId}+AND+is_poster:true`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${process.env.JWPLAYER_API_KEY}`,
              },
            }
          );

          if (!response.ok) {
            console.error(`Failed to fetch thumbnail for video ID: ${videoId}`);
            return {
              id: videoId,
              static_thumbnail_url: null,
              motion_thumbnail_url: null,
            };
          }

          const data = await response.json();

          // Extract static and motion thumbnails
          const staticThumbnail =
            data.thumbnails.find(
              (thumb: any) => thumb.thumbnail_type === "static"
            )?.delivery_url || null;

          const motionThumbnail =
            data.thumbnails.find(
              (thumb: any) => thumb.thumbnail_type === "video"
            )?.delivery_url || null;

          return {
            id: videoId,
            static_thumbnail_url: staticThumbnail,
            motion_thumbnail_url: motionThumbnail,
          };
        } catch (error) {
          console.error(
            `Error fetching thumbnail for video ID: ${videoId}`,
            error
          );
          return {
            id: videoId,
            static_thumbnail_url: null,
            motion_thumbnail_url: null,
          };
        }
      })
    );

    return NextResponse.json({ thumbnails });
  } catch (error) {
    console.error("Error fetching thumbnails:", error);
    return NextResponse.json(
      { error: "Failed to fetch thumbnails." },
      { status: 500 }
    );
  }
}
