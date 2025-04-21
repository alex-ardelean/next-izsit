import React from "react";

interface ContentTypeDropdownProps {
  contentType: string;
  onContentTypeChange: (value: string) => void;
  seriesList?: { id: string; title: string }[]; // Make seriesList optional
  selectedSeries: string;
  onSeriesSelect: (seriesId: string) => void;
  onCreateSeries: () => void;
}

const ContentTypeDropdown: React.FC<ContentTypeDropdownProps> = ({
  contentType,
  onContentTypeChange,
  seriesList = [], // Default to an empty array
  selectedSeries,
  onSeriesSelect,
  onCreateSeries,
}) => {
  const isPlaceholderSelected = !contentType; // Check if the placeholder is selected

  return (
    <div>
      <label className="block text-sm font-medium text-gray-900">
        Content Type
      </label>
      <select
        value={contentType}
        onChange={(e) => onContentTypeChange(e.target.value)}
        className={`block w-full rounded-md bg-white px-3 py-1.5 text-base outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-emerald-600 sm:text-sm ${
          isPlaceholderSelected ? "text-gray-400" : "text-gray-900"
        }`}
      >
        <option value="" className="text-gray-400">
          Select Content Type
        </option>
        <option value="movie">Movie</option>
        <option value="episode">Episode</option>
        <option value="music_video">Music Video</option>
        <option value="trailer">Trailer</option>
      </select>

      {contentType === "episode" && (
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-900">
            Select Series
          </label>
          <select
            value={selectedSeries}
            onChange={(e) => onSeriesSelect(e.target.value)}
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-emerald-600 sm:text-sm"
          >
            <option value="">Select an existing series</option>
            {seriesList.map((series) => (
              <option key={series.id} value={series.id}>
                {series.title}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={onCreateSeries}
            className="mt-2 text-emerald-600 text-xs hover:underline"
          >
            Create New Series
          </button>
        </div>
      )}
    </div>
  );
};

export default ContentTypeDropdown;
