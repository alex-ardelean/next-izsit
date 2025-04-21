import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { userId } = await request.json(); // Extract userId from the request body

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required to fetch series." },
        { status: 400 }
      );
    }

    const JW_MEDIA_API_URL = `https://api.jwplayer.com/v2/sites/${process.env.NEXT_PUBLIC_JWPLAYER_SITE_ID}/media/`;

    // Query for media with contentType "series" and the matching inplayer_user_id
    const query = encodeURIComponent(
      `custom_params:(name:"contentType" AND value:"series") AND custom_params:(name:"inplayer_user_id" AND value:"${userId}")`
    );

    const url = `${JW_MEDIA_API_URL}?q=${query}&page=1&page_length=50`;

    const mediaResponse = await fetch(url, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_JWPLAYER_API_KEY}`,
      },
    });

    if (!mediaResponse.ok) {
      return NextResponse.json(
        { error: "Failed to fetch media." },
        { status: mediaResponse.status }
      );
    }

    const mediaData = await mediaResponse.json();
    const mediaList = mediaData.media || [];

    // Map the series into the desired format
    const seriesDetails = mediaList.map((media: any) => ({
      id: media.id,
      title: media.metadata?.title || `Series ${media.id}`,
      description: media.metadata?.description || "No description available",
      mainGenre: media.metadata?.custom_params?.main_genre || "Unknown",
      parentalRating:
        media.metadata?.custom_params?.parental_rating || "Unknown",
      contentType: media.metadata?.custom_params?.contentType || "Unknown",
    }));

    return NextResponse.json({ series: seriesDetails });
  } catch (error) {
    console.error("Error fetching series:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching series." },
      { status: 500 }
    );
  }
}
