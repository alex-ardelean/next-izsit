import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const token = req.headers.get("Authorization")?.split(" ")[1];
    if (!token) throw new Error("Authorization token missing.");

    const response = await fetch("https://services.inplayer.com/accounts", {
      method: "PUT",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${token}`,
      },
      body: new URLSearchParams({
        "metadata[agreement_signed]": "true",
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to update agreement status.");
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Something went wrong." },
      { status: 500 }
    );
  }
}
