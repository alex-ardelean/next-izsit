import { NextResponse } from "next/server";
import connectTrailerToVideo from "../../../../../utils/connectTrailerToVideo";

export async function POST(request: Request) {
  try {
    const {
      title,
      description,
      custom_params,
      mime_type,
      tags,
      seriesId,
      contentType,
    } = await request.json();

    if (!title) {
      return NextResponse.json(
        { error: "Title is required." },
        { status: 400 }
      );
    }

    if (!mime_type) {
      return NextResponse.json(
        { error: "MIME type is required." },
        { status: 400 }
      );
    }

    const {
      main_genre = "",
      sub_genre = "",
      ai_usage = "",
      parental_rating = "",
      cast = "",
      director = "",
      producer = "",
      studio = "",
    } = custom_params || {};

    const stringifiedCustomParams = Object.fromEntries(
      Object.entries({
        main_genre,
        sub_genre,
        ai_usage,
        parental_rating,
        cast,
        director,
        producer,
        studio,
        ...custom_params,
      }).map(([key, value]) => [key, value?.toString() || ""])
    );

    const JW_API_URL = `https://api.jwplayer.com/v2/sites/${process.env.JWPLAYER_SITE_ID}/media/`;

    // Step 1: Create the media object for multipart upload
    const metadataResponse = await fetch(JW_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.JWPLAYER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        upload: {
          method: "multipart",
        },
        metadata: {
          title,
          description,
          custom_params: stringifiedCustomParams,
          tags: Array.isArray(tags) ? tags : [],
        },
      }),
    });

    if (!metadataResponse.ok) {
      const errorData = await metadataResponse.json();
      const errorDescription =
        errorData.errors?.[0]?.description || "An unknown error occurred.";
      console.error("JW Player API Error:", errorData);

      return NextResponse.json(
        {
          error: `JW Player API Error: ${errorDescription}`,
          code: errorData.errors?.[0]?.code || "unknown_error",
        },
        { status: metadataResponse.status }
      );
    }

    const metadataData = await metadataResponse.json();

    const {
      upload_id: uploadId,
      upload_token: uploadToken,
      id: mediaId,
    } = metadataData;

    // Step 2: Link the trailer to the main video if applicable
    if (contentType === "trailer" && custom_params.connectedVideoId) {
      console.log(
        `Linking trailer ${mediaId} to video ${custom_params.connectedVideoId}`
      );
      await connectTrailerToVideo(custom_params.connectedVideoId, mediaId);
    }

    // Step 3: Link the video to the series if `seriesId` is provided
    if (seriesId) {
      const SERIES_UPDATE_URL = `https://api.jwplayer.com/v2/sites/${process.env.JWPLAYER_SITE_ID}/series/${seriesId}/`;

      try {
        const seriesDetailsResponse = await fetch(SERIES_UPDATE_URL, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${process.env.JWPLAYER_API_KEY}`,
          },
        });

        if (!seriesDetailsResponse.ok) {
          const detailsError = await seriesDetailsResponse.json();
          throw new Error(
            `Failed to fetch series details: ${
              detailsError.errors?.[0]?.description || "Unknown error."
            }`
          );
        }

        const seriesDetails = await seriesDetailsResponse.json();
        const currentMedia = seriesDetails.relationships?.media || [];

        const nextEpisodeNumber =
          currentMedia.length > 0
            ? Math.max(
                ...currentMedia.map((item: any) => item.episode_number)
              ) + 1
            : 1;

        const updatedMedia = [
          ...currentMedia,
          {
            id: mediaId,
            episode_number: nextEpisodeNumber,
          },
        ];

        const seriesUpdatePayload = {
          relationships: {
            media: updatedMedia,
          },
        };

        const seriesUpdateResponse = await fetch(SERIES_UPDATE_URL, {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${process.env.JWPLAYER_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(seriesUpdatePayload),
        });

        if (!seriesUpdateResponse.ok) {
          const seriesUpdateError = await seriesUpdateResponse.json();
          const errorDescription =
            seriesUpdateError.errors?.[0]?.description || "Unknown error.";
          throw new Error(`Series Update Error: ${errorDescription}`);
        }
      } catch (error) {
        console.error("Series Update Error:", error.message);
        throw new Error(`Failed to update series: ${error.message}`);
      }
    }

    // Return the multipart upload details
    return NextResponse.json({
      upload_id: uploadId,
      upload_token: uploadToken,
      media_id: mediaId,
      message: "Video metadata created and ready for multipart upload.",
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Something went wrong during media creation." },
      { status: 500 }
    );
  }
}
