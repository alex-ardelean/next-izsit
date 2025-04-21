import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const {
      hubId,
      title,
      description,
      contentType, // ✅ Ensure hub type is included
      inplayer_user_id, // ✅ Ensure this is included
      facebook,
      instagram,
      youtube,
      twitter,
      twitch,
      linkedin,
    } = body;

    if (!hubId || !title || !contentType || !inplayer_user_id) {
      return NextResponse.json(
        {
          error:
            "Hub ID, title, contentType, and inplayer_user_id are required.",
        },
        { status: 400 }
      );
    }

    const JW_SITE_ID = process.env.JWPLAYER_SITE_ID;
    const JW_API_KEY = process.env.JWPLAYER_API_KEY;
    const JW_MEDIA_API_URL = `https://api.jwplayer.com/v2/sites/${JW_SITE_ID}/media/${hubId}/`;

    // ✅ Construct `custom_params`, ensuring `contentType` & `inplayer_user_id` are never removed
    const customParams: Record<string, string> = {
      contentType: contentType, // ✅ Ensure hub type is included
      inplayer_user_id: inplayer_user_id.toString(), // ✅ Always keep this
      facebook_url: facebook || "",
      instagram_url: instagram || "",
      youtube_url: youtube || "",
      twitter_url: twitter || "",
      twitch_url: twitch || "",
      linkedin_url: linkedin || "",
    };

    // ✅ Send PATCH request to JW Player to update the media metadata
    const response = await fetch(JW_MEDIA_API_URL, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${JW_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        metadata: {
          title,
          description: description || "", // Ensure description is not undefined
          custom_params: customParams, // ✅ Ensure all params are updated, including contentType
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("JW Player API Error (Update Hub):", errorData);
      return NextResponse.json(
        { error: "Failed to update creator hub." },
        { status: response.status }
      );
    }

    const updatedData = await response.json();

    return NextResponse.json({
      message: "Hub updated successfully",
      data: updatedData,
    });
  } catch (error) {
    console.error("Error updating creator hub:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
