import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { videoId } = await request.json();

    if (!videoId) {
      return NextResponse.json(
        { error: "Video ID is required." },
        { status: 400 }
      );
    }

    const JW_SITE_ID = process.env.JWPLAYER_SITE_ID;
    const JW_API_KEY = process.env.JWPLAYER_API_KEY;
    const JW_MEDIA_API_URL = `https://api.jwplayer.com/v2/sites/${JW_SITE_ID}/media/${videoId}/`;

    const videoResponse = await fetch(JW_MEDIA_API_URL, {
      headers: {
        Authorization: `Bearer ${JW_API_KEY}`,
      },
    });

    if (!videoResponse.ok) {
      return NextResponse.json(
        { error: `Failed to fetch video details for ID: ${videoId}` },
        { status: videoResponse.status }
      );
    }

    const videoData = await videoResponse.json();

    return NextResponse.json({
      id: videoData.id,
      title: videoData.metadata?.title || "Untitled Video",
      description:
        videoData.metadata?.description || "No description available",
      duration: videoData.duration || 0,
      parentalRating:
        videoData.metadata?.custom_params?.parental_rating || "NR",
      thumbnail: videoData.metadata?.images?.poster?.url || null,
    });
  } catch (error) {
    console.error("Error fetching video details:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching video details." },
      { status: 500 }
    );
  }
}
