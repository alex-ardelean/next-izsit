import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const uri = process.env.MONGO_DATABASE_URL as string;
const jwtSecret = process.env.JWT_SECRET as string;
const inplayerBaseUrl =
  "https://services.inplayer.com/v2/accounts/authenticate";

let client: MongoClient | undefined;
let clientPromise: Promise<MongoClient>;

if (!global._mongoClientPromise) {
  client = new MongoClient(uri);
  global._mongoClientPromise = client.connect();
}
clientPromise = global._mongoClientPromise as Promise<MongoClient>;

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    console.log("Authenticating with Inplayer:", email);

    const inplayerResponse = await fetch(
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
          client_id: process.env.NEXT_PUBLIC_INPLAYER_TENANT_UUID || "",
        }),
      }
    );

    if (!inplayerResponse.ok) {
      const errorData = await inplayerResponse.json();
      console.error("Inplayer API Error:", errorData);
      return NextResponse.json(
        { error: errorData.message || "Authentication failed with Inplayer." },
        { status: inplayerResponse.status }
      );
    }

    const inplayerData = await inplayerResponse.json();
    console.log("Inplayer Data:", inplayerData);

    // Check roles
    if (
      !inplayerData.account.roles.includes("merchant") &&
      !inplayerData.account.roles.includes("admin")
    ) {
      return NextResponse.json(
        { error: "Access denied. You are not an admin or merchant." },
        { status: 403 }
      );
    }

    // Generate local JWT token
    const adminToken = jwt.sign(
      { email: inplayerData.account.email, role: inplayerData.account.roles },
      jwtSecret,
      { expiresIn: "1h" }
    );

    return NextResponse.json({
      adminToken,
      inplayerAccessToken: inplayerData.access_token,
    });
  } catch (error) {
    console.error("Error during admin authentication:", error);
    return NextResponse.json(
      { error: "An error occurred while logging in as admin." },
      { status: 500 }
    );
  }
}