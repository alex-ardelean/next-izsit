import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { videoId } = body;

    if (!videoId) {
      return NextResponse.json(
        { message: "Video ID is required" },
        { status: 400 }
      );
    }

    const siteId = process.env.JWPLAYER_SITE_ID;
    const apiKey = process.env.JWPLAYER_API_KEY;

    console.log("Deleting Video:", videoId);

    const deleteResponse = await fetch(
      `https://api.jwplayer.com/v2/sites/${siteId}/media/${videoId}/`,
      {
        method: "DELETE",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    if (deleteResponse.status === 204) {
      return NextResponse.json(
        { message: "Video deleted successfully" },
        { status: 200 }
      );
    } else {
      const errorData = await deleteResponse.json();
      console.error("Failed to delete video:", errorData);
      return NextResponse.json(
        {
          message:
            errorData?.errors?.[0]?.description || "Failed to delete video",
        },
        { status: deleteResponse.status }
      );
    }
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
