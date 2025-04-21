"use client";

import { useState, useEffect } from "react";
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

const MAX_MOTION_THUMBNAIL_SIZE = 100 * 1024 * 1024; // 100MB

interface EditSeriesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (
    seriesId: string,
    updatedData: {
      title: string;
      description: string;
      mainGenre: string;
      parentalRating: string;
    }
  ) => Promise<{ id: string }>;
  series: {
    id: string;
    title: string;
    description: string;
    mainGenre: string;
    parentalRating: string;
    staticThumbnail?: string;
    motionThumbnail?: string;
  } | null;
  onThumbnailUpdate: (seriesId: string, newThumbnailUrl: string) => void;
  onMotionThumbnailUpdate: (
    seriesId: string,
    newMotionThumbnailUrl: string
  ) => void;
}

const EditSeriesModal: React.FC<EditSeriesModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  series,
  onThumbnailUpdate,
  onMotionThumbnailUpdate,
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

  // Helper to fetch a File object from a URL
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

  useEffect(() => {
    async function setInitialState() {
      if (series) {
        setSeriesTitle(series.title || "");
        setSeriesDescription(series.description || "");
        setSeriesMainGenre(series.mainGenre || "");
        setSeriesParentalRating(series.parentalRating || "");

        // Fetch thumbnails as File objects with proper names
        let staticThumbnailFile = series.staticThumbnail
          ? await fetchFileFromUrl(series.staticThumbnail)
          : null;

        let motionThumbnailFile = series.motionThumbnail
          ? await fetchFileFromUrl(series.motionThumbnail)
          : null;

        if (staticThumbnailFile) {
          const updatedStaticThumbnailName = series.staticThumbnail
            .split("/")
            .pop()!;
          staticThumbnailFile = new File(
            [staticThumbnailFile],
            updatedStaticThumbnailName,
            { type: staticThumbnailFile.type }
          );
        }

        if (motionThumbnailFile) {
          const updatedMotionThumbnailName = series.motionThumbnail
            .split("/")
            .pop()!;
          motionThumbnailFile = new File(
            [motionThumbnailFile],
            updatedMotionThumbnailName,
            { type: motionThumbnailFile.type }
          );
        }

        setSeriesStaticThumbnail(staticThumbnailFile);
        setSeriesMotionThumbnail(motionThumbnailFile);
      }
    }

    if (series) {
      setInitialState();
    }
  }, [series]);

  const handleSubmit = async () => {
    if (!series) return;

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
      const updatedData = {
        title: seriesTitle,
        description: seriesDescription,
        mainGenre: seriesMainGenre,
        parentalRating: seriesParentalRating,
      };

      const updatedSeries = await onSubmit(series.id, updatedData);

      const thumbnailPromises = [];
      let updatedStaticThumbnailUrl = series.staticThumbnail;
      let updatedMotionThumbnailUrl = series.motionThumbnail;

      if (
        seriesStaticThumbnail &&
        (!series.staticThumbnail ||
          seriesStaticThumbnail.name !==
            series.staticThumbnail.split("/").pop())
      ) {
        const { thumbnailId } = await uploadThumbnail(
          seriesStaticThumbnail,
          updatedSeries.id,
          seriesTitle,
          seriesDescription
        );

        updatedStaticThumbnailUrl = `https://cdn.jwplayer.com/v2/media/${updatedSeries.id}/thumbnails/${thumbnailId}.jpg`;
      }

      if (updatedStaticThumbnailUrl !== series.staticThumbnail) {
        onThumbnailUpdate(series.id, updatedStaticThumbnailUrl); // Notify parent
      }

      // Handle motion thumbnail
      if (
        seriesMotionThumbnail &&
        (!series.motionThumbnail ||
          seriesMotionThumbnail.name !==
            series.motionThumbnail.split("/").pop())
      ) {
        const { thumbnailId } = await uploadThumbnail(
          seriesMotionThumbnail,
          updatedSeries.id,
          seriesTitle,
          seriesDescription
        );

        updatedMotionThumbnailUrl = `https://cdn.jwplayer.com/v2/media/${updatedSeries.id}/thumbnails/${thumbnailId}.mp4`;
        onMotionThumbnailUpdate(series.id, updatedMotionThumbnailUrl); // Notify parent
      }

      await Promise.all(thumbnailPromises);

      // Notify the parent about the new static thumbnail URL
      if (updatedStaticThumbnailUrl !== series.staticThumbnail) {
        onThumbnailUpdate(series.id, updatedStaticThumbnailUrl);
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
      console.error("Error updating series:", error);
      alert("Failed to update series. Please try again.");
    } finally {
      setIsSeriesLoading(false);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={isSeriesLoading ? () => {} : onClose}
      className="relative z-50"
    >
      <DialogBackdrop className="fixed inset-0 bg-gray-500/75 z-60" />
      <div className="fixed inset-0 z-10 flex items-center justify-center p-4">
        <DialogPanel className="relative w-full max-w-md transform overflow-hidden rounded-lg bg-white shadow-xl transition-all">
          <div className="p-6">
            <DialogTitle as="h3" className="text-lg font-medium text-gray-900">
              Edit Series
            </DialogTitle>

            {/* Title Input */}
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-900">
                Title
              </label>
              <input
                type="text"
                value={seriesTitle}
                onChange={(e) => setSeriesTitle(e.target.value)}
                className="mt-2 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900"
                disabled={isSeriesLoading}
              />
            </div>

            {/* Description Input */}
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-900">
                Description
              </label>
              <textarea
                value={seriesDescription}
                onChange={(e) => setSeriesDescription(e.target.value)}
                rows={4}
                className="mt-2 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900"
                disabled={isSeriesLoading}
              />
            </div>

            {/* Main Genre Dropdown */}
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-900">
                Main Genre
              </label>
              <select
                value={seriesMainGenre}
                onChange={(e) => setSeriesMainGenre(e.target.value)}
                className="mt-2 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900"
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
              </label>
              <select
                value={seriesParentalRating}
                onChange={(e) => setSeriesParentalRating(e.target.value)}
                className="mt-2 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900"
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
                Edit thumbnails
              </span>
            </div>

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
                className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900"
                disabled={isSeriesLoading}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold text-white"
                disabled={isSeriesLoading}
              >
                {isSeriesLoading && (
                  <div className="fixed inset-0 z-[9999] bg-black bg-opacity-50 flex flex-col items-center justify-center">
                    <div className="text-white text-lg font-bold">
                      Updating Series...
                    </div>
                    <p className="mt-2 text-xs text-gray-200 text-center">
                      This might take a moment. Please wait...
                    </p>
                  </div>
                )}
                Save Changes
              </button>
            </div>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default EditSeriesModal;
