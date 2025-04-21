import React from "react";
import mainGenresForMusicVideos from "../../../data/music_video_genres.json";
import parentalRatingOptions from "../../../data/parental_rating.json";
import aiUsageOptions from "../../../data/ai_usage_types.json";

interface MusicVideoFieldsProps {
  customParams: {
    music_video_genre: string;
    parental_rating: string;
    ai_usage: string;
    cast: string;
    director: string;
    studio: string;
    producer: string;
  };
  handleCustomParamsChange: (key: string, value: string) => void;
}

const MusicVideoFields: React.FC<MusicVideoFieldsProps> = ({
  customParams,
  handleCustomParamsChange,
}) => {
  return (
    <div className="space-y-4">
      {/* Music Video Genre */}
      <div>
        <label className="block text-sm font-medium text-gray-900">
          Music Video Genre
        </label>
        <select
          value={customParams.music_video_genre}
          onChange={(e) =>
            handleCustomParamsChange("music_video_genre", e.target.value)
          }
          className={`block w-full rounded-md bg-white px-3 py-1.5 text-base outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-emerald-600 sm:text-sm ${
            customParams.music_video_genre === ""
              ? "text-gray-400"
              : "text-gray-900"
          }`}
        >
          <option value="" className="text-gray-400">
            Select a music video genre
          </option>
          {mainGenresForMusicVideos.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Parental Rating */}
      <div>
        <label className="block text-sm font-medium text-gray-900">
          Parental Rating
        </label>
        <select
          value={customParams.parental_rating}
          onChange={(e) =>
            handleCustomParamsChange("parental_rating", e.target.value)
          }
          className={`block w-full rounded-md bg-white px-3 py-1.5 text-base outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-emerald-600 sm:text-sm ${
            customParams.parental_rating === ""
              ? "text-gray-400"
              : "text-gray-900"
          }`}
        >
          <option value="" className="text-gray-400">
            Select Parental Rating
          </option>
          {parentalRatingOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* AI Usage */}
      <div>
        <label className="block text-sm font-medium text-gray-900">
          AI Usage
        </label>
        <select
          value={customParams.ai_usage}
          onChange={(e) => handleCustomParamsChange("ai_usage", e.target.value)}
          className={`block w-full rounded-md bg-white px-3 py-1.5 text-base outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-emerald-600 sm:text-sm ${
            customParams.ai_usage === "" ? "text-gray-400" : "text-gray-900"
          }`}
        >
          <option value="" className="text-gray-400">
            Select AI Usage
          </option>
          {aiUsageOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Cast */}
      <div>
        <label className="block text-sm font-medium text-gray-900">Cast</label>
        <input
          type="text"
          value={customParams.cast}
          onChange={(e) => handleCustomParamsChange("cast", e.target.value)}
          placeholder="Enter cast members"
          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-emerald-600 sm:text-sm"
        />
      </div>

      {/* Director */}
      <div>
        <label className="block text-sm font-medium text-gray-900">
          Director
        </label>
        <input
          type="text"
          value={customParams.director}
          onChange={(e) => handleCustomParamsChange("director", e.target.value)}
          placeholder="Enter director name"
          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-emerald-600 sm:text-sm"
        />
      </div>

      {/* Studio */}
      <div>
        <label className="block text-sm font-medium text-gray-900">
          Studio
        </label>
        <input
          type="text"
          value={customParams.studio}
          onChange={(e) => handleCustomParamsChange("studio", e.target.value)}
          placeholder="Enter studio name"
          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-emerald-600 sm:text-sm"
        />
      </div>

      {/* Producer */}
      <div>
        <label className="block text-sm font-medium text-gray-900">
          Producer
        </label>
        <input
          type="text"
          value={customParams.producer}
          onChange={(e) => handleCustomParamsChange("producer", e.target.value)}
          placeholder="Enter producer name"
          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-emerald-600 sm:text-sm"
        />
      </div>
    </div>
  );
};

export default MusicVideoFields;
