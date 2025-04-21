import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import { unstable_cache } from "next/cache";

const uri = process.env.MONGO_DATABASE_URL as string;

let client: MongoClient | undefined;
let clientPromise: Promise<MongoClient>;

// Reuse the MongoDB client in development
if (!global._mongoClientPromise) {
  client = new MongoClient(uri);
  global._mongoClientPromise = client.connect();
}
clientPromise = global._mongoClientPromise as Promise<MongoClient>;

// Cache the MongoDB query
const fetchPosts = unstable_cache(
  async () => {
    const client = await clientPromise;
    const db = client.db();
    const newsCollection = db.collection("news");

    return await newsCollection
      .find({})
      .sort({ date: -1 }) // Sort by most recent
      .toArray();
  },
  ["news"], // Cache key
  { revalidate: 60, tags: ["news"] } // Add cache tag "news"
);

export async function GET() {
  try {
    const posts = await fetchPosts();
    return NextResponse.json(posts);
  } catch (error) {
    console.error("Error fetching news:", error);
    return NextResponse.json(
      { error: "Failed to fetch news posts." },
      { status: 500 }
    );
  }
}
