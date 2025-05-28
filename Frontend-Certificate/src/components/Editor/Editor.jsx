import React, { useEffect, useRef, useState } from "react";
import "./Editor.css";
import "../../index.css";
import { useLocation } from "react-router-dom";
import Papa from "papaparse";

export default function Editor() {
  // Handling files from upload page here
  const { state } = useLocation();
  const imageFile = state?.imageFile;
  const csvFile = state?.csvFile;

  if (!imageFile || !csvFile) {
    return <p>Missing files</p>;
  }

  const imageUrl = URL.createObjectURL(imageFile);




  // reading csv
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    if (csvFile) {
      Papa.parse(csvFile, {
        header: true,
        complete: (results) => {
          if (results.meta.fields) {
            setColumns(results.meta.fields); // Array of column names
          }
        },
      });
    }
  }, [csvFile]);




  // Handling variable drop and coordinate values
  const imageRef = useRef(null);
  const [droppedVariables, setDroppedVariables] = useState([]);

  const handleDrop = (e) => {
    e.preventDefault();

    const variable = e.dataTransfer.getData("text/plain");

    const rect = imageRef.current.getBoundingClientRect();

    // Get coordinates relative to the image
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    console.log(`Dropped variable ${variable} at:`, x, y);

    // Save the position and variable name
    setDroppedVariables((prev) => [...prev, { name: variable, x, y }]);
    console.log("here is the droppedVariable:" + droppedVariables);
  };



  
  return (
    <div className=" h-[100dvh] w-screen bg-black overflow-hidden ">




      {/* here are the variables to be drag and dropped */}
      <div className=" h-2/5 w-full flex justify-around items-center gap-2 text-amber-100">
        {columns.map((title) => {
          return (
            <div className=" p-2 relative bg-slate-700 h-fit rounded-md border-2 border-slate-400 border-dashed"
              draggable
              onDragStart={(e) => e.dataTransfer.setData("text/plain", title)}
            >
             {title}
            </div>
          )
        })}
      </div>



        {/* image here */}
      <div className=" h-3/5 flex justify-center p-4">
        <img
          src={imageUrl}
          className=" bg-slate-700 h-full  border-4 border-amber-400 border-dashed "
          ref={imageRef}
          onDragOver={(e) => e.preventDefault()} // Allow drop
          onDrop={handleDrop}
        />
      </div>
    </div>
  );
}
