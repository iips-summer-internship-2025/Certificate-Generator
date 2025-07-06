import React, { useRef, useState } from "react";
import Loader from "../Loader/Loader";

export default function Preview({ imageUrl, droppedVariables, onClose, onSubmit }) {
  const [loading, setLoading] = useState(false);
  const previewImgRef = useRef(null);
  
  const handleSubmit = async () => {
    setLoading(true);
    try {
      await onSubmit();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-70">
      {loading && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
          <Loader />
        </div>
      )}
      <div className="relative bg-slate-900 rounded-lg shadow-lg flex flex-col items-center p-4 w-full max-w-6xl">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white rounded-full px-3 py-1 text-lg font-bold z-10"
        >
          ×
        </button>
        
        <div
          className="relative flex items-center justify-center mb-4"
          style={{
            minWidth: "0",
            minHeight: "0",
            maxWidth: "90vw",
            maxHeight: "70vh",
            overflow: "auto",
          }}
        >
          <img
            ref={previewImgRef}
            src={imageUrl}
            alt="Preview"
            className="max-w-full max-h-[70vh]"
          />
          {droppedVariables.map((item) => (
            <div
              key={`preview-${item.name}`}
              style={{
                position: "absolute",
                left: `${item.x}px`,
                top: `${item.y}px`,
                color: item.color,
                fontSize: item.fontSize,
                fontFamily: item.fontFamily,
                fontWeight: item.fontWeight,
                fontStyle: item.fontWeight === 'italic' ? 'italic' : 'normal',
                pointerEvents: "none",
                textShadow: "0 0 4px #000",
              }}
            >
              {item.name}
            </div>
          ))}
        </div>
        
        <div className="flex gap-4">
          <button
            onClick={onClose}
            className="border-4 border-gray-600 shadow-md rounded-[4px] px-4 py-2 bg-gray-700 text-white hover:bg-gray-800 font-semibold"
          >
            Back to Editor
          </button>
          <button
            onClick={handleSubmit}
            className="border-4 border-green-600 shadow-md rounded-[4px] px-4 py-2 bg-green-700 text-white hover:bg-green-800 font-semibold"
          >
            Submit Certificates
          </button>
        </div>
      </div>
    </div>
  );
}