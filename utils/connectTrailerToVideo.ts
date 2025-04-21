const connectTrailerToVideo = async (
  videoId: string,
  trailerId: string
): Promise<void> => {
  const JW_API_URL = `https://api.jwplayer.com/v2/sites/${process.env.JWPLAYER_SITE_ID}/media/${videoId}`;

  // Fetch existing metadata for the video
  const fetchMetadataResponse = await fetch(JW_API_URL, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${process.env.JWPLAYER_API_KEY}`,
      "Content-Type": "application/json",
    },
  });

  console.log("here");

  if (!fetchMetadataResponse.ok) {
    const errorData = await fetchMetadataResponse.json();
    throw new Error(
      `Failed to fetch video metadata: ${
        errorData.errors?.[0]?.description || "Unknown error."
      }`
    );
  }

  const videoData = await fetchMetadataResponse.json();

  // Filter out disallowed properties
  const allowedMetadataFields = [
    "author",
    "title",
    "description",
    "tags",
    "custom_params",
    "permalink",
    "publish_start_date",
    "publish_end_date",
  ];

  const filteredMetadata = Object.fromEntries(
    Object.entries(videoData.metadata).filter(([key]) =>
      allowedMetadataFields.includes(key)
    )
  );

  const updatedCustomParams = {
    ...(typeof filteredMetadata.custom_params === "object" &&
    filteredMetadata.custom_params !== null
      ? filteredMetadata.custom_params
      : {}),
    trailerId, // Add the trailerId
  };

  // Update the video metadata with the trailerId
  const updateResponse = await fetch(JW_API_URL, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${process.env.JWPLAYER_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      metadata: {
        ...filteredMetadata,
        custom_params: updatedCustomParams, // Include the updated custom_params
      },
    }),
  });

  if (!updateResponse.ok) {
    const errorData = await updateResponse.json();
    throw new Error(
      `Failed to update video with trailer: ${
        errorData.errors?.[0]?.description || "Unknown error."
      }`
    );
  }

  console.log(`Successfully linked trailer ${trailerId} to video ${videoId}`);
};

export default connectTrailerToVideo;
