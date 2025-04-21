"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import CreatorLoginLayout from "../../../layouts/CreatorLayout";
import withAuth from "../../../../hoc/withAuth";
import { fetchAllThumbnailsInBulk } from "../../../../../utils/fetchAllThumbnailsInBulk";

const ManageSeries = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const seriesId = searchParams.get("id");

  const [seriesDetails, setSeriesDetails] = useState(null);
  const [videos, setVideos] = useState([]);
  const [allUserVideos, setAllUserVideos] = useState([]);
  const [thumbnails, setThumbnails] = useState({}); // Store fetched thumbnails
  const [loading, setLoading] = useState(true);
  const [loadingVideoId, setLoadingVideoId] = useState(null); // Track which video is loading

  useEffect(() => {
    async function fetchSeriesDetails() {
      try {
        const response = await fetch(
          `/api/jwplayer/get-series-details?id=${seriesId}`
        );
        if (!response.ok) throw new Error("Failed to fetch series details.");
        const data = await response.json();
        setSeriesDetails(data.series);
        setVideos(data.videos || []);

        // Fetch thumbnails for all associated videos in bulk
        const videoIds = (data.videos || []).map((video) => video.id);
        if (videoIds.length === 0) {
          console.warn("No video IDs found to fetch thumbnails.");
          return; // Exit early if no video IDs
        }
        const fetchedThumbnails = await fetchAllThumbnailsInBulk(videoIds);

        // Update thumbnails state
        setThumbnails(fetchedThumbnails);
      } catch (error) {
        console.error("Error fetching series details:", error);
      } finally {
        setLoading(false);
      }
    }

    async function fetchAllVideos() {
      try {
        const token =
          localStorage.getItem("inplayer_access_token") ||
          sessionStorage.getItem("inplayer_access_token");

        if (!token) {
          throw new Error("User is not logged in.");
        }

        const accountResponse = await fetch(
          "https://services.inplayer.com/accounts",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!accountResponse.ok) {
          throw new Error("Failed to fetch account details.");
        }

        const accountDetails = await accountResponse.json();
        const inplayerUserId = accountDetails.id;

        const videosResponse = await fetch(
          `/api/jwplayer/get-creator-videos?inplayer_user_id=${inplayerUserId}`
        );

        if (!videosResponse.ok) {
          throw new Error("Failed to fetch videos.");
        }

        const videosData = await videosResponse.json();
        setAllUserVideos(videosData || []);

        // Fetch all thumbnails in bulk
        const videoIds = videosData.map((video) => video.id);
        if (videoIds.length === 0) {
          console.warn("No user video IDs found to fetch thumbnails.");
          return; // Exit early if no video IDs
        }
        const fetchedThumbnails = await fetchAllThumbnailsInBulk(videoIds);

        setThumbnails((prev) => ({
          ...prev,
          ...fetchedThumbnails, // Merge the new thumbnails into the existing state
        }));
      } catch (error) {
        console.error("Error fetching all user videos:", error);
      }
    }

    if (seriesId) {
      fetchSeriesDetails();
      fetchAllVideos();
    }
  }, [seriesId]);

  const handleAddVideo = async (videoId) => {
    try {
      setLoadingVideoId(videoId); // Set the loading video ID
      const updatedRelationships = [
        ...videos.map((video, index) => ({
          id: video.id,
          episode_number: index + 1,
        })),
        {
          id: videoId,
          episode_number: videos.length + 1,
        },
      ];

      const response = await fetch("/api/jwplayer/add-video-to-series", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          seriesId,
          relationships: { media: updatedRelationships },
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to add video to series.");
      }

      const videoDetailsResponse = await fetch(
        "/api/jwplayer/get-video-details-for-series-after-adding-new-video",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ videoId }),
        }
      );

      if (!videoDetailsResponse.ok) {
        const error = await videoDetailsResponse.json();
        throw new Error(
          error.message || "Failed to fetch video details for series."
        );
      }

      const updatedVideo = await videoDetailsResponse.json();
      setVideos((prev) => [...prev, updatedVideo]); // Update local state
    } catch (error) {
      console.error("Error adding video to series:", error);
    } finally {
      setLoadingVideoId(null);
    }
  };

  const handleRemoveVideo = async (videoId) => {
    try {
      setLoadingVideoId(videoId); // Set the loading video ID
      const updatedRelationships = videos
        .filter((video) => video.id !== videoId)
        .map((video, index) => ({
          id: video.id,
          episode_number: index + 1,
        }));

      const response = await fetch("/api/jwplayer/remove-video-from-series", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          seriesId,
          relationships: { media: updatedRelationships },
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to remove video from series.");
      }

      setVideos((prev) => prev.filter((video) => video.id !== videoId)); // Update local state
    } catch (error) {
      console.error("Error removing video from series:", error);
    } finally {
      setLoadingVideoId(null); // Clear the loading video ID
    }
  };

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center pt-20">
          <div className="h-16 w-16 border-4 border-t-emerald-500 border-gray-300 rounded-full animate-spin"></div>
        </div>
      ) : (
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
          <h1 className="text-2xl font-bold text-gray-900">
            Manage Series: {seriesDetails?.title || "Untitled Series"}
          </h1>
          <p className="text-sm text-gray-600 mt-2">
            Add or remove videos from this series.
          </p>

          {/* Associated Videos */}
          {/* Associated Videos */}
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-800">
              Associated Videos
            </h2>
            {videos.length === 0 ? (
              <p className="text-gray-600 text-sm">No videos in this series.</p>
            ) : (
              <ul className="space-y-4 mt-4">
                {videos.map((video) => (
                  <li
                    key={video.id}
                    className="flex justify-between items-center"
                  >
                    <div className="flex items-center gap-4">
                      {/* Use the thumbnails state */}
                      {thumbnails[video.id] ? (
                        <img
                          src={thumbnails[video.id]} // Use the mapped thumbnail URL
                          alt={`Thumbnail for ${
                            video.title || "Untitled Video"
                          }`}
                          className="w-16 h-16 rounded object-cover"
                        />
                      ) : (
                        <div className="w-16 text-xs h-16 bg-gray-300 rounded flex items-center justify-center text-gray-500">
                          No Image
                        </div>
                      )}

                      <div>
                        <span className="font-medium line-clamp-2">
                          {video.title || "Untitled Video"}
                        </span>
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {video.description || "No description available"}
                        </p>

                        <p className="text-xs text-gray-500">
                          Duration:{" "}
                          {video.duration
                            ? `${Math.floor(video.duration / 60)}m ${Math.round(
                                video.duration % 60
                              )}s`
                            : "N/A"}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemoveVideo(video.id)}
                      disabled={loadingVideoId === video.id} // Disable if loading
                      className={`text-red-600 text-sm hover:underline ${
                        loadingVideoId === video.id
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                    >
                      {loadingVideoId === video.id ? "Removing..." : "Remove"}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Available Videos */}
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-gray-800">
              Available Videos
            </h2>
            {allUserVideos.length === 0 ? (
              <p className="text-gray-600 text-sm">
                No videos available to add.
              </p>
            ) : (
              <ul className="space-y-4 mt-4">
                {allUserVideos
                  .filter((video) => !videos.some((v) => v.id === video.id))
                  .map((video) => (
                    <li
                      key={video.id}
                      className="flex justify-between items-center"
                    >
                      <div className="flex items-center gap-4">
                        {/* Add thumbnail if available */}
                        {thumbnails[video.id] ? (
                          <img
                            src={thumbnails[video.id]}
                            alt={`Thumbnail for ${
                              video.metadata?.title || "Untitled Video"
                            }`}
                            className="w-16 h-16 rounded object-cover"
                          />
                        ) : (
                          <div className="w-16 text-xs h-16 bg-gray-300 rounded flex items-center justify-center text-gray-500">
                            No Image
                          </div>
                        )}
                        <div>
                          <span className="font-medium line-clamp-2">
                            {video.metadata?.title || "Untitled Video"}
                          </span>
                          <p className="text-sm text-gray-600 line-clamp-2">
                            {video.metadata?.description ||
                              "No description available"}
                          </p>
                          <p className="text-xs text-gray-500">
                            Duration:{" "}
                            {video.duration
                              ? `${Math.floor(
                                  video.duration / 60
                                )}m ${Math.round(video.duration % 60)}s`
                              : "N/A"}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleAddVideo(video.id)}
                        disabled={loadingVideoId === video.id} // Disable if loading
                        className={`text-emerald-600 text-sm hover:underline ${
                          loadingVideoId === video.id
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                        }`}
                      >
                        {loadingVideoId === video.id ? "Adding..." : "Add"}
                      </button>
                    </li>
                  ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default withAuth(ManageSeries);
