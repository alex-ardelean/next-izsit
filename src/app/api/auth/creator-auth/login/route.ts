import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Step 1: Authenticate the user
    const authResponse = await fetch(
      "https://services.inplayer.com/v2/accounts/authenticate",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          username: email,
          password,
          grant_type: "password",
          client_id: process.env.INPLAYER_CLIENT_ID || "",
        }),
      }
    );

    if (!authResponse.ok) {
      const errorData = await authResponse.json();
      return NextResponse.json(
        { error: errorData.message || "Authentication failed." },
        { status: authResponse.status }
      );
    }

    const authData = await authResponse.json();
    const accessToken = authData.access_token;

    // Step 2: Fetch account details to check the role
    const accountResponse = await fetch(
      "https://services.inplayer.com/accounts",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!accountResponse.ok) {
      return NextResponse.json(
        { error: "Failed to fetch account details." },
        { status: accountResponse.status }
      );
    }

    const accountData = await accountResponse.json();

    // Step 3: Check the account role
    const accountRole = accountData.metadata?.account_role;

    if (accountRole !== "creator") {
      return NextResponse.json(
        { error: "Access denied. User is not a creator." },
        { status: 403 }
      );
    }

    // Step 4: Return access token if role is valid
    return NextResponse.json({ access_token: accessToken });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
