import React from "react";

interface ThumbnailSelectorProps {
  staticThumbnail: File | null;
  motionThumbnail: File | null;
  setStaticThumbnail: React.Dispatch<React.SetStateAction<File | null>>;
  setMotionThumbnail: React.Dispatch<React.SetStateAction<File | null>>;
  isThumbnailLoading: boolean;
  maxMotionThumbnailSize: number;
}

const ThumbnailSelector: React.FC<ThumbnailSelectorProps> = ({
  staticThumbnail,
  motionThumbnail,
  setStaticThumbnail,
  setMotionThumbnail,
  isThumbnailLoading,
  maxMotionThumbnailSize,
}) => {
  return (
    <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
      {/* Static Thumbnail */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-900">
          Static Thumbnail
        </label>
        <p className="text-xs text-gray-500">
          Image size should be at least 1920px by 1080px.
        </p>
        <div
          className="relative mt-2 flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-4 hover:border-gray-400 cursor-pointer"
          onClick={() =>
            document.getElementById("staticThumbnailInput")?.click()
          }
        >
          {staticThumbnail ? (
            <div className="relative">
              <img
                src={URL.createObjectURL(staticThumbnail)}
                alt="Static Thumbnail"
                className="h-20 w-auto rounded"
              />
              <button
                type="button"
                className="absolute top-0 right-0 rounded-full bg-red-600 text-white p-1 text-xs"
                onClick={(e) => {
                  e.stopPropagation();
                  setStaticThumbnail(null);
                  const input = document.getElementById(
                    "staticThumbnailInput"
                  ) as HTMLInputElement;
                  if (input) input.value = "";
                }}
              >
                ×
              </button>
            </div>
          ) : (
            <span>No file selected</span>
          )}
        </div>
        <input
          id="staticThumbnailInput"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => setStaticThumbnail(e.target.files?.[0] || null)}
          disabled={isThumbnailLoading} // Updated to use isThumbnailLoading
        />
      </div>

      {/* Motion Thumbnail */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-900">
          Motion Thumbnail
        </label>
        <p className="text-xs text-gray-500">
          Created from the first 10 seconds of the video (no audio).
        </p>
        <div
          className="relative mt-2 flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-4 hover:border-gray-400 cursor-pointer"
          onClick={() =>
            document.getElementById("motionThumbnailInput")?.click()
          }
        >
          {motionThumbnail ? (
            <div className="relative">
              <span className="block text-xs">{motionThumbnail.name}</span>
              <button
                type="button"
                className="absolute top-0 right-0 rounded-full bg-red-600 text-white p-1 text-xs"
                onClick={(e) => {
                  e.stopPropagation();
                  setMotionThumbnail(null);
                }}
              >
                ×
              </button>
            </div>
          ) : (
            <span>No file selected</span>
          )}
        </div>
        <input
          id="motionThumbnailInput"
          type="file"
          accept="video/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              if (file.size > maxMotionThumbnailSize) {
                alert(
                  "The motion thumbnail file size exceeds the limit. Please upload a smaller file."
                );
                e.target.value = "";
                return;
              }
              setMotionThumbnail(file);
            }
          }}
          disabled={isThumbnailLoading} // Updated to use isThumbnailLoading
        />
      </div>
    </div>
  );
};

export default ThumbnailSelector;
