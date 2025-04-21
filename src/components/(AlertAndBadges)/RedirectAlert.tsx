"use client";

import { useState } from "react";

interface RedirectAlertProps {
  title: string;
  message: string | React.ReactNode;
  postClickMessage: string;
  isOpen: boolean;
  onConfirm: () => void;
  buttonText?: string;
  postClickButtonText?: string;
  delay?: number; // Delay in milliseconds
}

export function RedirectAlert({
  title,
  message,
  postClickMessage,
  isOpen,
  onConfirm,
  buttonText = "OK",
  postClickButtonText = "Redirecting...",
  delay = 8000,
}: RedirectAlertProps) {
  const [postClicked, setPostClicked] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
        <h2 className="text-xl font-bold text-gray-900 mb-4">{title}</h2>
        <p className="text-gray-700 mb-6">
          {postClicked ? postClickMessage : message}
        </p>
        <div className="flex justify-end">
          <button
            onClick={() => {
              if (!postClicked) {
                setPostClicked(true);
                setTimeout(() => {
                  onConfirm();
                }, delay);
              }
            }}
            className={`px-4 py-2 ${
              postClicked
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-emerald-600 hover:bg-emerald-500"
            } text-white rounded-md`}
            disabled={postClicked} // Disable the button when postClicked is true
          >
            {postClicked ? postClickButtonText : buttonText}
          </button>
        </div>
      </div>
    </div>
  );
}
