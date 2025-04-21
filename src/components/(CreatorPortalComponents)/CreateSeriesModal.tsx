"use client";

import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import parentalRatingOptions from "../../../data/parental_rating.json";
import mainGenreOptions from "../../../data/main_genres.json";
import { uploadThumbnail } from "../../../utils/uploadThumbnail";
import ThumbnailSelector from "../../components/(CreatorPortalComponents)/ThumbnailSelector";
import { CustomRefreshAlert } from "../../components/(AlertAndBadges)/CustomRefreshAlert";

const MAX_MOTION_THUMBNAIL_SIZE = 100 * 1024 * 1024; // 100MB

interface CreateSeriesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (seriesData: {
    title: string;
    description: string;
    mainGenre: string;
    parentalRating: string;
  }) => Promise<{ id: string }>;
  onThumbnailsUploaded?: (
    seriesId: string,
    thumbnails: {
      staticThumbnail: string | null;
      motionThumbnail: string | null;
    }
  ) => void;
}

const CreateSeriesModal: React.FC<CreateSeriesModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  onThumbnailsUploaded,
}) => {
  const [seriesTitle, setSeriesTitle] = useState("");
  const [seriesDescription, setSeriesDescription] = useState("");
  const [seriesMainGenre, setSeriesMainGenre] = useState("");
  const [seriesParentalRating, setSeriesParentalRating] = useState("");
  const [isSeriesLoading, setIsSeriesLoading] = useState(false);
  const [seriesStaticThumbnail, setSeriesStaticThumbnail] =
    useState<File | null>(null);
  const [seriesMotionThumbnail, setSeriesMotionThumbnail] =
    useState<File | null>(null);
  const [showSeriesThumbnails, setShowSeriesThumbnails] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const handleSubmit = async () => {
    if (
      !seriesTitle.trim() ||
      !seriesDescription.trim() ||
      !seriesMainGenre ||
      !seriesParentalRating
    ) {
      alert(
        "All fields except thumbnails are required. Please complete the form."
      );
      return;
    }

    setIsSeriesLoading(true);

    try {
      const newSeries = await onSubmit({
        title: seriesTitle,
        description: seriesDescription,
        mainGenre: seriesMainGenre,
        parentalRating: seriesParentalRating,
      });

      const mediaId = newSeries.id;
      const title = seriesTitle;
      const description = seriesDescription;

      let staticThumbnailUrl = null;
      let motionThumbnailUrl = null;

      const thumbnailPromises = [];

      if (seriesStaticThumbnail) {
        console.log("Uploading static thumbnail...");
        thumbnailPromises.push(
          uploadThumbnail(
            seriesStaticThumbnail,
            mediaId,
            title,
            description
          ).then((res) => {
            staticThumbnailUrl = `https://cdn.jwplayer.com/thumbnails/${res.thumbnailId}.jpg`;
          })
        );
      }

      if (seriesMotionThumbnail) {
        console.log("Uploading motion thumbnail...");
        thumbnailPromises.push(
          uploadThumbnail(
            seriesMotionThumbnail,
            mediaId,
            title,
            description
          ).then((res) => {
            motionThumbnailUrl = `https://cdn.jwplayer.com/thumbnails/${res.thumbnailId}.mp4`;
          })
        );
      }

      await Promise.all(thumbnailPromises);

      console.log("All thumbnails processed successfully.");

      // Update parent component if thumbnails are ready
      if (staticThumbnailUrl || motionThumbnailUrl) {
        onThumbnailsUploaded?.(mediaId, {
          staticThumbnail: staticThumbnailUrl,
          motionThumbnail: motionThumbnailUrl,
        });

        // Show alert only if thumbnails were uploaded
        setIsAlertOpen(true);
      }

      // Reset state and close modal
      setSeriesTitle("");
      setSeriesDescription("");
      setSeriesMainGenre("");
      setSeriesParentalRating("");
      setSeriesStaticThumbnail(null);
      setSeriesMotionThumbnail(null);
      setShowSeriesThumbnails(false);

      onClose();
    } catch (error) {
      console.error("Error during series creation process:", error);
      alert("There was an issue creating the series. Please try again.");
    } finally {
      setIsSeriesLoading(false);
    }
  };

  return (
    <>
      <Dialog
        open={isOpen}
        onClose={isSeriesLoading ? () => {} : onClose} // No-op function if loading
        className="relative z-50"
      >
        <DialogBackdrop className="fixed inset-0 bg-gray-500/75 z-60" />

        <div className="fixed inset-0 z-10 flex items-center justify-center p-4">
          <DialogPanel className="relative w-full max-w-md transform overflow-hidden rounded-lg bg-white shadow-xl transition-all">
            <div className="p-6">
              <DialogTitle
                as="h3"
                className="text-lg font-medium text-gray-900"
              >
                Create New Series
              </DialogTitle>

              {/* Title Input */}
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-900">
                  Title
                  <span className="ml-1 text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={seriesTitle}
                  onChange={(e) => setSeriesTitle(e.target.value)}
                  className="mt-2 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  disabled={isSeriesLoading}
                />
              </div>

              {/* Description Input */}
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-900">
                  Description
                  <span className="ml-1 text-red-500">*</span>
                </label>
                <textarea
                  value={seriesDescription}
                  required
                  onChange={(e) => setSeriesDescription(e.target.value)}
                  rows={4}
                  className="mt-2 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  disabled={isSeriesLoading}
                />
              </div>

              {/* Main Genre Dropdown */}
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-900">
                  Main Genre
                  <span className="ml-1 text-red-500">*</span>
                </label>
                <select
                  value={seriesMainGenre}
                  onChange={(e) => setSeriesMainGenre(e.target.value)}
                  className="mt-2 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  disabled={isSeriesLoading}
                >
                  <option value="" disabled>
                    Select a genre
                  </option>
                  {mainGenreOptions.map((genre) => (
                    <option key={genre.value} value={genre.value}>
                      {genre.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Parental Rating Dropdown */}
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-900">
                  Parental Rating
                  <span className="ml-1 text-red-500">*</span>
                </label>
                <select
                  value={seriesParentalRating}
                  onChange={(e) => setSeriesParentalRating(e.target.value)}
                  className="mt-2 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  disabled={isSeriesLoading}
                >
                  <option value="" disabled>
                    Select a parental rating
                  </option>
                  {parentalRatingOptions.map((rating) => (
                    <option key={rating.value} value={rating.value}>
                      {rating.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Thumbnail Selector */}
              <div className="mt-4 flex items-center">
                <span
                  className="text-xs text-emerald-600 underline cursor-pointer"
                  onClick={() => setShowSeriesThumbnails((prev) => !prev)}
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
                    Thumbnails are automatically created. But you can customize
                    them here.
                  </div>
                </div>
              </div>

              {/* Conditional ThumbnailSelector Component */}
              {showSeriesThumbnails && (
                <ThumbnailSelector
                  staticThumbnail={seriesStaticThumbnail}
                  motionThumbnail={seriesMotionThumbnail}
                  setStaticThumbnail={setSeriesStaticThumbnail}
                  setMotionThumbnail={setSeriesMotionThumbnail}
                  isThumbnailLoading={isSeriesLoading}
                  maxMotionThumbnailSize={MAX_MOTION_THUMBNAIL_SIZE}
                />
              )}

              {/* Action Buttons */}
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={!isSeriesLoading ? onClose : undefined}
                  className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-gray-300 hover:bg-gray-50"
                  disabled={isSeriesLoading}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="relative rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 focus:ring-2 focus:ring-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isSeriesLoading}
                >
                  {isSeriesLoading && (
                    <div className="fixed inset-0 z-50 bg-black bg-opacity-95 flex flex-col items-center justify-center">
                      <div className="text-white text-lg font-bold">
                        Creating Series...
                      </div>
                      <p className="mt-2 text-xs text-gray-200 text-center">
                        Please wait while we process your series creation. This
                        may take a moment. Hang on.
                      </p>
                      <svg
                        className="animate-spin h-8 w-8 text-white mt-4"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8V12H4z"
                        ></path>
                      </svg>
                    </div>
                  )}

                  {!isSeriesLoading ? (
                    "Create"
                  ) : (
                    <span className="invisible">Create</span>
                  )}
                </button>
              </div>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
      <CustomRefreshAlert
        title="Thumbnails Processing"
        message="Thumbnails may not be visible immediately. The page will refresh to display the updated thumbnails."
        onClose={() => setIsAlertOpen(false)}
        isOpen={isAlertOpen}
      />
    </>
  );
};

export default CreateSeriesModal;
