import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const { seriesId, relationships } = body;

    if (!seriesId || !relationships?.media) {
      return NextResponse.json(
        { error: "Series ID and media relationships are required." },
        { status: 400 }
      );
    }

    const JWPLAYER_SITE_ID = process.env.JWPLAYER_SITE_ID;
    const JWPLAYER_API_KEY = process.env.JWPLAYER_API_KEY;

    const response = await fetch(
      `https://api.jwplayer.com/v2/sites/${JWPLAYER_SITE_ID}/series/${seriesId}/`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JWPLAYER_API_KEY}`,
        },
        body: JSON.stringify({ relationships }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Failed to update series:", errorData);
      return NextResponse.json(errorData, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in add-video-to-series route:", error);
    return NextResponse.json(
      { error: "An error occurred while updating the series." },
      { status: 500 }
    );
  }
}
