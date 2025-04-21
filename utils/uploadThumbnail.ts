export async function uploadThumbnail(
  file: File,
  mediaId: string,
  title: string,
  description: string
) {
  if (!file || !title || !description || !mediaId) {
    throw new Error("File, title, description, and mediaId are required.");
  }

  const mimeType = file.type;

  // Determine thumbnail type based on file type
  const thumbnailType = mimeType.startsWith("video/") ? "video" : "static";

  // Step 1: Register the thumbnail with JW Player
  const registerResponse = await fetch("/api/jwplayer/add-thumbnails", {
    method: "POST",
    body: JSON.stringify({
      file: file.name, // File name for validation
      mediaId, // Use mediaId instead of seriesId
      thumbnailType, // Use dynamic thumbnailType
      sourceType: "custom_upload",
      mime_type: mimeType,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!registerResponse.ok) {
    const errorData = await registerResponse.json();
    console.error("Error registering thumbnail:", errorData);
    throw new Error(errorData.error || "Failed to register thumbnail.");
  }

  const { upload_link, thumbnailId } = await registerResponse.json();
  console.log("Thumbnail API Response:", { upload_link, thumbnailId });

  // Step 2: Upload the actual file to S3 using the `upload_link`
  const s3UploadResponse = await fetch(upload_link, {
    method: "PUT",
    body: file,
    headers: {
      "Content-Type": mimeType,
    },
  });

  if (!s3UploadResponse.ok) {
    console.error(
      "Error uploading thumbnail to S3:",
      await s3UploadResponse.text()
    );
    throw new Error("Failed to upload thumbnail to S3.");
  }

  console.log("Thumbnail successfully uploaded to S3");

  // Step 3: Wait for the thumbnail to be ready
  await waitForThumbnailToBeReady(thumbnailId);

  // Step 4: Update relationships to link the thumbnail to the media
  await updateThumbnailRelationship(thumbnailId, mediaId);

  console.log("Thumbnail successfully linked to media.");
  return { thumbnailId };
}

// Poll JW Player API to check thumbnail status
async function waitForThumbnailToBeReady(thumbnailId: string) {
  const MAX_RETRIES = 40;
  const RETRY_DELAY = 5000; // 5 seconds

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    const response = await fetch(
      `https://api.jwplayer.com/v2/sites/${process.env.NEXT_PUBLIC_JWPLAYER_SITE_ID}/thumbnails/${thumbnailId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_JWPLAYER_API_KEY}`,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error checking thumbnail status:", errorData);
      throw new Error("Failed to check thumbnail status.");
    }

    const data = await response.json();
    console.log(`Thumbnail status (attempt ${attempt}):`, data.status);

    if (data.status === "ready") {
      console.log("Thumbnail is ready.");
      return;
    }

    if (attempt < MAX_RETRIES) {
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
    } else {
      throw new Error("Thumbnail did not reach 'ready' status in time.");
    }
  }
}

// Update relationships to link to media instead of series
async function updateThumbnailRelationship(
  thumbnailId: string,
  mediaId: string
) {
  const payload = {
    relationships: {
      media: [
        {
          id: mediaId,
          is_poster: true, // Set this thumbnail as the poster image
        },
      ],
    },
  };

  const response = await fetch(
    `https://api.jwplayer.com/v2/sites/${process.env.NEXT_PUBLIC_JWPLAYER_SITE_ID}/thumbnails/${thumbnailId}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_JWPLAYER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    console.error("Error updating thumbnail relationships:", errorData);
    throw new Error("Failed to update thumbnail relationships.");
  }

  console.log("Thumbnail relationships updated successfully.");
}
