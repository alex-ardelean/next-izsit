import { fetchAccountDetails } from "./fetchAccountDetails";

export async function createSeries(seriesData: {
  title: string;
  description: string;
  mainGenre: string;
  parentalRating: string;
}): Promise<{ id: string; title: string }> {
  try {
    // Fetch the uploader's Customer ID
    const customerId = await fetchAccountDetails();

    if (!customerId) {
      throw new Error("Failed to retrieve customer ID.");
    }

    // Convert customerId to string
    const customerIdString = customerId.toString();

    // API endpoint for creating a new series
    const response = await fetch("/api/jwplayer/create-series", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...seriesData,
        inplayer_user_id: customerIdString, // Send as string
        contentType: "series",
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error from server API:", errorData);
      throw new Error("Failed to create series.");
    }

    // Get the newly created series from the API response
    const newSeries = await response.json();

    return {
      id: newSeries.id,
      title: seriesData.title,
    };
  } catch (error) {
    console.error("Error creating series:", error);
    throw error;
  }
}
