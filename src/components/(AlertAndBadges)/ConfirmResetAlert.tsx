interface ConfirmResetAlertProps {
  title: string;
  message: string | React.ReactNode;
  onConfirm: () => void; // Handler for Confirm action
  onCancel: () => void; // Handler for Cancel action
  isOpen: boolean;
}

export function ConfirmResetAlert({
  title,
  message,
  onConfirm,
  onCancel,
  isOpen,
}: ConfirmResetAlertProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
        <h2 className="text-xl font-bold text-gray-900 mb-4">{title}</h2>
        <p className="text-gray-700 mb-6">{message}</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 text-gray-900 rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-500"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}
