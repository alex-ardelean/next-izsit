import { fetchAccountDetails } from "./fetchAccountDetails";

export async function editSeries(
  seriesId: string,
  updatedData: {
    title: string;
    description: string;
    mainGenre: string;
    parentalRating: string;
  }
): Promise<any> {
  try {
    const response = await fetch(`/api/jwplayer/edit-series`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ seriesId, ...updatedData }),
    });

    if (!response.ok) {
      throw new Error("Failed to update series.");
    }

    return await response.json();
  } catch (error) {
    console.error("Error editing series:", error);
    throw error;
  }
}
