import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("inplayer_user_id");

    if (!userId) {
      return NextResponse.json(
        { error: "inplayer_user_id is required." },
        { status: 400 }
      );
    }

    const JW_API_URL = `https://api.jwplayer.com/v2/sites/${process.env.JWPLAYER_SITE_ID}/media/?page=1&page_length=50&q=custom_params:(name: "inplayer_user_id" AND value: "${userId}")`;

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

    const mediaData = await response.json();

    // Filter out videos with contentType "series"
    // const filteredMedia = mediaData.media.filter(
    //   (item: any) => item.metadata?.custom_params?.contentType !== "series"
    // );
    const filteredMedia = mediaData.media
      .filter(
        (item: any) =>
          item.metadata?.custom_params?.contentType !== "series" &&
          item.metadata?.custom_params?.contentType !== "hub"
      )
      .map((item: any) => ({
        ...item,
        poster: `https://cdn.jwplayer.com/thumbs/${
          item.id
        }.jpg?t=${new Date().getTime()}`, // Cache-busting thumbnail
      }));

    return NextResponse.json(filteredMedia);
  } catch (error) {
    console.error("Error fetching videos:", error);
    return NextResponse.json(
      { error: "Failed to fetch videos." },
      { status: 500 }
    );
  }
}
