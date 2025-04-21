import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const uploadId = searchParams.get("uploadId");
    const authorizationHeader = request.headers.get("Authorization");

    if (!uploadId) {
      return NextResponse.json(
        { error: "uploadId is required." },
        { status: 400 }
      );
    }

    if (!authorizationHeader) {
      return NextResponse.json(
        { error: "Authorization token is required." },
        { status: 401 }
      );
    }

    const JW_COMPLETE_URL = `https://api.jwplayer.com/v2/uploads/${uploadId}/complete`;

    const completeResponse = await fetch(JW_COMPLETE_URL, {
      method: "PUT",
      headers: {
        Authorization: authorizationHeader,
        "Content-Type": "application/json",
      },
    });

    if (!completeResponse.ok) {
      let errorData;
      try {
        errorData = await completeResponse.json();
      } catch (error) {
        errorData = { error: "Non-JSON response from JW Player" };
      }

      const errorDescription =
        errorData.errors?.[0]?.description || "An unknown error occurred.";
      console.error("JW Player Complete Upload API Error:", errorData);

      return NextResponse.json(
        {
          error: `JW Player Complete Upload API Error: ${errorDescription}`,
          code: errorData.errors?.[0]?.code || "unknown_error",
        },
        { status: completeResponse.status }
      );
    }

    let responseData;
    try {
      responseData = await completeResponse.json();
    } catch (error) {
      console.warn("JW Player API returned a non-JSON response.");
      responseData = {}; // Default empty object if response is not JSON
    }

    return NextResponse.json({
      message: "Upload completed successfully.",
      data: responseData,
    });
  } catch (error) {
    console.error("Error completing upload:", error);
    return NextResponse.json(
      { error: "Something went wrong while completing the upload." },
      { status: 500 }
    );
  }
}
