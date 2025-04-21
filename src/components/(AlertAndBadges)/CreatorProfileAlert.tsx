"use client";

import { useState } from "react";

interface CreatorProfileAlertProps {
  title: string;
  message: string | React.ReactNode;
  onClose: () => void;
  isOpen: boolean;
  redirectAfterAlert?: boolean;
  onRedirect?: () => void;
}

export function CreatorProfileAlert({
  title,
  message,
  onClose,
  isOpen,
  redirectAfterAlert = false,
  onRedirect,
}: CreatorProfileAlertProps) {
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleClick = () => {
    setIsLoading(true);

    if (redirectAfterAlert) {
      setTimeout(() => {
        if (onRedirect) onRedirect(); // Handle redirection after delay
        onClose(); // Close alert after delay
      }, 5000);
    } else {
      onClose(); // Close alert immediately if no redirect
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
        <h2 className="text-xl font-bold text-gray-900 mb-4">{title}</h2>
        <p className="text-gray-700 mb-6">{message}</p>
        <div className="flex justify-end">
          <button
            onClick={handleClick}
            className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-500 flex items-center justify-center min-w-[100px]"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className="h-4 w-4 border-2 border-t-white border-gray-200 rounded-full animate-spin mr-2"></div>
                Loading...
              </>
            ) : (
              "OK"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
