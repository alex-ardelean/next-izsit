"use client";

interface CreateSeriesAlertProps {
  seriesName: string;
  onClose: () => void;
  isOpen: boolean;
}

export function CreateSeriesAlert({
  seriesName,
  onClose,
  isOpen,
}: CreateSeriesAlertProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Series Created</h2>
        <p className="text-gray-700 mb-6">
          Series &quot;<strong>{seriesName}</strong>&quot; was successfully
          created and selected.
        </p>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-500"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}
