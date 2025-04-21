import React, { useEffect, useState } from "react";

const TrailerFields = ({ selectedVideo, onSelectVideo }) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      try {
        const token =
          localStorage.getItem("inplayer_access_token") ||
          sessionStorage.getItem("inplayer_access_token");

        if (!token) {
          throw new Error("User is not logged in.");
        }

        // Fetch account details to get user ID
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

        // Fetch non-trailer videos for the logged-in user
        const response = await fetch("/api/jwplayer/get-non-trailer-videos", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ inplayer_user_id: inplayerUserId }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch videos.");
        }

        const data = await response.json();
        setVideos(data.videos || []);
      } catch (error) {
        console.error("Error fetching videos:", error);
        setVideos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-900">
        Connect to Video
      </label>
      {loading ? (
        <p>Loading videos...</p>
      ) : (
        <select
          value={selectedVideo}
          onChange={(e) => onSelectVideo(e.target.value)}
          className="block w-full rounded-md bg-white px-3 py-1.5 text-base outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-emerald-600 sm:text-sm"
        >
          <option value="" disabled>
            Select a video to connect
          </option>
          {videos.map((video) => (
            <option key={video.id} value={video.id}>
              {video.metadata.title || "Untitled Video"}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default TrailerFields;
