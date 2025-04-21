import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const uploadId = searchParams.get("uploadId");
    const pageLength = searchParams.get("pageLength");
    const uploadToken = request.headers
      .get("Authorization")
      ?.replace("Bearer ", "");

    if (!uploadId) {
      return NextResponse.json(
        { error: "uploadId is required." },
        { status: 400 }
      );
    }

    if (!pageLength) {
      return NextResponse.json(
        { error: "pageLength is required." },
        { status: 400 }
      );
    }

    if (!uploadToken) {
      return NextResponse.json(
        { error: "Upload token is missing in the Authorization header." },
        { status: 401 }
      );
    }

    const JW_PARTS_URL = `https://api.jwplayer.com/v2/uploads/${uploadId}/parts?page=1&page_length=${pageLength}`;

    const partsResponse = await fetch(JW_PARTS_URL, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${uploadToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!partsResponse.ok) {
      const errorData = await partsResponse.json();
      const errorDescription =
        errorData.errors?.[0]?.description || "An unknown error occurred.";
      console.error("JW Player Parts API Error:", errorData);

      return NextResponse.json(
        {
          error: `JW Player Parts API Error: ${errorDescription}`,
          code: errorData.errors?.[0]?.code || "unknown_error",
        },
        { status: partsResponse.status }
      );
    }

    const partsData = await partsResponse.json();

    return NextResponse.json({
      parts: partsData.parts,
      message: "Successfully fetched upload parts.",
    });
  } catch (error) {
    console.error("Error fetching upload parts:", error);
    return NextResponse.json(
      { error: "Something went wrong while fetching upload parts." },
      { status: 500 }
    );
  }
}
