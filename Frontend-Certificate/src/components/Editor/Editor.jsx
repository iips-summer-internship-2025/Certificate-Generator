import React, { useEffect, useRef, useState } from "react";
import "../../index.css";
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

  const handleDrop = (e) => {
    e.preventDefault();
    const variable = e.dataTransfer.getData("text/plain");

    if (variable.startsWith("blob")) return;

    const rect = imageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setDroppedVariables((prev) => {
      const existing = prev.find((item) => item.name === variable);
      const newItem = {
        name: variable,
        x,
        y,
        color: existing ? existing.color : "#565552",
        fontSize: existing ? existing.fontSize : "16px",
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

  return (
    <div className="h-[100dvh] w-screen bg-slate-900 text-white">
      <div className="h-2/5 w-full flex justify-around items-center gap-2 text-amber-100">
        {columns.map((title, index) => {
          const item = droppedVariables.find((v) => v.name === title) || {
            color: "#565552",
            fontSize: "16px",
          };

          return (
            <div key={index}>

                {/* Dr */}
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
                className="relative text-grey rounded-md border-2 border-slate-400 border-dashed"
              >
                <span
                id={title + "-status"}
                className="h-3 w-3 rounded-full -translate-2 bg-red-600 absolute cursor-move"
                ></span>
                <p className="m-2 font-bold ">{title}</p>
                <span
                  onClick={() => handleRemove(title)}
                  className=" bg-slate-200 h-3 w-3 rounded-full absolute -top-1 -right-1 cursor-pointer"
                ></span>
              </div>

              <div className="color_design">
                <p>{title}</p>
                <div className="Inner_div_design">
                  <form>
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
                    <label>
                      Font-Size
                      <input
                        type="number"
                        value={parseInt(item.fontSize)}
                        min="8"
                        max="72"
                        onChange={(e) => {
                        const newSize = `${e.target.value}px`;
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

      <div className="h-3/5 flex p-4 relative justify-around">
        <div
          className="relative border-4 border-amber-400 border-dashed"
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          ref={imageRef}
        >
          <img src={imageUrl} alt="Certificate" className="h-full" />
        </div>

        <div className="relative flex flex-col justify-around h-fit w-fit gap-5 self-end">
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
    </div>
  );
}