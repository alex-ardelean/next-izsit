"use server";

import { revalidatePath, revalidateTag } from "next/cache";

export async function clearCachesForWhenPostingNews() {
  try {
    // Trigger revalidation for both paths and tags
    await Promise.all([
      revalidatePath("/news"), // Revalidate the `/news` page
      revalidatePath("/"), // Optional: Revalidate the homepage if it displays news
      revalidateTag("news"), // Revalidate API cache for `/api/news`
    ]);

    console.log("Cache successfully cleared for posting news.");
  } catch (error) {
    console.error("Error during cache clearing:", error);
  }
}
