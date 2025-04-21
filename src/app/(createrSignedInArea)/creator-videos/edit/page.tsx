"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import CreatorLoginLayout from "../../../layouts/CreatorLayout";
import { RedirectAlert } from "../../../../components/(AlertAndBadges)/RedirectAlert";
import { clearCachesForCreatorVideos } from "../../../../../utils/clearCachesForCreatorVideos";
import { Suspense } from "react";
import TagsInput from "../../../../components/(CreatorPortalComponents)/TagsInput";
import ContentTypeDropdown from "../../../../components/(CreatorPortalComponents)/ContentTypeDropdown";
import MovieFields from "../../../../components/(CreatorPortalComponents)/MovieFields";
import EpisodeFields from "../../../../components/(CreatorPortalComponents)/EpisodeFields";
import { ConfirmResetAlert } from "../../../../components/(AlertAndBadges)/ConfirmResetAlert";
import MusicVideoFields from "../../../../components/(CreatorPortalComponents)/MusicVideoFields";
import CreateSeriesModal from "../../../../components/(CreatorPortalComponents)/CreateSeriesModal";
import { CreateSeriesAlert } from "../../../../components/(AlertAndBadges)/CreateSeriesAlert";
import { fetchAccountDetails } from "../../../../../utils/fetchAccountDetails";
import { createSeries } from "../../../../../utils/createSeries";
import ThumbnailSelector from "../../../../components/(CreatorPortalComponents)/ThumbnailSelector";
import { uploadThumbnail } from "../../../../../utils/uploadThumbnail";
import { fetchThumbnails } from "../../../../../utils/fetchThumbnails";
import TrailerFields from "../../../../components/(CreatorPortalComponents)/TrailerFields";

interface CustomParams {
  main_genre?: string; // For movies
  sub_genre?: string; // For movies
  music_video_genre?: string; // Specific to music videos
  ai_usage: string;
  parental_rating: string;
  cast: string;
  director: string;
  producer: string;
  studio: string;
  inplayer_user_id: string;
  status: string;
  contentType: string;
}

interface VideoState {
  title: string;
  description: string;
  tags: string[];
  contentType: string;
  customParams: CustomParams;
  oldSeriesId?: string; // Optional field for the previous series ID
  seriesId?: string; // Current series ID
  staticThumbnail?: File | null; // Add this property
  motionThumbnail?: File | null; // Add this property
}

const EditVideoContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const videoId = searchParams.get("id");
  const [isSeriesLoading, setIsSeriesLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [contentType, setContentType] = useState("");
  const [customParams, setCustomParams] = useState({
    main_genre: "",
    sub_genre: "",
    music_video_genre: "", // Specific to music videos
    ai_usage: "",
    parental_rating: "",
    cast: "",
    director: "",
    producer: "",
    studio: "",
    inplayer_user_id: "",
    status: "under_review",
    contentType: "",
  });

  const [originalState, setOriginalState] = useState<VideoState | null>(null);
  const [seriesList, setSeriesList] = useState<{ id: string; title: string }[]>(
    []
  );
  const [createdSeriesTitle, setCreatedSeriesTitle] = useState("");
  const [selectedSeries, setSelectedSeries] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingDots, setLoadingDots] = useState(".");
  const [onEditPageLoader, setOnEditPageLoader] = useState(true);
  const [hasChanged, setHasChanged] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState<string | React.ReactNode>(
    ""
  );
  const [pendingContentType, setPendingContentType] = useState("");
  const [redirectAlertOpen, setRedirectAlertOpen] = useState(false);
  const [seriesAlertOpen, setSeriesAlertOpen] = useState(false);
  const [staticThumbnail, setStaticThumbnail] = useState<File | null>(null);
  const [motionThumbnail, setMotionThumbnail] = useState<File | null>(null);
  const [showThumbnails, setShowThumbnails] = useState(false);
  const [selectedTrailer, setSelectedTrailer] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch video details and series list concurrently
        const [videoResponse, seriesResponse] = await Promise.all([
          fetch(`/api/jwplayer/get-specific-video-details?id=${videoId}`),
          fetch("/api/jwplayer/get-series-list", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId: await fetchAccountDetails() }),
          }),
        ]);

        if (!videoResponse.ok || !seriesResponse.ok) {
          throw new Error("Failed to fetch video details or series list.");
        }

        const video = await videoResponse.json();
        const seriesListData = await seriesResponse.json();

        // Fetch thumbnails
        const thumbnails = await fetchThumbnails(videoId);

        // Convert thumbnail URLs to File objects
        const staticThumbnailFile = thumbnails.static
          ? await fetchFileFromUrl(thumbnails.static)
          : null;
        const motionThumbnailFile = thumbnails.motion
          ? await fetchFileFromUrl(thumbnails.motion)
          : null;

        console.log("Static Thumbnail File:", staticThumbnailFile);
        console.log("Motion Thumbnail File:", motionThumbnailFile);

        console.log("Video Metadata:", video);

        setStaticThumbnail(staticThumbnailFile);
        setMotionThumbnail(motionThumbnailFile);

        // Set series list
        const seriesList = seriesListData.series || [];
        setSeriesList(seriesList);

        // Set video details
        setTitle(video.metadata.title);
        setDescription(video.metadata.description);
        setTags(video.metadata.tags || []);
        setContentType(video.metadata.custom_params?.contentType || "");
        setCustomParams({
          main_genre: video.metadata.custom_params?.main_genre || "",
          sub_genre: video.metadata.custom_params?.sub_genre || "",
          music_video_genre:
            video.metadata.custom_params?.music_video_genre || "",
          ai_usage: video.metadata.custom_params?.ai_usage || "",
          parental_rating: video.metadata.custom_params?.parental_rating || "",
          cast: video.metadata.custom_params?.cast || "",
          director: video.metadata.custom_params?.director || "",
          producer: video.metadata.custom_params?.producer || "",
          studio: video.metadata.custom_params?.studio || "",
          inplayer_user_id:
            video.metadata.custom_params?.inplayer_user_id || "",
          status: video.metadata.custom_params?.status || "under_review",
          contentType: video.metadata.custom_params?.contentType || "",
        });

        // Match the series if present in video details
        if (video.series?.id) {
          const matchingSeries = seriesList.find(
            (series) => series.id === video.series.id
          );
          setSelectedSeries(matchingSeries?.id || "");
        }

        // Set original state for change tracking
        setOriginalState({
          title: video.metadata.title,
          description: video.metadata.description,
          tags: video.metadata.tags || [],
          contentType: video.metadata.custom_params?.contentType || "",
          customParams: {
            main_genre: video.metadata.custom_params?.main_genre || "",
            sub_genre: video.metadata.custom_params?.sub_genre || "",
            ai_usage: video.metadata.custom_params?.ai_usage || "",
            parental_rating:
              video.metadata.custom_params?.parental_rating || "",
            cast: video.metadata.custom_params?.cast || "",
            director: video.metadata.custom_params?.director || "",
            producer: video.metadata.custom_params?.producer || "",
            studio: video.metadata.custom_params?.studio || "",
            inplayer_user_id:
              video.metadata.custom_params?.inplayer_user_id || "",
            status: video.metadata.custom_params?.status || "under_review",
            contentType: video.metadata.custom_params?.contentType || "",
          },
          seriesId: video.series?.id || null, // Current series ID
          oldSeriesId: video.series?.id || null, // Set the same initially
          staticThumbnail: staticThumbnailFile,
          motionThumbnail: motionThumbnailFile,
        });
      } catch (error) {
        console.error("Error fetching video details or series list:", error);
      } finally {
        setOnEditPageLoader(false);
      }
    }
    if (videoId) {
      fetchData();
    }
  }, [videoId]);

  const fetchFileFromUrl = async (url: string): Promise<File | null> => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const fileName = url.split("/").pop() || "thumbnail";
      return new File([blob], fileName, { type: blob.type });
    } catch (error) {
      console.error(`Failed to fetch file from URL: ${url}`, error);
      return null;
    }
  };

  const handleCreateSeries = async (seriesData: {
    title: string;
    description: string;
    mainGenre: string;
    parentalRating: string;
  }): Promise<{ id: string }> => {
    try {
      const newSeries = await createSeries(seriesData);

      setSeriesList((prev) => [...prev, newSeries]); // Update series list
      setSelectedSeries(newSeries.id); // Automatically select the new series

      return { id: newSeries.id }; // Return only the series ID
    } catch (error) {
      console.error("Error creating series:", error);
      alert("Failed to create series. Please try again.");
      throw error; // Propagate the error
    }
  };

  useEffect(() => {
    const hasStateChanged = () => {
      const currentState = {
        title,
        description,
        tags,
        contentType,
        customParams,
      };
      return JSON.stringify(currentState) !== JSON.stringify(originalState);
    };
    setHasChanged(hasStateChanged());
  }, [title, description, tags, contentType, customParams, originalState]);

  useEffect(() => {
    if (!originalState) return; // Ensure originalState exists before proceeding

    // Check if switching from a valid contentType, not placeholder
    if (
      originalState.contentType &&
      originalState.contentType !== "" &&
      contentType !== originalState.contentType
    ) {
      const hasFilledFields = Object.values(originalState.customParams).some(
        (value) => value !== "" // Check if any field is filled
      );

      if (hasFilledFields) {
        setAlertTitle("Change Content Type");
        setAlertMessage(
          "Changing the content type will reset certain fields. Do you want to proceed?"
        );
        setPendingContentType(contentType); // Save new content type temporarily
        setAlertOpen(true);
      } else {
        // Directly reset only specific fields if no fields are filled
        setCustomParams((prev) => ({
          ...prev,
          main_genre: "",
          sub_genre: "",
          ai_usage: "",
          parental_rating: "",
          cast: "",
          director: "",
          producer: "",
          studio: "",
          // Preserve `inplayer_user_id` and `status`
        }));
      }
    }
    console.log("Original State:", originalState);
    console.log(customParams, "Custom Params");
  }, [contentType, originalState]);

  const handleConfirmContentTypeChange = () => {
    setCustomParams((prev) => ({
      ...prev,
      main_genre: "",
      sub_genre: "",
      music_video_genre:
        contentType === "music_video" ? "" : prev.music_video_genre,
      ai_usage: "",
      parental_rating: "",
      cast: "",
      director: "",
      producer: "",
      studio: "",
      // Preserve existing values for these fields
      inplayer_user_id: prev.inplayer_user_id,
      status: prev.status,
    }));
    setAlertOpen(false);
    console.log("Pending Content Type:", customParams);
  };

  const handleCancelContentTypeChange = () => {
    setContentType(originalState?.contentType || "");
    setAlertOpen(false);
  };

  const handleCustomParamsChange = (key: string, value: string) => {
    setCustomParams((prev) => ({ ...prev, [key]: value }));
  };

  const handleAddTag = (tag: string) => {
    setTags((prevTags) => [...prevTags, tag]);
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags((prevTags) => prevTags.filter((tag) => tag !== tagToRemove));
  };

  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setLoadingDots((prev) => {
          if (prev === ".") return "..";
          if (prev === "..") return "...";
          return ".";
        });
      }, 500);
      return () => clearInterval(interval);
    }
  }, [isLoading]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/jwplayer/update-video", {
        method: "PUT",
        body: JSON.stringify({
          id: videoId,
          title,
          description,
          tags,
          contentType: contentType || null,
          custom_params: {
            ...customParams,
            inplayer_user_id:
              customParams.inplayer_user_id || "default_user_id",
            status: customParams.status || "under_review",
            trailerId: selectedTrailer || null,
          },
          seriesId: selectedSeries || null, // Include seriesId if updating an episode
          oldSeriesId: originalState?.seriesId || null, // Use the old series ID from the state
        }),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Failed to update video metadata.");
      }

      const { id: mediaId } = await response.json();

      // Upload static thumbnail only if it has been updated
      if (
        staticThumbnail &&
        staticThumbnail !== originalState?.staticThumbnail
      ) {
        await uploadThumbnail(staticThumbnail, mediaId, title, description);
      }

      // Upload motion thumbnail only if it has been updated
      if (
        motionThumbnail &&
        motionThumbnail !== originalState?.motionThumbnail
      ) {
        await uploadThumbnail(motionThumbnail, mediaId, title, description);
      }

      // Update frontend state directly (optional)
      setOriginalState({
        title,
        description,
        tags,
        contentType,
        customParams: {
          ...customParams,
          contentType,
          inplayer_user_id: customParams.inplayer_user_id,
          status: customParams.status,
        },
        seriesId: selectedSeries || null, // Update with the new series ID
        oldSeriesId: selectedSeries || null, // Keep the updated series ID as the old one
        staticThumbnail, // Save the latest thumbnail
        motionThumbnail, // Save the latest thumbnail
      });

      await clearCachesForCreatorVideos();

      setAlertTitle("Success");
      setAlertMessage("Video updated successfully!");
      setRedirectAlertOpen(true);
    } catch (error) {
      console.error(error);
      setAlertTitle("Error");
      setAlertMessage("An error occurred while updating the video.");
      setAlertOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  if (onEditPageLoader) {
    // Display the loader while fetching data
    return (
      <div className="flex justify-center items-center pt-20">
        <div className="h-16 w-16 border-4 border-t-emerald-500 border-gray-300 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex flex-col items-center justify-center">
          <div className="text-white text-lg font-bold">
            Updating Information{loadingDots}
          </div>
          <p className="mt-2 text-xs text-gray-200 text-center">
            This might take a moment. Please wait...
          </p>
        </div>
      )}
      <RedirectAlert
        title={alertTitle}
        message={alertMessage}
        postClickMessage="Redirecting to your videos. Please wait..."
        isOpen={redirectAlertOpen}
        onConfirm={() => {
          router.push("/creator-videos");
          router.refresh();
        }}
        buttonText="OK"
        postClickButtonText="Redirecting..."
        delay={1000}
      />

      <ConfirmResetAlert
        title={alertTitle}
        message={alertMessage}
        isOpen={alertOpen}
        onConfirm={handleConfirmContentTypeChange}
        onCancel={handleCancelContentTypeChange}
      />

      <CreateSeriesModal
        isOpen={isModalOpen && !seriesAlertOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateSeries}
      />

      <CreateSeriesAlert
        isOpen={seriesAlertOpen}
        onClose={() => {
          setSeriesAlertOpen(false);
          setIsModalOpen(false); // Ensure the modal is also closed
        }}
        seriesName={createdSeriesTitle}
      />

      <div className="max-w-4xl mx-auto mt-8 px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => router.back()}
          className="mb-4 flex items-center justify-center p-2 text-white bg-black rounded-full hover:bg-gray-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <h1 className="text-2xl font-bold text-gray-900">Edit Video</h1>
        <form onSubmit={handleUpdate} className="space-y-6 mt-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-900">
              Title
              <span className="ml-1 text-red-500">*</span>{" "}
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-emerald-600 sm:text-sm"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-900">
              Description
              <span className="ml-1 text-red-500">*</span>{" "}
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-emerald-600 sm:text-sm"
              rows={4}
            />
          </div>

          <ContentTypeDropdown
            contentType={contentType}
            onContentTypeChange={setContentType}
            seriesList={seriesList}
            selectedSeries={selectedSeries}
            onSeriesSelect={setSelectedSeries}
            onCreateSeries={() => setIsModalOpen(true)}
          />

          {/* Dynamic Fields for "Movie" */}
          {contentType === "movie" && (
            <MovieFields
              customParams={customParams}
              handleCustomParamsChange={handleCustomParamsChange}
            />
          )}
          {contentType === "episode" && (
            <EpisodeFields
              customParams={customParams}
              handleCustomParamsChange={handleCustomParamsChange}
            />
          )}
          {contentType === "music_video" && (
            <MusicVideoFields
              customParams={{
                music_video_genre: customParams.music_video_genre,
                parental_rating: customParams.parental_rating,
                ai_usage: customParams.ai_usage,
                cast: customParams.cast,
                director: customParams.director,
                producer: customParams.producer,
                studio: customParams.studio,
              }}
              handleCustomParamsChange={(key, value) =>
                setCustomParams((prev) => ({ ...prev, [key]: value }))
              }
            />
          )}

          {contentType === "trailer" && (
            <TrailerFields
              selectedVideo={selectedTrailer}
              onSelectVideo={setSelectedTrailer}
            />
          )}

          {/* Tags */}
          <TagsInput
            tags={tags}
            onAddTag={handleAddTag}
            onRemoveTag={handleRemoveTag}
          />
          <div className="mt-4 flex items-center">
            <span
              className="text-xs text-emerald-600 underline cursor-pointer"
              onClick={() => setShowThumbnails((prev) => !prev)}
            >
              Choose thumbnails
            </span>
            <div className="relative ml-2 group">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-500 cursor-pointer"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10c0 4.418-3.582 8-8 8s-8-3.582-8-8 3.582-8 8-8 8 3.582 8 8zm-9 0a1 1 0 112 0v3a1 1 0 11-2 0v-3zm1-3a1 1 0 100-2 1 1 0 000 2z"
                  clipRule="evenodd"
                />
              </svg>
              <div className="absolute bottom-full mb-4 hidden group-hover:block bg-white p-4 shadow-md rounded text-xs text-gray-700 w-32">
                Thumbnails are automatically created. But you can customize them
                here.
              </div>
            </div>
          </div>

          {showThumbnails && (
            <ThumbnailSelector
              staticThumbnail={staticThumbnail}
              motionThumbnail={motionThumbnail}
              setStaticThumbnail={setStaticThumbnail}
              setMotionThumbnail={setMotionThumbnail}
              isThumbnailLoading={isLoading} // Pass loading state
              maxMotionThumbnailSize={100 * 1024 * 1024} // 100 MB
            />
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full bg-emerald-500 text-white py-2 px-4 rounded-md ${
              !hasChanged
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-emerald-600"
            }`}
            disabled={!hasChanged || isLoading}
          >
            {isLoading ? "Updating..." : "Update Video"}
          </button>
        </form>
      </div>
    </>
  );
};

export default function EditVideo() {
  return (
    <CreatorLoginLayout>
      <Suspense fallback={<div>Loading...</div>}>
        <EditVideoContent />
      </Suspense>
    </CreatorLoginLayout>
  );
}
