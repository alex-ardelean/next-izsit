"use client";

import { useEffect, useState } from "react";
import CreatorLoginLayout from "../../layouts/CreatorLayout";
import withAuth from "../../../hoc/withAuth";
import { useRouter } from "next/navigation";
import DeleteModal from "../../../components/(CreatorPortalComponents)/DeleteModal";
import { TrashIcon } from "@heroicons/react/24/outline";

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

const CreatorVideos = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [videoToDelete, setVideoToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function fetchVideos() {
      setLoading(true);
      try {
        const token =
          localStorage.getItem("inplayer_access_token") ||
          sessionStorage.getItem("inplayer_access_token");

        if (!token) {
          throw new Error("User is not logged in.");
        }

        // Fetch account details to get inplayer_user_id
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

        // Fetch videos for the logged-in user
        const videoResponse = await fetch(
          `/api/jwplayer/get-creator-videos?inplayer_user_id=${inplayerUserId}`
        );

        if (!videoResponse.ok) {
          throw new Error("Failed to fetch videos.");
        }

        const data = await videoResponse.json();
        setVideos(data);
      } catch (error) {
        console.error(error);
        setVideos([]); // Ensure videos is reset if an error occurs
      } finally {
        setLoading(false);
      }
    }

    fetchVideos();
  }, []);

  const handleDeleteClick = (video) => {
    setVideoToDelete(video);
    setDeleteModalOpen(true);
  };

  const handleDeleteVideo = async () => {
    if (!videoToDelete) return;

    setIsDeleting(true);
    try {
      const response = await fetch("/api/jwplayer/delete-video", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ videoId: videoToDelete.id }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete video.");
      }

      setVideos((prevVideos) =>
        prevVideos.filter((video) => video.id !== videoToDelete.id)
      );

      setDeleteModalOpen(false);
      setVideoToDelete(null);
    } catch (error) {
      console.error("Error deleting video:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <CreatorLoginLayout>
      <div className="max-w-7xl mx-auto mt-8  sm:px-6 lg:px-8">
        <header>
          <h1 className="text-2xl font-bold text-gray-900">Your videos</h1>
          {videos.length > 0 && (
            <p className="mt-1 text-xs text-gray-500">
              Note: Changes made to your videos may take a couple of minutes to
              reflect here.
            </p>
          )}
        </header>
        {loading ? (
          <div className="flex justify-center items-center pt-20">
            <div className="h-16 w-16 border-4 border-t-emerald-500 border-gray-300 rounded-full animate-spin"></div>
          </div>
        ) : videos.length === 0 ? (
          <div className="mt-4 text-gray-600 text-center">
            <p>No videos found yet.</p>
            <p>
              It might take a couple of minutes for your videos to appear after
              uploading.
            </p>
            <p>Upload your first video to get started!</p>
          </div>
        ) : (
          <ul
            role="list"
            className="grid grid-cols-1 gap-y-8 gap-x-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 mt-4"
          >
            {videos.map((video) => (
              <li key={video.id} className="relative">
                {/* Show "Processing..." if the video is not ready */}
                {video.status !== "ready" ? (
                  <div className="aspect-video w-full flex justify-center items-center bg-gray-200">
                    <p className="text-gray-600">Processing video...</p>
                  </div>
                ) : (
                  // Show JW Player iframe only when the video is fully processed
                  <div className="group overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
                    <iframe
                      title={`Video: ${video.metadata.title}`}
                      src={`https://content.jwplatform.com/players/${
                        video.id
                      }-${
                        process.env.JWPLAYER_PLAYER_KEY
                      }.html?t=${new Date().getTime()}`} // Cache-busting timestamp
                      className="aspect-video w-full"
                      frameBorder="0"
                      allowFullScreen
                    />
                  </div>
                )}

                {/* Video Title */}
                <p className="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-900">
                  {video.metadata.title}
                </p>

                {/* Delete Button */}
                <button
                  className="absolute top-2 left-2 z-10 rounded-full bg-red-500 p-2 hover:bg-red-600"
                  onClick={() => handleDeleteClick(video)}
                >
                  <TrashIcon className="h-4 w-4 text-white" />
                </button>

                {/* Status Badge */}
                <p className="mt-1">
                  <span
                    className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                      video.metadata?.custom_params?.status === "approved"
                        ? "bg-green-50 text-green-700 ring-green-600/20"
                        : video.metadata?.custom_params?.status ===
                          "disapproved"
                        ? "bg-red-50 text-red-700 ring-red-600/20"
                        : "bg-yellow-50 text-yellow-800 ring-yellow-600/20"
                    }`}
                  >
                    {capitalize(
                      video.metadata?.custom_params?.status || "Unknown"
                    )}
                  </span>
                </p>

                <p className="mt-2 text-xs text-gray-500">
                  NOTE: Updates to thumbnails and titles may take a few minutes
                  to appear here.
                </p>

                {/* Edit Button */}
                <button
                  onClick={() =>
                    router.push(`/creator-videos/edit?id=${video.id}`)
                  }
                  className="w-full rounded-md mt-2 bg-emerald-500 py-2 px-4 text-white text-sm font-medium hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                >
                  Edit
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteVideo}
        title={videoToDelete?.metadata?.title || "this video"}
      />
    </CreatorLoginLayout>
  );
};

export default withAuth(CreatorVideos);
