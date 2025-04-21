import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const videoId = body.videoId;

    if (!videoId) {
      return NextResponse.json(
        { error: "Video ID is required." },
        { status: 400 }
      );
    }

    // Query with "AND is_poster:true" to fetch only poster thumbnails
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
      const errorData = await response.json();
      console.error("Error fetching thumbnails:", errorData);
      return NextResponse.json(errorData, { status: response.status });
    }

    const data = await response.json();

    // Filter thumbnails for "static" and "motion"
    const staticThumbnail =
      data.thumbnails.find((thumb: any) => thumb.thumbnail_type === "static")
        ?.delivery_url || null;

    const motionThumbnail =
      data.thumbnails.find((thumb: any) => thumb.thumbnail_type === "video")
        ?.delivery_url || null;

    return NextResponse.json({
      static_thumbnail_url: staticThumbnail,
      motion_thumbnail_url: motionThumbnail,
    });
  } catch (error) {
    console.error("Error fetching thumbnails:", error);
    return NextResponse.json(
      { error: "Failed to fetch thumbnails." },
      { status: 500 }
    );
  }
}
