export async function fetchAllThumbnailsInBulk(videoIds) {
  try {
    // Validate videoIds
    if (!Array.isArray(videoIds) || videoIds.length === 0) {
      console.warn("Skipping bulk thumbnail fetch as videoIds is empty.");
      return {}; // Exit early if no video IDs
    }

    console.log("Sending video IDs to bulk API:", videoIds);

    // Fetch thumbnails in bulk
    const response = await fetch("/api/jwplayer/get-thumbnails-bulk", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ videoIds }),
    });

    if (!response.ok) {
      const errorDetails = await response.text();
      console.error("Bulk thumbnails fetch failed:", errorDetails);
      throw new Error("Failed to fetch thumbnails in bulk.");
    }

    const { thumbnails } = await response.json();
    console.log("Received thumbnails response:", thumbnails);

    // Map thumbnails to video IDs
    return thumbnails.reduce((acc, { id, static_thumbnail_url }) => {
      acc[id] = static_thumbnail_url;
      return acc;
    }, {});
  } catch (error) {
    console.error("Error fetching thumbnails in bulk:", error);
    return {}; // Return an empty object on failure
  }
}
