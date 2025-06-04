import React, { useEffect, useRef, useState } from "react";
import "../../index.css";
import { useLocation } from "react-router-dom";
import Papa from "papaparse";
import './Editor.css';
import crossoutimg from '../../../public/assets/crossoutimg.png';
import axios from "axios";

export default function Editor() {
  const { state } = useLocation();
  const imageFile = state?.imageFile;
  const csvFile = state?.csvFile;

  if (!imageFile || !csvFile) {
    return <p className="c">Missing files</p>;
  }

  const imageUrl = URL.createObjectURL(imageFile);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    if (csvFile) {
      Papa.parse(csvFile, {
        header: true,
        complete: (results) => {
          //   if (results.meta.fields) {
          //     setColumns(results.meta.fields);
          //   }
          // },
          let fields = results.meta.fields || [];
          // Ensure 'qr' is at the first position
          if (!fields.includes('qr')) {
            fields = ['qr', ...fields];
          } else {
            fields = ['qr', ...fields.filter(f => f !== 'qr')];
          }
          setColumns(fields);
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
        size: existing ? existing.size : "64", // for QR
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

    let d_status = document.getElementById(`${variable}-status`);
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

  //Loding 
  const [loading, setLoading] = useState(false);

  // send certificate to server
  const handleSubmit = async () => {
    if (!imageFile || !csvFile || droppedVariables.length === 0) {
      alert("Missing files or no fields placed.");
      return;
    }

    // Show loading
    setLoading(true);
    //testing dummy loading
    setTimeout(() => {
      setLoading(false);
      alert("Certificate generated (dummy)!");
    }, 3000);

    // const formData = new FormData();
    // formData.append("certificateImage", imageFile);
    // formData.append("csvFile", csvFile);
    // formData.append("fieldCoordinates", JSON.stringify(droppedVariables));

    // try {
    //   const response = await axios.post("http://localhost:5173/api/process-certificate", formData, {
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //     },
    //   });

    //   if (response.status === 200) {
    //     alert("Certificate submitted successfully!");
    //   } else {
    //     alert("Failed to submit. Try again.");
    //   }
    // } catch (error) {
    //   console.error("Submit error:", error);
    //   alert("An error occurred while submitting.");
    // }
  };

  // Render dropped variables on the certificate image
  const renderDropped = () =>
    droppedVariables.map((item) =>
      item.name === "qr" ? (
        <div
          key={item.name}
          style={{
            position: "absolute",
            left: item.x,
            top: item.y,
            width: `${item.size}px`,
            height: `${item.size}px`,
            background: "#e2e8f0",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#222",
            fontWeight: "bold",
            border: "2px dashed #0ea5e9",
            zIndex: 50,
          }}
        >
          QR
        </div>
      ) : (
        <div
          key={item.name}
          style={{
            position: "absolute",
            left: item.x,
            top: item.y,
            color: item.color,
            fontSize: item.fontSize,
            fontWeight: "bold",
            background: "rgba(255,255,255,0.7)",
            borderRadius: "4px",
            padding: "2px 8px",
            zIndex: 50,
          }}
        >
          {item.name}
        </div>
      )
    );


  return (
    <div className="h-[100dvh] w-screen bg-slate-900 text-white">
      <div className="h-2/5 w-full flex justify-around items-center gap-2 text-amber-100">
        {columns.map((title, index) => {
          const item = droppedVariables.find((v) => v.name === title) || {
            color: "#565552",
            fontSize: "16px",
            size: "64",
          };

          return (
            <div key={index}>
              <div
                id={title}
                draggable
                onDragStart={(e) =>
                  e.dataTransfer.setData("text/plain", title)
                }
                style={{
                  color: title === "qr" ? undefined : item.color,
                  fontSize: title === "qr" ? undefined : item.fontSize,

                }}
                className="relative text-grey rounded-md border-2 border-slate-400 border-dashed w-28 h-20 flex flex-col items-center justify-center mb-2"
              >
                <span
                  id={`${title}-status`}
                  className=" h-3 w-3 rounded-full -translate-2 bg-red-600 absolute cursor-move left-1 top-1"
                ></span>
                <p className="m-2 font-bold ">{title}</p>
                <span
                  onClick={() => handleRemove(title)}
                  className=" bg-slate-200 scale-150 h-3 w-3 rounded-full absolute -top-2 -right-2 cursor-pointer flex items-center justify-center"
                >
                  <img src={crossoutimg} alt="Remove" className="h-3 w-5 rounded-full" />
                </span>
              </div>

              <div className="color_design">
                <p>{title}</p>
                <div className="Inner_div_design">
                  <form>
                    {title === "qr" ? (
                      <label>
                        Size:
                        <input
                          type="number"
                          // value={item.size}
                          value={parseInt(item.size)}
                          min="16"
                          max="256"
                          onChange={(e) => {
                            const newSize = e.target.value;
                            setDroppedVariables((prev) =>
                              prev.map((p) =>
                                p.name === title
                                  ? { ...p, size: newSize }
                                  : p
                              )
                            );
                          }}
                        />
                      </label>
                    ) : (
                      <>
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
                      </>
                    )}
                  </form>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="h-3/5 flex p-4 relative justify-around">
        <div
          className="relative border-4 border-amber-400 border-dashed "
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          ref={imageRef}
        >
          <img src={imageUrl} alt="Certificate" className="h-full w-fit gap-5 self-end" />
          {/* gfghfg */}
          {renderDropped()}
        </div>

        <div className="relative flex flex-col justify-around h-fit w-fit gap-5 self-end">
          <button
            onClick={() => window.location.reload()}
            className=" border-4 border-cyan-600 border-dashed shadow-md rounded-md px-4 py-2 bg-cyan-900 text-slate-300"
          >
            Reset changes
          </button>
          <button onClick={handleSubmit} className=" border-4 border-cyan-600 border-dashed shadow-md rounded-[4px] px-4 py-2 bg-cyan-900 text-slate-300">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}