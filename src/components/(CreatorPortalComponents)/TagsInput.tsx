import React, { useState } from "react";

interface TagsInputProps {
  tags: string[];
  onAddTag: (tag: string) => void;
  onRemoveTag: (tag: string) => void;
}

const TagsInput: React.FC<TagsInputProps> = ({
  tags,
  onAddTag,
  onRemoveTag,
}) => {
  const [newTag, setNewTag] = useState("");

  const handleAddTag = () => {
    const trimmedTag = newTag.trim();

    // Validate tag length
    if (trimmedTag.length > 40) {
      alert("Tags cannot exceed 40 characters.");
      return;
    }

    if (trimmedTag && !tags.includes(trimmedTag)) {
      onAddTag(trimmedTag);
      setNewTag(""); // Clear the input field after adding
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === "Tab") {
      e.preventDefault(); // Prevent default behavior (e.g., losing focus for Tab)
      handleAddTag();
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-900">Tags</label>
      <div className="flex items-center mt-2 gap-2">
        <input
          type="text"
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add a tag"
          autoComplete="off"
          autoCorrect="off"
          spellCheck="false"
          maxLength={40}
          className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-emerald-600 sm:text-sm"
        />
        {newTag.length > 40 && (
          <p className="text-red-500 text-xs mt-1">
            Tag must be 40 characters or less.
          </p>
        )}
        <button
          type="button"
          onClick={handleAddTag}
          className="bg-emerald-500 text-white px-3 py-2 rounded-md hover:bg-emerald-600"
        >
          Add
        </button>
      </div>
      <div className="flex flex-wrap gap-2 mt-4">
        {tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-x-0.5 rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20"
          >
            {tag}
            <button
              type="button"
              onClick={() => onRemoveTag(tag)}
              className="group relative -mr-1 size-3.5 rounded-sm hover:bg-green-600/20"
            >
              <span className="sr-only">Remove</span>
              <svg
                viewBox="0 0 14 14"
                className="size-3.5 stroke-green-700/50 group-hover:stroke-green-700/75"
              >
                <path d="M4 4l6 6m0-6l-6 6" />
              </svg>
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};

export default TagsInput;
