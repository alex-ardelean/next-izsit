import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import { revalidatePath } from "next/cache";
import { clearCachesForWhenPostingNews } from "../../../../ClearCacheFiles/clearCachesForWhenPostingNews";

const uri = process.env.MONGO_DATABASE_URL as string;

let client: MongoClient | undefined;
let clientPromise: Promise<MongoClient>;

// Reuse the MongoDB client for better performance
if (!global._mongoClientPromise) {
  client = new MongoClient(uri);
  global._mongoClientPromise = client.connect();
}

clientPromise = global._mongoClientPromise as Promise<MongoClient>;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, description, youtubeLink, date } = body;

    if (!title || !description || !youtubeLink) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db(); // Use the database name from the connection string
    const newsCollection = db.collection("news");

    const result = await newsCollection.insertOne({
      title,
      description,
      youtubeLink,
      date: date || new Date(),
    });

    // Trigger revalidation for the `/news` page
    await clearCachesForWhenPostingNews();

    return NextResponse.json(
      { message: "News added successfully!", result },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: (error as Error).message || "Internal Server Error." },
      { status: 500 }
    );
  }
}
