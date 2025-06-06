import React, { useEffect, useRef, useState } from "react";
// import "../../index.css";
import { useLocation } from "react-router-dom";
import Papa from "papaparse";
import './Editor.css';
import ErrorPage from "../Error page/ErrorPage";

export default function Editor() {
  const { state } = useLocation();
  const imageFile = state?.imageFile;
  const csvFile = state?.csvFile;

  if (!imageFile || !csvFile) {
    return (<ErrorPage 
        message="The page you're looking for doesn't exist." 
        statusCode={404} 
        />)
    }

  const imageUrl = URL.createObjectURL(imageFile);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    if (csvFile) {
      Papa.parse(csvFile, {
        header: true,
        complete: (results) => {
          if (results.meta.fields) {
            setColumns(results.meta.fields);
          }
        },
      });
    }
  }, [csvFile]);

  const imageRef = useRef(null);
  const [droppedVariables, setDroppedVariables] = useState([]);
    const [previewOpen, setPreviewOpen] = useState(false);


    // Handle 
  const handleDrop = (e) => {
    e.preventDefault();
    const variable = e.dataTransfer.getData("text/plain");

    if (variable.startsWith("blob")) return;

    const rect = imageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const x_percent = (x / rect.width) * 100;
    const y_percent = (y / rect.width) * 100;
    // const trueX = (imageRef.current.naturalWidth || imageRef.current.width) * x_percent / 100;

    const imgWidth = imageRef.current.offsetWidth;

    setDroppedVariables((prev) => {
      const existing = prev.find((item) => item.name === variable);
      const newItem = {
        name: variable,
        x,
        y,
        color: existing ? existing.color : "#565552",
        fontSize: existing ? (existing.fontSize/imgWidth*100) : "16px",
        // fontSize: existing ? (existing.fontSize/imgWidth*100) : "16px",
      };
      return [...prev.filter((item) => item.name !== variable), newItem];
    });

    let d = document.getElementById(variable);
    if (d) {
        d.style.position = "absolute";
        d.style.left = `${e.clientX}px`;
        d.style.top = `${e.clientY}px`;
        d.style.zIndex = '99';
        }

        let d_status = document.getElementById(variable + "-status");
        if (d_status) {
        d_status.style.backgroundColor = 'green';
    }
  };
   console.log(droppedVariables)
  const handleRemove = (title) => {
    document.getElementById(title).style.display = 'none';
    setDroppedVariables((prev) =>
      prev.filter((item) => item.name !== title)
    );
  };

  // Preview code

  const [imgDims, setImgDims] = useState({ width: 1, height: 1 });
  const previewImgRef = useRef(null);


  return (
    <div className=" w-full py-12 relative flex flex-col justify-center items-center gap-5 overflow-x-clip bg-slate-900 text-white">

      {/* all the variables to be mapped */}
      <div className=" w-full flex justify-around items-center gap-2 text-amber-100">
        {columns.map((title, index) => {
          const item = droppedVariables.find((v) => v.name === title) || {
            color: "#565552",
            fontSize: "16px",
          };

          return (
            <div key={index} className=" h-fit w-fit bg-gray-200/50 rounded-3xl">
              
              
              {/* Draggable div */}
              <div
                id={title}
                draggable
                onDragStart={(e) =>
                  e.dataTransfer.setData("text/plain", title)
                }
                style={{
                  color: item.color,
                  fontSize: item.fontSize,
                }}
                className="relative z-40 border-2 border-slate-200"
              >
                <span
                  id={title + "-status"}
                  className="h-3 w-3 rounded-full -translate-2 bg-red-600 absolute cursor-move"
                ></span>
                <p className=" font-bold ">{title}</p>
                <span
                  onClick={() => handleRemove(title)}
                  className=" bg-slate-200 flex justify-center items-center h-3 w-3 rounded-full absolute -top-1 -right-1 cursor-pointer"
                >×</span>
              </div>

              <div className="color_design">
                <p>{title}</p>
                <div className="Inner_div_design">
                  <form>

                    {/* color selection */}
                    <label>
                      Color:
                      <input
                        type="color"
                        value={item.color}
                        onChange={(e) => {
                          setDroppedVariables((prev) =>
                            prev.map((p) =>
                              p.name === title
                                ? { ...p, color: e.target.value }
                                : p
                            )
                          );
                        }}
                      />
                    </label>

                    {/* Font Size */}
                    <label>
                      Font-Size
                      <input
                        type="number"
                        value={parseInt(item.fontSize)}
                        min="8"
                        max="72"
                        onChange={(e) => {
                            
                            const newSize = `${e.target.value }px`;
                          setDroppedVariables((prev) =>
                            prev.map((p) =>
                              p.name === title
                                ? { ...p, fontSize: newSize }
                                : p
                            )
                          );
                        }}
                      />
                    </label>
                  </form>
                </div>
              </div>
            </div>
          );
        })}
      </div>

        {/* image and buttons */}
      <div className="h-3/5 flex  w-full  relative justify-around">
        
        {/* image */}
        <div
          className="relative border-4 gap-8 border-slate-200 border-dashed box-border"
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          ref={imageRef}
          style={{ display: previewOpen ? "none" : "block" }}
        >
          <img src={imageUrl} alt="Certificate" className=" max-h-[80vh] " />


          {/* Overlay variables on main image
          {droppedVariables.map((item) => (
            <div
              key={item.name}
              style={{
                position: "absolute",
                left: item.x,
                top: item.y,
                color: item.color,
                fontSize: item.fontSize,
                fontWeight: "bold",
                pointerEvents: "none",
                textShadow: "0 0 4px #000",
                zIndex: 10,
              }}
            >
              {item.name}
            </div>
          ))} */}
        </div>


          {/* Buttons */}
        <div className="relative flex flex-col justify-around h-fit w-fit gap-5 self-end">
          <button
            onClick={() => setPreviewOpen(true)}
            className="border-4 border-cyan-600 border-dashed shadow-md rounded-md px-4 py-2 bg-cyan-900 text-slate-300"
          >
            Preview
          </button>
          <button
            onClick={() => window.location.reload()}
            className=" border-4 border-cyan-600 border-dashed shadow-md rounded-md px-4 py-2 bg-cyan-900 text-slate-300"
          >
            Reset changes
          </button>
          <button className=" border-4 border-cyan-600 border-dashed shadow-md rounded-[4px] px-4 py-2 bg-cyan-900 text-slate-300">
            Submit
          </button>
        </div>
      </div>

      {/* Preview Modal */}
      {previewOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-70">
          <div className="relative bg-slate-900 rounded-lg shadow-lg flex flex-col items-center p-4">
            <button
              onClick={() => setPreviewOpen(false)}
              className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white rounded-full px-3 py-1 text-lg font-bold z-10"
            >
              ×
            </button>
            <div
              className="relative flex items-center justify-center"
              style={{
                minWidth: "0",
                minHeight: "0",
                maxWidth: "90vw",
                maxHeight: "90vh",
                overflow: "auto",
              }}
            >
              <img
                ref={previewImgRef}
                src={imageUrl}
                alt="Preview"
                style={{
                  display: "block",
                  maxWidth: "90vw",
                  maxHeight: "80vh",
                  width: "auto",
                  height: "auto",
                }}
                onLoad={e =>
                  setImgDims({
                    width: e.target.naturalWidth,
                    height: e.target.naturalHeight,
                  })
                }
              />
              {/* Overlay variables */}
              {droppedVariables.map((item) => {
                // No scaling, use the same coordinates as on main image
                return (
                  <div
                    key={item.name}
                    style={{
                      position: "absolute",
                      left: item.x,
                      top: item.y,
                      color: item.color,
                      fontSize: item.fontSize,
                      pointerEvents: "none",
                      fontWeight: "bold",
                      textShadow: "0 0 4px #000",
                      // zIndex: -10,
                    }}
                  >
                    {item.name}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}