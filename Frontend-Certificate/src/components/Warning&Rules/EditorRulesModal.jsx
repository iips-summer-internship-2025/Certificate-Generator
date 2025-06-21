import React from "react";

export default function EditorRulesModal({ show, onClose }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-3xl relative overflow-y-auto max-h-[80vh] p-5">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">Welcome to the Certificate Editor</h2>
        <p className="text-gray-600 text-sm text-center mb-4">Please read these instructions carefully before proceeding:</p>
        
        <ul className="list-disc list-inside space-y-2 text-gray-800 text-sm">
          <li className="list-disc">
            <strong>Drag & Drop Fields:</strong> Drag any column header from the CSV panel and drop it onto the certificate template to place it where needed.
          </li>
          <li className="list-disc">
            <strong>Enable Editing Options:</strong> Once a field is dropped, editing options will appear below the CSV panel.
          </li>
          <li className="list-disc">
            <strong>Customize Elements:</strong> Modify font size, color, style, and weight for each element as per your design.
          </li>
          <li className="list-disc">
            <strong>Skip or Delete Fields:</strong> Skip dragging unnecessary fields. Already added fields can be removed using the 🗑️ icon.
          </li>
          <li className="list-disc">
            <strong>Reset Individual Element:</strong> Click the ❌ icon on a field to reset it to its default.
          </li>
          <li className="list-disc">
            <strong>Reset All Changes:</strong> Use "Reset Changes" to bring all original fields back. ⚠️ This will discard your current edits.
          </li>
          <li className="list-disc">
            <strong>Preview Certificates:</strong> Use the preview option to check the layout before sending.
          </li>
          <li className="list-disc">
            <strong>Submit Certificates:</strong> Click "Submit" and wait for the loader to complete.
          </li>
          <li className="list-disc">
            <strong>Successful Delivery:</strong> Once loading is done, certificates will be sent to each recipient's email from the CSV.
          </li>
        </ul>

        <div className="text-center mt-6">
          <button
            onClick={onClose}
            className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition-all duration-300 shadow-md p-2 mt-3"
          >
            Got it, Let's Start!
          </button>
        </div>

        {/* Close (X) button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-600 text-xl"
          title="Close"
        >
          &times;
        </button>
      </div>
    </div>
  );
}
