import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { seriesId } = body;

    if (!seriesId) {
      return NextResponse.json(
        { message: "Series ID is required" },
        { status: 400 }
      );
    }

    const siteId = process.env.JWPLAYER_SITE_ID; // Ensure this is in your .env file
    const apiKey = process.env.JWPLAYER_API_KEY; // Ensure this is in your .env file

    console.log("siteId", siteId);
    console.log("apiKey", apiKey);
    console.log("seriesId", seriesId);

    // Step 1: Directly delete the series
    const deleteSeriesResponse = await fetch(
      `https://api.jwplayer.com/v2/sites/${siteId}/media/${seriesId}/`,
      {
        method: "DELETE",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    if (deleteSeriesResponse.status === 204) {
      return NextResponse.json(
        { message: "Series deleted successfully" },
        { status: 200 }
      );
    } else {
      const errorData = await deleteSeriesResponse.json();
      console.error("Failed to delete series:", errorData);
      return NextResponse.json(
        {
          message:
            errorData?.errors?.[0]?.description || "Failed to delete series",
        },
        { status: deleteSeriesResponse.status }
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
