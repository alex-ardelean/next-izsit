import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { file, mediaId, thumbnailType, sourceType, mime_type } =
      await request.json();

    if (!file || !mediaId || !thumbnailType || !sourceType || !mime_type) {
      return NextResponse.json(
        {
          error:
            "File, mediaId, thumbnailType, sourceType, and mime_type are required.",
        },
        { status: 400 }
      );
    }

    const JWPLAYER_API_URL = `https://api.jwplayer.com/v2/sites/${process.env.JWPLAYER_SITE_ID}/thumbnails/`;

    const payload = {
      relationships: {
        media: [
          {
            id: mediaId,
          },
        ],
      },
      upload: {
        method: "direct",
        thumbnail_type: thumbnailType,
        source_type: sourceType,
        mime_type,
      },
    };

    const response = await fetch(JWPLAYER_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.JWPLAYER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error creating thumbnail:", errorData);
      return NextResponse.json({ error: errorData }, { status: 500 });
    }

    const data = await response.json();
    console.log("Thumbnail created successfully:", data);

    return NextResponse.json({
      upload_link: data.upload_link,
      thumbnailId: data.id,
    });
  } catch (error) {
    console.error("Error in add-thumbnails route:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
