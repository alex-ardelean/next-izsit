"use client";

import { useState, useEffect } from "react";
import CreatorLoginLayout from "../../layouts/CreatorLayout";
import { CloudArrowUpIcon } from "@heroicons/react/24/outline";
import confetti from "canvas-confetti";
import { CustomAlert } from "../../../components/(AlertAndBadges)/CustomAlert";
import { CreateSeriesAlert } from "../../../components/(AlertAndBadges)/CreateSeriesAlert";
import SelectedVideoBadge from "../../../components/(AlertAndBadges)/SelectedVideoBadge";
import withAuth from "../../../hoc/withAuth";
import TagsInput from "../../../components/(CreatorPortalComponents)/TagsInput";
import ContentTypeDropdown from "../../../components/(CreatorPortalComponents)/ContentTypeDropdown";
import MovieFields from "../../../components/(CreatorPortalComponents)/MovieFields";
import EpisodeFields from "../../../components/(CreatorPortalComponents)/EpisodeFields";
import MusicVideoFields from "../../../components/(CreatorPortalComponents)/MusicVideoFields";
import CreateSeriesModal from "../../../components/(CreatorPortalComponents)/CreateSeriesModal";
import { fetchAccountDetails } from "../../../../utils/fetchAccountDetails";
import { createSeries } from "../../../../utils/createSeries";
import ThumbnailSelector from "../../../components/(CreatorPortalComponents)/ThumbnailSelector";
import { uploadThumbnail } from "../../../../utils/uploadThumbnail";
import TrailerFields from "../../../components/(CreatorPortalComponents)/TrailerFields";

const UploadVideo = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSeriesLoading, setIsSeriesLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | React.ReactNode>(
    null
  );
  const [alertOpen, setAlertOpen] = useState(false);
  const [seriesAlertOpen, setSeriesAlertOpen] = useState(false);
  const [createdSeriesTitle, setCreatedSeriesTitle] = useState("");
  const [loadingDots, setLoadingDots] = useState(".");
  const [tags, setTags] = useState<string[]>([]);
  const [contentType, setContentType] = useState("");
  const [seriesList, setSeriesList] = useState<{ id: string; title: string }[]>(
    []
  );
  const [selectedSeries, setSelectedSeries] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [movieParams, setMovieParams] = useState({
    main_genre: "",
    sub_genre: "",
    ai_usage: "",
    parental_rating: "",
    cast: "",
    director: "",
    producer: "",
    studio: "",
  });
  const [episodeParams, setEpisodeParams] = useState({
    main_genre: "",
    sub_genre: "",
    ai_usage: "",
    parental_rating: "",
    cast: "",
    director: "",
    producer: "",
    studio: "",
  });

  const [musicVideoParams, setMusicVideoParams] = useState({
    music_video_genre: "",
    parental_rating: "",
    ai_usage: "",
    cast: "",
    director: "",
    producer: "",
    studio: "",
  });

  const [staticThumbnail, setStaticThumbnail] = useState<File | null>(null);
  const [motionThumbnail, setMotionThumbnail] = useState<File | null>(null);
  const [showThumbnails, setShowThumbnails] = useState(false);
  const [selectedVideoId, setSelectedVideoId] = useState("");

  const handleMovieParamsChange = (key: string, value: string) => {
    setMovieParams((prev) => ({ ...prev, [key]: value }));
  };
  const handleEpisodeParamsChange = (key: string, value: string) => {
    setEpisodeParams((prev) => ({ ...prev, [key]: value }));
  };

  const handleMusicVideoParamsChange = (key: string, value: string) => {
    setMusicVideoParams((prev) => ({ ...prev, [key]: value }));
  };

  const handleSelectVideo = (videoId) => {
    setSelectedVideoId(videoId);
  };

  useEffect(() => {
    const fetchSeriesList = async () => {
      try {
        // Fetch the user's ID
        const inplayerUserId = await fetchAccountDetails();
        if (!inplayerUserId) {
          throw new Error("User ID is required to fetch series.");
        }

        // Fetch series from the API route with the user's ID in the body
        const response = await fetch("/api/jwplayer/get-series-list", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: inplayerUserId }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch series list.");
        }

        const data = await response.json();
        const seriesList = data.series || [];
        setSeriesList(seriesList);
      } catch (error) {
        console.error("Error fetching series:", error);
      }
    };

    fetchSeriesList();
  }, []);

  const handleCreateSeries = async (seriesData: {
    title: string;
    description: string;
    mainGenre: string;
    parentalRating: string;
  }): Promise<{ id: string }> => {
    try {
      setIsSeriesLoading(true); // Start loading

      // Call the utility function to create the series
      const newSeries = await createSeries(seriesData);

      // Add the new series to the local state
      setSeriesList((prev) => [...prev, newSeries]);

      // Automatically select the new series
      setSelectedSeries(newSeries.id);

      // Return the created series to the caller
      return { id: newSeries.id }; // Return only the series ID
    } catch (error) {
      console.error("Error creating series:", error);
      alert("There was an error creating the series. Please try again.");
      throw error; // Propagate the error to the caller
    } finally {
      setIsSeriesLoading(false); // End loading
    }
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
      return () => clearInterval(interval); // Cleanup interval on unmount
    }
  }, [isLoading]);

  const handleAddTag = (tag: string) => {
    setTags((prevTags) => [...prevTags, tag]);
  };

  const handleRemoveTag = (tag: string) => {
    setTags((prevTags) => prevTags.filter((t) => t !== tag));
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];

      // Validate file size (5 GB limit)
      if (selectedFile.size > 5368709120) {
        setAlertMessage(
          <>
            🚨 The file size exceeds the 5 GB limit. <br />
            If you need to upload a larger file, contact us at{" "}
            <a
              href="mailto:info@izsit.com"
              className="text-emerald-600 underline"
            >
              info@izsit.com
            </a>
            .
          </>
        );
        setAlertOpen(true);
        return;
      }

      setVideo(selectedFile);
    }
  };

  const handleVideoDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const selectedFile = e.dataTransfer.files[0];

      // Validate file size (5 GB limit)
      if (selectedFile.size > 5368709120) {
        setAlertMessage(
          <>
            🚨 The file size exceeds the 5 GB limit. <br />
            If you need to upload a larger file, contact us at{" "}
            <a
              href="mailto:info@izsit.com"
              className="text-emerald-600 underline"
            >
              info@izsit.com
            </a>
            .
          </>
        );
        setAlertOpen(true);
        return;
      }

      setVideo(selectedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!video) {
      alert("Please upload a video before submitting.");
      return;
    }

    setIsLoading(true);

    try {
      // Fetch the uploader's Customer ID
      const customerId = await fetchAccountDetails();
      if (!customerId) throw new Error("Failed to retrieve customer ID.");

      // Get the MIME type of the video
      const mime_type = video.type;

      const params = {
        ...(contentType === "movie"
          ? movieParams
          : contentType === "episode"
          ? episodeParams
          : contentType === "music_video"
          ? musicVideoParams
          : {}),
        inplayer_user_id: customerId,
        status: "under_review",
        contentType,
        connectedVideoId: selectedVideoId, // Include selected video ID for trailers
      };

      // Step 1: Create a media object for multipart upload
      const createMediaResponse = await fetch("/api/jwplayer/create-media", {
        method: "POST",
        body: JSON.stringify({
          title,
          description,
          custom_params: params,
          mime_type,
          tags,
          seriesId: selectedSeries || undefined,
          contentType,
          upload_method: "multipart",
        }),
        headers: { "Content-Type": "application/json" },
      });

      if (!createMediaResponse.ok) throw new Error("Failed to create media.");

      const {
        upload_id: uploadId,
        upload_token: uploadToken,
        media_id: mediaId,
      } = await createMediaResponse.json();

      // Step 2: Split the video file into parts
      const fileSize = video.size;
      let partSize = 5 * 1024 * 1024; // 5 MB per part

      if (fileSize > 500 * 1024 * 1024) {
        partSize = 25 * 1024 * 1024; // 25MB chunks for files >500MB
      } else if (fileSize > 100 * 1024 * 1024) {
        partSize = 10 * 1024 * 1024; // 10MB chunks for files >100MB
      }
      const totalParts = Math.ceil(fileSize / partSize);

      const parts = [];
      for (let i = 0; i < totalParts; i++) {
        const start = i * partSize;
        const end = Math.min(start + partSize, fileSize);
        parts.push(video.slice(start, end));
      }

      // Step 3: Retrieve upload links for each part
      const partsResponse = await fetch(
        `/api/jwplayer/get-upload-parts?uploadId=${uploadId}&pageLength=${totalParts}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${uploadToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!partsResponse.ok) throw new Error("Failed to fetch upload parts.");

      const { parts: uploadParts } = await partsResponse.json();

      // Step 4: Upload each part to its respective upload link
      for (let i = 0; i < parts.length; i++) {
        const part = parts[i];
        const uploadLink = uploadParts[i].upload_link;

        let attempts = 0;
        let success = false;

        while (attempts < 3 && !success) {
          try {
            const uploadResponse = await fetch(uploadLink, {
              method: "PUT",
              body: part,
            });

            if (!uploadResponse.ok) {
              const errorDetails = await uploadResponse.text();
              console.error(`Failed to upload part ${i + 1}:`, {
                status: uploadResponse.status,
                details: errorDetails,
              });
              throw new Error(`Failed to upload part ${i + 1}`);
            }

            success = true;
          } catch (error) {
            attempts++;
            console.warn(`Retrying part ${i + 1} (Attempt ${attempts}/3)...`);
            if (attempts === 3) throw error; // Give up after 3 attempts
          }
        }
      }

      // Step 5: Complete the upload
      const completeUploadResponse = await fetch(
        `/api/jwplayer/complete-upload?uploadId=${uploadId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${uploadToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!completeUploadResponse.ok) {
        throw new Error("Failed to complete the upload.");
      }

      // Step 6: Check media status
      const statusResponse = await fetch(
        `https://api.jwplayer.com/v2/sites/${process.env.NEXT_PUBLIC_JWPLAYER_SITE_ID}/media/${mediaId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_JWPLAYER_API_KEY}`,
          },
        }
      );

      const statusData = await statusResponse.json();

      // Step 7: Upload thumbnails (if available)
      if (staticThumbnail) {
        await uploadThumbnail(staticThumbnail, mediaId, title, description);
      }
      if (motionThumbnail) {
        await uploadThumbnail(motionThumbnail, mediaId, title, description);
      }

      // Step 8: Confetti Effect
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
      });

      setAlertMessage(
        <>
          🎉 Your video <strong>&quot;{title}&quot;</strong> has been uploaded
          successfully! It&apos;s currently under review.
          <br />
          <br />
          Stay tuned for updates!
        </>
      );
      setAlertOpen(true);

      // Reset form state
      setTitle("");
      setDescription("");
      setVideo(null);
      setTags([]);
      setContentType("");
      setMovieParams({
        main_genre: "",
        sub_genre: "",
        ai_usage: "",
        parental_rating: "",
        cast: "",
        director: "",
        producer: "",
        studio: "",
      });
      setEpisodeParams({
        main_genre: "",
        sub_genre: "",
        ai_usage: "",
        parental_rating: "",
        cast: "",
        director: "",
        producer: "",
        studio: "",
      });
      setMusicVideoParams({
        music_video_genre: "",
        parental_rating: "",
        ai_usage: "",
        cast: "",
        director: "",
        producer: "",
        studio: "",
      });
      setSelectedVideoId("");
      setStaticThumbnail(null);
      setMotionThumbnail(null);
      setShowThumbnails(false);

      const fileInput = document.getElementById("video") as HTMLInputElement;
      if (fileInput) {
        fileInput.value = ""; // Reset the file input field
      }
    } catch (error) {
      console.error("Upload Error:", error.message);
      alert(error.message || "An error occurred during the upload process.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CreatorLoginLayout>
      {/* Overlay to disable interactions when loading */}
      {isLoading && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex flex-col items-center justify-center">
          <div className="text-white text-lg font-bold">
            Uploading{loadingDots}
          </div>
          <p className="mt-2 text-xs text-gray-200 text-center">
            Note: This may take a couple of minutes depending on the size of the
            file.
          </p>
        </div>
      )}

      <div
        className={`max-w-4xl mx-auto mt-8 px-4 sm:px-6 lg:px-8 ${
          isLoading ? "pointer-events-none opacity-50" : ""
        }`}
      >
        <h1 className="text-2xl font-bold text-gray-900">Upload Video</h1>
        <p className="mt-2 text-sm text-gray-600">
          Upload your video to the Izsit platform. Only one video can be
          uploaded at a time.
        </p>
        <p className="mt-2 text-sm text-gray-600">
          For the best experience, ensure a fast and stable internet connection
          while uploading your video.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          {/* Video Title */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-900"
            >
              Video Title
              <span className="ml-1 text-red-500">*</span>{" "}
            </label>
            <div className="mt-2">
              <input
                id="title"
                name="title"
                type="text"
                placeholder="Enter video title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                autoComplete="off"
                autoCorrect="off"
                spellCheck="false"
                required
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-emerald-600 sm:text-sm"
              />
            </div>
          </div>

          {/* Video Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-900"
            >
              Video Description
              <span className="ml-1 text-red-500">*</span>{" "}
            </label>
            <div className="mt-2">
              <textarea
                id="description"
                name="description"
                placeholder="Enter video description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-emerald-600 sm:text-sm"
                rows={4}
              />
            </div>
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
              customParams={movieParams}
              handleCustomParamsChange={handleMovieParamsChange}
            />
          )}
          {contentType === "episode" && (
            <EpisodeFields
              customParams={episodeParams}
              handleCustomParamsChange={handleEpisodeParamsChange}
            />
          )}
          {/* Dynamic Fields for "Music Video" */}
          {contentType === "music_video" && (
            <MusicVideoFields
              customParams={musicVideoParams}
              handleCustomParamsChange={handleMusicVideoParamsChange}
            />
          )}
          {contentType === "trailer" && (
            <TrailerFields
              selectedVideo={selectedVideoId}
              onSelectVideo={handleSelectVideo}
            />
          )}

          {/* Tags */}
          <TagsInput
            tags={tags}
            onAddTag={handleAddTag}
            onRemoveTag={handleRemoveTag}
          />

          {/* Video Upload */}
          <div>
            <label
              htmlFor="video"
              className="block text-sm font-medium text-gray-900"
            >
              Choose Video
            </label>
            <p className="mt-1 mb-1 text-xs text-gray-600">
              Supported formats: <strong>MP4, MOV, AVI, WMV, FLV, WEBM</strong>.
              <br /> For best results, use <strong>MP4 </strong>. Maximum file
              size: <strong>5 GB</strong>. Contact us on{" "}
              <strong>info@izsit.com</strong> if your file is larger.
            </p>
            <div
              className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleVideoDrop}
            >
              <CloudArrowUpIcon className="mx-auto w-12 h-12 text-gray-400" />
              <span className="mt-2 block text-sm font-semibold text-gray-900">
                Drag and drop your video, or click to select
              </span>
              <input
                id="video"
                name="video"
                type="file"
                accept="video/mp4, video/mov, video/avi, video/wmv, video/flv, video/webm"
                onChange={handleVideoChange}
                className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
              />
            </div>

            {video && (
              <SelectedVideoBadge
                videoName={video.name}
                onRemove={() => {
                  setVideo(null); // Clear the video
                  const fileInput = document.getElementById(
                    "video"
                  ) as HTMLInputElement;
                  if (fileInput) {
                    fileInput.value = ""; // Reset the file input field
                  }
                }}
              />
            )}
          </div>

          {/* I am hiding this thumbnail selector for now - as if chosen , it takes a long time to upload. 
Note that there is still an if/else in the Submit function to handle the thumbnail upload. That one can just still be there.  */}
          {/* <div className="mt-4 flex items-center">
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
              isThumbnailLoading={isLoading}
              maxMotionThumbnailSize={100 * 1024 * 1024}
            />
          )} */}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full rounded-md bg-emerald-500 py-2 px-4 text-white text-3xl font-bold hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            disabled={isLoading}
          >
            {isLoading ? "Uploading..." : "Upload Video"}
          </button>
        </form>

        {/* Custom Alert */}
        <CustomAlert
          title="Video Upload"
          message={alertMessage || ""}
          isOpen={alertOpen}
          onClose={() => setAlertOpen(false)}
        />
        <CreateSeriesModal
          isOpen={isModalOpen && !seriesAlertOpen} // Ensure modal is closed when alert is open
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleCreateSeries} // Pass the updated handleCreateSeries function
        />

        <CreateSeriesAlert
          isOpen={seriesAlertOpen}
          onClose={() => {
            setSeriesAlertOpen(false);
            setIsModalOpen(false); // Ensure the modal is also closed
          }}
          seriesName={createdSeriesTitle}
        />
      </div>
    </CreatorLoginLayout>
  );
};

export default withAuth(UploadVideo);
