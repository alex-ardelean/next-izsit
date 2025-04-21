export const fetchThumbnails = async (videoId: string) => {
  try {
    const response = await fetch("/api/jwplayer/get-thumbnails", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ videoId }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch thumbnails.");
    }

    const thumbnails = await response.json();
    return {
      static: thumbnails.static_thumbnail_url || null,
      motion: thumbnails.motion_thumbnail_url || null,
    };
  } catch (error) {
    console.error("Error fetching thumbnails:", error);
    return { static: null, motion: null };
  }
};
