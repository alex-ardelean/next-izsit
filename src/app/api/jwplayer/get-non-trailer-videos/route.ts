import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { inplayer_user_id } = await request.json();

    if (!inplayer_user_id) {
      return NextResponse.json(
        { error: "inplayer_user_id is required." },
        { status: 400 }
      );
    }

    // Construct JW Player API URL with a filter for the user ID
    const JW_API_URL = `https://api.jwplayer.com/v2/sites/${process.env.JWPLAYER_SITE_ID}/media/?page=1&page_length=50&q=custom_params:(name: "inplayer_user_id" AND value: "${inplayer_user_id}")`;

    // Fetch media from JW Player API
    const response = await fetch(JW_API_URL, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.JWPLAYER_API_KEY}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("JW Player API Error:", errorData);
      throw new Error("Failed to fetch media.");
    }

    const data = await response.json();

    // Filter out trailers based on `custom_params.contentType`
    const nonTrailerVideos = data.media.filter(
      (item) => item.metadata?.custom_params?.contentType !== "trailer"
    );

    return NextResponse.json({ videos: nonTrailerVideos });
  } catch (error) {
    console.error("Error fetching non-trailer videos:", error);
    return NextResponse.json(
      { error: "Failed to fetch non-trailer videos." },
      { status: 500 }
    );
  }
}
