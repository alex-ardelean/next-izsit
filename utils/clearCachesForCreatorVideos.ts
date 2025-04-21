"use server";

import { revalidatePath } from "next/cache";

export async function clearCachesForCreatorVideos() {
  try {
    // Revalidate paths for CreatorVideos page
    await Promise.all([
      revalidatePath("/creator-videos"), // Revalidate the CreatorVideos page
    ]);

    console.log("Cache cleared for CreatorVideos page.");
  } catch (error) {
    console.error("Error clearing caches for CreatorVideos page:", error);
  }
}
