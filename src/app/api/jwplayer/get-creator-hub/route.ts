import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    // ✅ Extract userId from query params
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("inplayer_user_id");

    if (!userId) {
      return NextResponse.json(
        { error: "inplayer_user_id is required." },
        { status: 400 }
      );
    }

    const JW_SITE_ID = process.env.JWPLAYER_SITE_ID;
    const JW_API_KEY = process.env.JWPLAYER_API_KEY;
    const JW_MEDIA_API_URL = `https://api.jwplayer.com/v2/sites/${JW_SITE_ID}/media/?page=1&page_length=50&q=custom_params:(name: "inplayer_user_id" AND value: "${userId}")`;

    // ✅ Fetch the media list
    const response = await fetch(JW_MEDIA_API_URL, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${JW_API_KEY}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("JW Player API Error:", errorData);
      return NextResponse.json(
        { error: "Failed to fetch media." },
        { status: response.status }
      );
    }

    const mediaData = await response.json();

    // ✅ Find the "hub" media type
    const userHub = mediaData.media.find(
      (media: any) => media.metadata?.custom_params?.contentType === "hub"
    );

    if (!userHub) {
      return NextResponse.json({ hub: null });
    }

    // ✅ Fetch the full details of the hub
    const mediaDetailsResponse = await fetch(
      `https://api.jwplayer.com/v2/sites/${JW_SITE_ID}/media/${userHub.id}/`,
      {
        headers: {
          Authorization: `Bearer ${JW_API_KEY}`,
        },
      }
    );

    if (!mediaDetailsResponse.ok) {
      return NextResponse.json(
        { error: "Failed to fetch hub details." },
        { status: mediaDetailsResponse.status }
      );
    }

    const mediaDetails = await mediaDetailsResponse.json();

    // ✅ Extract the correct poster URL from `relationships.poster`
    const thumbnailUrl =
      mediaDetails.relationships?.poster?.assets?.[0]?.url || null;

    // ✅ Extract Social Media Links from `custom_params`
    const customParams = mediaDetails.metadata.custom_params || {};

    return NextResponse.json({
      hub: {
        id: userHub.id,
        title: userHub.metadata.title || "Untitled Hub",
        description: userHub.metadata.description || "No description",
        thumbnailUrl,
        facebook_url: customParams.facebook_url || "",
        instagram_url: customParams.instagram_url || "",
        youtube_url: customParams.youtube_url || "",
        twitter_url: customParams.twitter_url || "",
        twitch_url: customParams.twitch_url || "",
        linkedin_url: customParams.linkedin_url || "",
      },
    });
  } catch (error) {
    console.error("Error fetching creator hub:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
