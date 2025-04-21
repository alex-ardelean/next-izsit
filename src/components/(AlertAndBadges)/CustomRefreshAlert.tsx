"use client";

import { useRouter } from "next/navigation";

interface CustomRefreshAlertProps {
  title: string;
  message: string | React.ReactNode;
  onClose: () => void;
  isOpen: boolean;
}

export function CustomRefreshAlert({
  title,
  message,
  onClose,
  isOpen,
}: CustomRefreshAlertProps) {
  const router = useRouter();

  const handleOk = () => {
    onClose();
    window.location.reload(); // Fallback for refresh issues
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
        <h2 className="text-xl font-bold text-gray-900 mb-4">{title}</h2>
        <p className="text-gray-700 mb-6">{message}</p>
        <div className="flex justify-end">
          <button
            onClick={handleOk}
            className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-500"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}
