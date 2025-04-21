import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import bcrypt from "bcrypt";

const uri = process.env.MONGO_DATABASE_URL as string;
const saltRounds = 10;

let client: MongoClient | undefined;
let clientPromise: Promise<MongoClient>;

if (!global._mongoClientPromise) {
  client = new MongoClient(uri);
  global._mongoClientPromise = client.connect();
}
clientPromise = global._mongoClientPromise as Promise<MongoClient>;

export async function POST(req: Request) {
  try {
    const { username, email, password, role } = await req.json();

    // Validate required fields
    if (!username || !email || !password || !role) {
      return NextResponse.json(
        { error: "Username, email, password, and role are required." },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format." },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const client = await clientPromise;
    const db = client.db();
    const usersCollection = db.collection("users");

    // Check if username or email already exists
    const existingUser = await usersCollection.findOne({
      $or: [{ username }, { email }],
    });

    if (existingUser) {
      return NextResponse.json(
        {
          error: "User with this username or email already exists.",
        },
        { status: 400 }
      );
    }

    // Insert new user
    const result = await usersCollection.insertOne({
      username,
      email,
      password: hashedPassword,
      role,
    });

    return NextResponse.json(
      { message: "User created successfully!", result },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "An error occurred while creating the user." },
      { status: 500 }
    );
  }
}
