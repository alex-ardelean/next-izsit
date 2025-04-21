import React from "react";
import mainGenreOptions from "../../../data/main_genres.json";
import subGenreOptions from "../../../data/sub_genres.json";
import parentalRatingOptions from "../../../data/parental_rating.json";
import aiUsageOptions from "../../../data/ai_usage_types.json";

const MovieFields = ({ customParams, handleCustomParamsChange }) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-900">
          Main Genre
        </label>
        <select
          value={customParams.main_genre}
          onChange={(e) =>
            handleCustomParamsChange("main_genre", e.target.value)
          }
          className={`block w-full rounded-md bg-white px-3 py-1.5 text-base outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-emerald-600 sm:text-sm ${
            customParams.main_genre === "" ? "text-gray-400" : "text-gray-900"
          }`}
        >
          <option value="" className="text-gray-400">
            Select Main Genre
          </option>
          {mainGenreOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900">
          Sub-Genre
        </label>
        <select
          value={customParams.sub_genre}
          onChange={(e) =>
            handleCustomParamsChange("sub_genre", e.target.value)
          }
          className={`block w-full rounded-md bg-white px-3 py-1.5 text-base outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-emerald-600 sm:text-sm ${
            customParams.sub_genre === "" ? "text-gray-400" : "text-gray-900"
          }`}
        >
          <option value="" className="text-gray-400">
            Select Sub-Genre
          </option>
          {subGenreOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

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

export default MovieFields;
