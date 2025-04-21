import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const mediaId = searchParams.get("id");

    if (!mediaId) {
      return NextResponse.json(
        { error: "Media ID is required." },
        { status: 400 }
      );
    }

    const JW_MEDIA_URL = `https://api.jwplayer.com/v2/sites/${process.env.JWPLAYER_SITE_ID}/media/${mediaId}/`;

    // Fetch media details
    const mediaResponse = await fetch(JW_MEDIA_URL, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.JWPLAYER_API_KEY}`,
        "Content-Type": "application/json",
      },
    });

    if (!mediaResponse.ok) {
      const errorData = await mediaResponse.json();
      console.error("JW Player API Error (Media):", errorData);
      throw new Error("Failed to fetch media details.");
    }

    const mediaDetails = await mediaResponse.json();

    // Check if contentType is "episode" and fetch series information
    let seriesInfo = null;
    const contentType = mediaDetails.metadata?.custom_params?.contentType;

    if (contentType === "episode") {
      const JW_SERIES_URL = `https://api.jwplayer.com/v2/sites/${process.env.JWPLAYER_SITE_ID}/series/`;

      const seriesResponse = await fetch(JW_SERIES_URL, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.JWPLAYER_API_KEY}`,
          "Content-Type": "application/json",
        },
      });

      if (seriesResponse.ok) {
        const seriesData = await seriesResponse.json();

        // Find the series that includes the current media ID in its relationships
        seriesInfo = seriesData.series.find((series) =>
          series.relationships.media.some((media) => media.id === mediaId)
        );
      }
    }

    return NextResponse.json({ ...mediaDetails, series: seriesInfo });
  } catch (error) {
    console.error("Error fetching media details:", error);
    return NextResponse.json(
      { error: "Failed to fetch media details." },
      { status: 500 }
    );
  }
}
