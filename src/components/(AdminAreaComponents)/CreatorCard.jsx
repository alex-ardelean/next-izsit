"use client";

import { useState } from "react";

export default function CreatorCard({ creator }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // Track which items have been copied (hub title or a specific social platform)
  const [copied, setCopied] = useState({});

  // Check if the creator has any video with contentType 'hub'
  const hasHub = creator.videos?.some(
    (video) => video.metadata?.custom_params?.contentType === "hub"
  );

  // Find the first hub video (which contains custom_params and title)
  const hubVideo = creator.videos?.find(
    (video) =>
      video.metadata?.custom_params?.contentType === "hub" &&
      video.metadata?.custom_params
  );

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  // Generic copy handler: key is used for tracking the copied state
  const handleCopy = (key, text) => {
    navigator.clipboard.writeText(text);
    setCopied((prev) => ({ ...prev, [key]: true }));
    setTimeout(() => {
      setCopied((prev) => ({ ...prev, [key]: false }));
    }, 1000);
  };

  // Build social links object from the hub video's custom_params (if available)
  const socialLinks =
    hubVideo && hubVideo.metadata?.custom_params
      ? {
          facebook: hubVideo.metadata.custom_params.facebook_url || "",
          instagram: hubVideo.metadata.custom_params.instagram_url || "",
          youtube: hubVideo.metadata.custom_params.youtube_url || "",
          twitter: hubVideo.metadata.custom_params.twitter_url || "",
          twitch: hubVideo.metadata.custom_params.twitch_url || "",
          linkedin: hubVideo.metadata.custom_params.linkedin_url || "",
        }
      : {};

  return (
    <li className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">
      <div className="p-6">
        {/* Main creator name */}
        <h3 className="text-base font-medium text-gray-900">
          {creator.full_name}
        </h3>

        {/* Copyable hub title as "Creator name" */}
        {hubVideo && hubVideo.metadata?.title && (
          <div className="mt-2 relative">
            {copied.hubTitle && (
              <div className="absolute -top-6 left-0 bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                Copied!
              </div>
            )}
            <p
              onClick={() => handleCopy("hubTitle", hubVideo.metadata.title)}
              className="text-sm font-bold cursor-pointer"
            >
              Creator name:{" "}
              <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">
                {hubVideo.metadata.title}
              </span>
            </p>
          </div>
        )}

        <p className="text-sm text-gray-500 mt-2">
          inplayer_user_id: {creator.id || 0}
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Registered on: {new Date(creator.created_at).toLocaleDateString()}
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Videos:{" "}
          <span className="font-bold">{creator.videos?.length || 0}</span>
        </p>
        <p className="mt-2">
          {hasHub ? (
            <span className="inline-flex items-center gap-x-1.5 rounded-full px-2 py-1 text-xs font-medium text-green-900 ring-1 ring-inset ring-green-200">
              <svg
                viewBox="0 0 6 6"
                aria-hidden="true"
                className="h-1.5 w-1.5 fill-green-500"
              >
                <circle r={3} cx={3} cy={3} />
              </svg>
              Has Hub
            </span>
          ) : (
            <span className="inline-flex items-center gap-x-1.5 rounded-full px-2 py-1 text-xs font-medium text-red-900 ring-1 ring-inset ring-red-200">
              <svg
                viewBox="0 0 6 6"
                aria-hidden="true"
                className="h-1.5 w-1.5 fill-red-500"
              >
                <circle r={3} cx={3} cy={3} />
              </svg>
              No Hub
            </span>
          )}
        </p>

        {/* Social media badges as clickable elements */}
        {hubVideo &&
          hubVideo.metadata?.custom_params &&
          Object.entries(socialLinks).map(([platform, url]) => {
            if (!url) return null;
            return (
              <div key={platform} className="mt-2 relative inline-block mr-2">
                {copied[platform] && (
                  <div className="absolute -top-6 left-0 bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                    Copied!
                  </div>
                )}
                <span
                  onClick={() => handleCopy(platform, url)}
                  className="inline-flex items-center rounded-md bg-green-50 px-1.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20 cursor-pointer"
                >
                  {platform.charAt(0).toUpperCase() + platform.slice(1)}
                </span>
              </div>
            );
          })}

        {/* Toggle button on its own line */}
        <div className="mt-2">
          <button
            onClick={toggleDropdown}
            className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-500 w-full"
          >
            {isDropdownOpen ? "Hide Videos" : "See Connected Videos"}
          </button>
        </div>

        {isDropdownOpen && (
          <ul className="mt-2 border border-gray-200 rounded p-2">
            {creator.videos && creator.videos.length > 0 ? (
              creator.videos.map((video, index) => {
                const title = video.metadata?.title || "No Title";
                const status = video.metadata?.custom_params?.status;
                const contentType = video.metadata?.custom_params?.contentType;
                const statusClass =
                  status === "approved"
                    ? "text-green-500"
                    : status === "under_review"
                    ? "text-yellow-500"
                    : status === "disapproved"
                    ? "text-red-500"
                    : "text-gray-500";

                return (
                  <li
                    key={video.id || index}
                    className="py-1 border-b last:border-b-0"
                  >
                    <p className="text-sm font-medium text-gray-800">{title}</p>
                    <p className={`text-xs ${statusClass}`}>
                      Status: {status || "Unknown"}
                    </p>
                    {contentType === "series" && (
                      <p className="text-xs text-gray-600">Type: Series</p>
                    )}
                    {contentType === "hub" && (
                      <p className="text-xs text-gray-600">Type: Hub</p>
                    )}
                  </li>
                );
              })
            ) : (
              <li className="py-1">
                <p className="text-sm text-gray-500">No videos found.</p>
              </li>
            )}
          </ul>
        )}
      </div>
      <div className="py-4 text-center">
        <p className="text-sm font-bold text-gray-800">{creator.email}</p>
      </div>
    </li>
  );
}
