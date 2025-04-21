import { NextResponse } from "next/server";
import { clearCachesForCreatorVideos } from "../../../../../utils/clearCachesForCreatorVideos";
import connectTrailerToVideo from "../../../../../utils/connectTrailerToVideo";

export async function PUT(request: Request) {
  try {
    const {
      id,
      title,
      description,
      tags,
      contentType,
      custom_params,
      seriesId,
      oldSeriesId,
    } = await request.json();

    if (!id || !title || !description) {
      return NextResponse.json(
        { error: "Video ID, title, and description are required." },
        { status: 400 }
      );
    }

    const JW_API_URL = `https://api.jwplayer.com/v2/sites/${process.env.JWPLAYER_SITE_ID}/media/${id}/`;

    const formattedCustomParams = {
      ...custom_params,
      inplayer_user_id: custom_params?.inplayer_user_id || "default_user_id",
      status: custom_params?.status || "under_review",
      contentType: contentType || custom_params?.contentType || "",
    };

    const formattedParamsAsString = Object.fromEntries(
      Object.entries(formattedCustomParams).map(([key, value]) => [
        key,
        value?.toString() || "",
      ])
    );

    // Update video metadata
    const response = await fetch(JW_API_URL, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${process.env.JWPLAYER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        metadata: {
          title,
          description,
          tags,
          custom_params: formattedParamsAsString,
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("JW Player API Error:", errorData);
      throw new Error("Failed to update video metadata.");
    }

    const updatedData = await response.json();

    // Link trailer to video if applicable

    if (custom_params?.trailerId) {
      await connectTrailerToVideo(custom_params.trailerId, id);
    }

    // Remove the video from the old series
    if (oldSeriesId) {
      const OLD_SERIES_URL = `https://api.jwplayer.com/v2/sites/${process.env.JWPLAYER_SITE_ID}/series/${oldSeriesId}/`;

      try {
        const oldSeriesDetailsResponse = await fetch(OLD_SERIES_URL, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${process.env.JWPLAYER_API_KEY}`,
          },
        });

        if (!oldSeriesDetailsResponse.ok) {
          const oldSeriesError = await oldSeriesDetailsResponse.json();
          throw new Error(
            `Failed to fetch old series details: ${
              oldSeriesError.errors?.[0]?.description || "Unknown error."
            }`
          );
        }

        const oldSeriesDetails = await oldSeriesDetailsResponse.json();
        const currentOldMedia = oldSeriesDetails.relationships?.media || [];

        const updatedOldMedia = currentOldMedia.filter(
          (media: any) => media.id !== id
        );

        const oldSeriesUpdatePayload = {
          relationships: {
            media: updatedOldMedia,
          },
        };

        const oldSeriesUpdateResponse = await fetch(OLD_SERIES_URL, {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${process.env.JWPLAYER_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(oldSeriesUpdatePayload),
        });

        if (!oldSeriesUpdateResponse.ok) {
          const oldSeriesUpdateError = await oldSeriesUpdateResponse.json();
          throw new Error(
            `Failed to remove video from old series: ${
              oldSeriesUpdateError.errors?.[0]?.description || "Unknown error."
            }`
          );
        }
      } catch (error) {
        console.error("Error removing video from old series:", error.message);
        return NextResponse.json(
          { error: `Failed to remove video from old series: ${error.message}` },
          { status: 500 }
        );
      }
    }

    // Add the video to the new series
    if (seriesId) {
      const NEW_SERIES_URL = `https://api.jwplayer.com/v2/sites/${process.env.JWPLAYER_SITE_ID}/series/${seriesId}/`;

      try {
        const newSeriesDetailsResponse = await fetch(NEW_SERIES_URL, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${process.env.JWPLAYER_API_KEY}`,
          },
        });

        if (!newSeriesDetailsResponse.ok) {
          const newSeriesError = await newSeriesDetailsResponse.json();
          throw new Error(
            `Failed to fetch new series details: ${
              newSeriesError.errors?.[0]?.description || "Unknown error."
            }`
          );
        }

        const newSeriesDetails = await newSeriesDetailsResponse.json();
        const currentNewMedia = newSeriesDetails.relationships?.media || [];

        const isAlreadyInNewSeries = currentNewMedia.some(
          (media: any) => media.id === id
        );

        if (!isAlreadyInNewSeries) {
          const nextEpisodeNumber =
            currentNewMedia.length > 0
              ? Math.max(
                  ...currentNewMedia.map(
                    (item: any) => item.episode_number || 0
                  )
                ) + 1
              : 1;

          const updatedNewMedia = [
            ...currentNewMedia,
            { id, episode_number: nextEpisodeNumber },
          ];

          const newSeriesUpdatePayload = {
            relationships: {
              media: updatedNewMedia,
            },
          };

          const newSeriesUpdateResponse = await fetch(NEW_SERIES_URL, {
            method: "PATCH",
            headers: {
              Authorization: `Bearer ${process.env.JWPLAYER_API_KEY}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newSeriesUpdatePayload),
          });

          if (!newSeriesUpdateResponse.ok) {
            const newSeriesUpdateError = await newSeriesUpdateResponse.json();
            throw new Error(
              `Failed to add video to new series: ${
                newSeriesUpdateError.errors?.[0]?.description ||
                "Unknown error."
              }`
            );
          }
        } else {
          console.log("Video is already part of the new series.");
        }
      } catch (error) {
        console.error("Error adding video to new series:", error.message);
        return NextResponse.json(
          { error: `Failed to add video to new series: ${error.message}` },
          { status: 500 }
        );
      }
    }

    // Clear caches for CreatorVideos page
    await clearCachesForCreatorVideos();

    return NextResponse.json(updatedData);
  } catch (error) {
    console.error("Error updating video metadata:", error);
    return NextResponse.json(
      { error: "Failed to update video metadata." },
      { status: 500 }
    );
  }
}
