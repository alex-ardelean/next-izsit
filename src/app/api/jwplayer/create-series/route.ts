import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const {
      title,
      description,
      mainGenre,
      parentalRating,
      inplayer_user_id,
      contentType,
    } = await request.json();

    // Validate inputs
    if (
      !title ||
      !description ||
      !mainGenre ||
      !parentalRating ||
      !inplayer_user_id ||
      !contentType
    ) {
      return NextResponse.json(
        {
          error:
            "All fields (title, description, genre, parental rating, user ID, and content type) are required.",
        },
        { status: 400 }
      );
    }

    const JW_SERIES_API_URL = `https://api.jwplayer.com/v2/sites/${process.env.JWPLAYER_SITE_ID}/series/`;

    // Step 1: Create the series
    const createSeriesPayload = {
      metadata: {
        sort: {
          season: "asc",
          episode: "asc",
        },
      },
      relationships: {
        media: [], // No associated media initially
      },
    };

    console.log("Sending payload to create series:", createSeriesPayload);

    const createSeriesResponse = await fetch(JW_SERIES_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.JWPLAYER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(createSeriesPayload),
    });

    if (!createSeriesResponse.ok) {
      const errorData = await createSeriesResponse.json();
      console.error("Error creating series:", errorData);
      return NextResponse.json(
        { error: "Failed to create series.", details: errorData },
        { status: createSeriesResponse.status }
      );
    }

    const createdSeries = await createSeriesResponse.json();
    const seriesId = createdSeries.id;

    console.log("Series created successfully:", createdSeries);

    // Step 2: Update the series with metadata and custom parameters
    const JW_MEDIA_API_URL = `https://api.jwplayer.com/v2/sites/${process.env.JWPLAYER_SITE_ID}/media/${seriesId}/`;

    const updateSeriesPayload = {
      metadata: {
        title,
        description,
        custom_params: {
          main_genre: mainGenre,
          parental_rating: parentalRating,
          inplayer_user_id: inplayer_user_id.toString(),
          contentType,
        },
      },
      relationships: {
        media: [],
      },
    };

    console.log("Sending payload to update series:", updateSeriesPayload);

    const updateSeriesResponse = await fetch(JW_MEDIA_API_URL, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${process.env.JWPLAYER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateSeriesPayload),
    });

    if (!updateSeriesResponse.ok) {
      const errorData = await updateSeriesResponse.json();
      console.error("Error updating series:", errorData);
      return NextResponse.json(
        { error: "Failed to update series metadata.", details: errorData },
        { status: updateSeriesResponse.status }
      );
    }

    console.log("Series updated successfully.");

    return NextResponse.json({
      id: seriesId,
      message: "Series created and updated successfully.",
    });
  } catch (error) {
    console.error("Error creating or updating series:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
