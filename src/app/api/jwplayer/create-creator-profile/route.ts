import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const {
      title,
      description,
      contentType,
      inplayer_user_id,
      facebook,
      instagram,
      youtube,
      twitter,
      twitch,
      linkedin,
    } = await request.json();

    if (!title || !description || !contentType || !inplayer_user_id) {
      return NextResponse.json(
        {
          error:
            "Title, description, contentType, and inplayer_user_id are required.",
        },
        { status: 400 }
      );
    }

    const JW_SITE_ID = process.env.NEXT_PUBLIC_JWPLAYER_SITE_ID;
    const JW_API_KEY = process.env.NEXT_PUBLIC_JWPLAYER_API_KEY;
    const JW_MEDIA_CREATE_URL = `https://api.jwplayer.com/v2/sites/${JW_SITE_ID}/media/`;

    // ✅ Consistent field names (same as PATCH request)
    const customParams: Record<string, string> = {
      contentType,
      inplayer_user_id: inplayer_user_id.toString(),
      facebook_url: facebook || "",
      instagram_url: instagram || "",
      youtube_url: youtube || "",
      twitter_url: twitter || "",
      twitch_url: twitch || "",
      linkedin_url: linkedin || "",
    };

    // ✅ Step 1: Create Media in JW Player
    const createPayload = {
      upload: { method: "ott_data" },
      metadata: {
        title,
        description: description || "",
        custom_params: customParams, // ✅ Consistent field names
      },
    };

    const createResponse = await fetch(JW_MEDIA_CREATE_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${JW_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(createPayload),
    });

    if (!createResponse.ok) {
      const errorData = await createResponse.json();
      console.error("Error creating media:", errorData);
      return NextResponse.json(
        { error: "Failed to create media.", details: errorData },
        { status: createResponse.status }
      );
    }

    const createdMedia = await createResponse.json();
    const mediaId = createdMedia.id;

    console.log("Media created successfully:", createdMedia);

    // ✅ Step 2: Explicitly Update Metadata (PATCH request)
    const JW_MEDIA_UPDATE_URL = `https://api.jwplayer.com/v2/sites/${JW_SITE_ID}/media/${mediaId}/`;

    const updatePayload = {
      metadata: {
        title,
        description,
        custom_params: customParams, // ✅ Using the same consistent structure
      },
    };

    const updateResponse = await fetch(JW_MEDIA_UPDATE_URL, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${JW_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatePayload),
    });

    if (!updateResponse.ok) {
      const errorData = await updateResponse.json();
      console.error("Error updating media:", errorData);
      return NextResponse.json(
        { error: "Failed to update media metadata.", details: errorData },
        { status: updateResponse.status }
      );
    }

    console.log("Media updated successfully.");

    return NextResponse.json({
      id: mediaId,
      message: "Media created and updated successfully.",
    });
  } catch (error) {
    console.error("Error creating or updating media:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred while processing the media." },
      { status: 500 }
    );
  }
}
