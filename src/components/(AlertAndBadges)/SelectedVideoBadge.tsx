"use client";

interface SelectedVideoBadgeProps {
  videoName: string;
  onRemove: () => void;
}

export default function SelectedVideoBadge({
  videoName,
  onRemove,
}: SelectedVideoBadgeProps) {
  return (
    <div className="mt-2">
      <span className="inline-flex items-center gap-x-2 rounded-md bg-emerald-200 px-3 py-1 text-sm font-medium text-gray-700 ring-1 ring-inset ring-gray-500/10">
        Selected video:{" "}
        <span className="ml-2 font-semibold text-gray-900">{videoName}</span>
        <button
          type="button"
          className="group relative -mr-1 flex items-center justify-center rounded-sm hover:bg-emerald-300/50 p-1"
          onClick={onRemove}
        >
          <span className="sr-only">Remove</span>
          <svg
            viewBox="0 0 14 14"
            className="h-4 w-4 stroke-gray-700/50 group-hover:stroke-gray-900"
          >
            <path d="M4 4l6 6m0-6l-6 6" strokeWidth="2" />
          </svg>
          <span className="absolute inset-0" />
        </button>
      </span>
    </div>
  );
}
