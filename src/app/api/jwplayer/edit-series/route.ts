import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  try {
    const {
      seriesId, // This is the media ID in JW Player
      title,
      description,
      mainGenre,
      parentalRating,
      inplayerUserId, // Optional parameter
    } = await request.json();

    if (!seriesId || !title || !description) {
      return NextResponse.json(
        { error: "Series ID, title, and description are required." },
        { status: 400 }
      );
    }

    console.log("Updating media with ID:", seriesId);
    console.log("New Title:", title);
    console.log("New Description:", description);
    console.log("Main Genre:", mainGenre);
    console.log("Parental Rating:", parentalRating);

    // JW Player API URL for updating media
    const MEDIA_API_URL = `https://api.jwplayer.com/v2/sites/${process.env.JWPLAYER_SITE_ID}/media/${seriesId}/`;

    // Fetch the current media metadata to ensure inplayer_user_id is preserved
    const currentDataResponse = await fetch(MEDIA_API_URL, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.JWPLAYER_API_KEY}`,
      },
    });

    if (!currentDataResponse.ok) {
      const currentDataError = await currentDataResponse.json();
      throw new Error(
        `Failed to fetch current media data. Error: ${
          currentDataError.errors?.[0]?.description || "Unknown error."
        }`
      );
    }

    const currentData = await currentDataResponse.json();
    const currentCustomParams = currentData.metadata?.custom_params || {};

    const payload = {
      metadata: {
        title,
        description,
        tags: currentData.metadata?.tags || [], // Retain existing tags if any
        custom_params: {
          ...currentCustomParams, // Retain existing custom_params
          inplayer_user_id:
            currentCustomParams.inplayer_user_id ||
            inplayerUserId ||
            "default_user_id", // Prioritize existing value
          main_genre: mainGenre,
          parental_rating: parentalRating,
          contentType: "series",
        },
        permalink: currentData.metadata?.permalink || "", // Retain existing permalink if any
        publish_start_date:
          currentData.metadata?.publish_start_date || new Date().toISOString(),
        publish_end_date: currentData.metadata?.publish_end_date || null,
      },
      relationships: {
        protection_rule: currentData.relationships?.protection_rule || {}, // Retain existing relationships
      },
    };

    console.log("Request Payload:", payload);

    const response = await fetch(MEDIA_API_URL, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${process.env.JWPLAYER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("JW Player API Error:", errorData);
      throw new Error(
        `Failed to update series. Error: ${
          errorData.errors?.[0]?.description || "Unknown error."
        }`
      );
    }

    const updatedData = await response.json();

    console.log("Updated Media Data:", updatedData);

    return NextResponse.json(updatedData);
  } catch (error) {
    console.error("Error updating series:", error.message);
    return NextResponse.json(
      { error: `Failed to update series: ${error.message}` },
      { status: 500 }
    );
  }
}
