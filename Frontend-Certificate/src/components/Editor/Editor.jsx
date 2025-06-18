import React, { useEffect, useRef, useState } from "react";
// import "../../index.css";
import { useLocation, useNavigate } from "react-router-dom";
import Papa from "papaparse";
import './Editor.css';
import ErrorPage from "../Error page/ErrorPage";
import Loader from "../Loader/Loader";

export default function Editor() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const imageFile = state?.imageFile;
  const csvFile = state?.csvFile;

  if (!imageFile || !csvFile) {
    return (
      <ErrorPage
        message="The page you're looking for doesn't exist."
        statusCode={404}
      />
    );
  }

  const imageUrl = URL.createObjectURL(imageFile);
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    droppedVariables.forEach(item => {
      const element = document.getElementById(item.name);
      if (element) {
        element.style.fontFamily = item.fontFamily;
        element.style.fontWeight = item.fontWeight;
      }
    });
  }, [droppedVariables]);
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
        fontFamily: existing ? existing.fontFamily : "Arial",
        fontWeight: existing ? existing.fontWeight : "normal"
      };
      return [...prev.filter((item) => item.name !== variable), newItem];
    });

    const d = document.getElementById(variable);
    if (d) {
      const existingStyle = droppedVariables.find((item) => item.name === variable);
      d.style.position = "absolute";
      d.style.left = `${e.clientX}px`;
      d.style.top = `${window.scrollY + e.clientY}px`;
      d.style.zIndex = '50';
      d.style.fontFamily = existing ? existing.fontFamily : "Arial";
      d.style.fontWeight = existing ? existing.fontWeight : "normal";
    }

    const d_status = document.getElementById(variable + "-status");
    if (d_status) {
      d_status.style.backgroundColor = 'green';
    }
  };

  const handleRemove = (title) => {
    const dRemove = document.getElementById(title + "-remove_div");
    if (dRemove) dRemove.style.display = 'none';
    setDroppedVariables((prev) => prev.filter((item) => item.name !== title));
  };

  const handelSetVariable = (title) => {
    setDroppedVariables((prev) => prev.filter((item) => item.name !== title));
    const d = document.getElementById(title);
    if (d) {
      d.style.position = "static";
      d.style.left = "unset";
      d.style.top = "unset";
      d.style.zIndex = "unset";
    }
  };

  // const handleSubmitCoords = async () => {
  //   setLoading(true);
  //   try {
  //     const formData = new FormData();
  //     formData.append('imagefile', imageFile);
  //     formData.append('csvfile', csvFile);
  //     formData.append('userType', 'merit');
  //     formData.append(
  //       'coords',
  //       JSON.stringify(
  //         droppedVariables.map(({ name, x, y, color, fontSize }) => ({
  //           title: name,
  //           x: (x / imageRef.current.offsetWidth) * 100,
  //           y: (y / imageRef.current.offsetHeight) * 100,
  //           font_color: color,
  //           font_size: (parseInt(fontSize) / imageRef.current.offsetHeight) * 100,
  //           font_family: fontFamily,
  //           font_weight: fontWeight
  //         }))
  //       )
  //     );
  //     const response = await fetch('http://127.0.0.1:8000/api/upload/', {
  //       method: 'POST',
  //       body: formData,
  //     });

  //     const text = await response.text();
  //     setLoading(false);
  //     if (!response.ok) {
  //       alert(text || "Failed to send coordinates. Please try again.");
  //     }
  //   } catch (error) {
  //     setLoading(false);
  //     alert('Error: ' + error.message);
  //   }
  // };
  const handleSubmitCoords = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('imagefile', imageFile);
      formData.append('csvfile', csvFile);
      formData.append('userType', 'merit');
      formData.append(
        'coords',
        JSON.stringify(
          droppedVariables.map(({ name, x, y, color, fontSize, fontFamily, fontWeight }) => ({
            title: name,
            x: (x / imageRef.current.offsetWidth) * 100,
            y: (y / imageRef.current.offsetHeight) * 100,
            font_color: color,
            font_size: (parseInt(fontSize) / imageRef.current.offsetHeight) * 100,
            font_family: fontFamily,
            font_weight: fontWeight
          }))
        )
      );
      const response = await fetch('http://127.0.0.1:8000/api/upload/', {
        method: 'POST',
        body: formData,
      });

      const text = await response.text();
      setLoading(false);
      if (!response.ok) {
        alert(text || "Failed to send coordinates. Please try again.");
      }
    } catch (error) {
      setLoading(false);
      alert('Error: ' + error.message);
    }
  };
  const [imgDims, setImgDims] = useState({ width: 1, height: 1 });
  const previewImgRef = useRef(null);
  console.log(droppedVariables);
  return (
    <div className="flex flex-col justify-center items-center gap-14 w-screen overflow-hidden ">
      {loading && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
          <Loader />
        </div>
      )}

      <div>
        <div className="row">
          <div className="col-lg-3 Side_Nav_Bar h-screen ">
            <div className="h-1/2">
              <div className="Editor_heading text-center ">
                <div className="Ediotr_svg_parent text-center">
                  <div>
                    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="#000000" height="20px" width="20px" version="1.1" id="Capa_1" viewBox="0 0 48 48" xmlSpace="preserve">
                      <g>
                        <g>
                          <path d="M47.987,21.938c-0.006-0.091-0.023-0.178-0.053-0.264c-0.011-0.032-0.019-0.063-0.033-0.094    c-0.048-0.104-0.109-0.202-0.193-0.285c-0.001-0.001-0.001-0.001-0.001-0.001L42,15.586V10c0-0.022-0.011-0.041-0.013-0.063    c-0.006-0.088-0.023-0.173-0.051-0.257c-0.011-0.032-0.019-0.063-0.034-0.094c-0.049-0.106-0.11-0.207-0.196-0.293l-9-9    c-0.086-0.086-0.187-0.148-0.294-0.196c-0.03-0.014-0.06-0.022-0.091-0.032c-0.085-0.03-0.172-0.047-0.263-0.052    C32.039,0.01,32.021,0,32,0H7C6.448,0,6,0.448,6,1v14.586l-5.707,5.707c0,0-0.001,0.001-0.002,0.002    c-0.084,0.084-0.144,0.182-0.192,0.285c-0.014,0.031-0.022,0.062-0.033,0.094c-0.03,0.086-0.048,0.173-0.053,0.264    C0.011,21.96,0,21.978,0,22v19c0,0.552,0.448,1,1,1h5v5c0,0.552,0.448,1,1,1h34c0.552,0,1-0.448,1-1v-5h5c0.552,0,1-0.448,1-1V22    C48,21.978,47.989,21.96,47.987,21.938z M44.586,21H42v-2.586L44.586,21z M38.586,9H33V3.414L38.586,9z M8,2h23v8    c0,0.552,0.448,1,1,1h8v5v5H8v-5V2z M6,18.414V21H3.414L6,18.414z M40,46H8v-4h32V46z M46,40H2V23h5h34h5V40z" />
                          <path d="M23.422,27.885c0.147-0.136,0.312-0.235,0.493-0.298c0.181-0.062,0.368-0.093,0.561-0.093    c0.669,0,1.224,0.266,1.666,0.799l1.122-1.462c-0.329-0.385-0.734-0.677-1.215-0.876c-0.482-0.198-1.028-0.297-1.64-0.297    c-0.419,0-0.833,0.071-1.241,0.212c-0.408,0.142-0.774,0.36-1.097,0.655c-0.323,0.295-0.584,0.666-0.782,1.113    c-0.198,0.448-0.298,0.984-0.298,1.607c0,0.499,0.065,0.926,0.195,1.283c0.13,0.358,0.306,0.669,0.527,0.935    c0.221,0.267,0.476,0.496,0.765,0.689c0.289,0.193,0.598,0.368,0.927,0.527c0.521,0.261,0.952,0.544,1.292,0.85    c0.34,0.306,0.51,0.72,0.51,1.241c0,0.533-0.142,0.946-0.425,1.241s-0.64,0.442-1.071,0.442c-0.385,0-0.762-0.091-1.131-0.272    s-0.683-0.431-0.944-0.748l-1.105,1.496c0.34,0.397,0.793,0.725,1.36,0.986c0.567,0.261,1.184,0.391,1.853,0.391    c0.465,0,0.907-0.079,1.326-0.238c0.419-0.159,0.785-0.394,1.097-0.706c0.312-0.311,0.561-0.694,0.748-1.147    c0.187-0.453,0.281-0.975,0.281-1.564c0-0.51-0.079-0.952-0.238-1.326c-0.159-0.374-0.363-0.697-0.612-0.969    c-0.249-0.272-0.527-0.504-0.833-0.697c-0.306-0.193-0.606-0.363-0.901-0.51c-0.499-0.249-0.901-0.513-1.207-0.791    c-0.306-0.277-0.459-0.671-0.459-1.181c0-0.295,0.042-0.55,0.128-0.765C23.159,28.197,23.275,28.021,23.422,27.885z" />
                          <path d="M15.177,28.854c0.204-0.397,0.459-0.711,0.765-0.944c0.306-0.232,0.663-0.348,1.071-0.348    c0.737,0,1.337,0.334,1.802,1.003l1.173-1.428c-0.329-0.476-0.754-0.841-1.275-1.097c-0.521-0.255-1.128-0.382-1.819-0.382    c-0.669,0-1.278,0.156-1.828,0.467c-0.55,0.312-1.017,0.748-1.403,1.309c-0.385,0.562-0.683,1.23-0.892,2.006    c-0.21,0.777-0.314,1.624-0.314,2.542c0,0.918,0.105,1.762,0.314,2.533s0.504,1.436,0.884,1.997    c0.38,0.562,0.844,1.001,1.394,1.318s1.165,0.476,1.845,0.476c0.748,0,1.368-0.147,1.861-0.442s0.898-0.68,1.215-1.156    l-1.173-1.377c-0.193,0.295-0.434,0.544-0.722,0.748s-0.632,0.306-1.028,0.306c-0.419,0-0.785-0.116-1.097-0.349    c-0.312-0.232-0.569-0.546-0.774-0.943s-0.357-0.864-0.459-1.403c-0.102-0.538-0.153-1.107-0.153-1.708    c0-0.612,0.051-1.187,0.153-1.726C14.82,29.718,14.973,29.251,15.177,28.854z" />
                          <polygon points="32.007,35.62 31.956,35.62 29.95,25.964 27.672,25.964 30.613,38 33.197,38 36.189,25.964 34.013,25.964   " />
                        </g>
                      </g>
                    </svg>
                  </div>
                  <p>CSV Column</p>
                </div>
              </div>
              <div className="h-2/5 w-full flex justify-around items-center gap-2 text-amber-100 py- px-4 row add_scroller">
                {columns.map((title, index) => {
                  const item = droppedVariables.find((v) => v.name === title) || {
                    color: "#000000",
                    fontSize: "16px",
                  };

                  return (
                    <div className="col-lg-12 row" key={index}>
                      {
                        // <div
                        //   id={title + "-remove_div"}
                        //   className="remove_div bg-[floralwhite] shadow-md p-2 flex flex-col gap-2 border-2 border-slate-400 rounded-md w-full min-w-[150px]"
                        // >
                        //   <div className="flex items-center justify-between w-full">
                        //     <p className="capitalize heading_of_column">{title}</p>
                        //     <div className="relative">
                        //       <span
                        //         onClick={() => handleRemove(title)}
                        //         className="p-1 hover:bg-gray-100 rounded"
                        //       >
                        //         <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none">
                        //           <path d="M10 11V17" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        //           <path d="M14 11V17" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        //           <path d="M4 7H20" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        //           <path d="M6 7H12H18V18C18 19.6569 16.6569 21 15 21H9C7.34315 21 6 19.6569 6 18V7Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        //           <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        //         </svg>
                        //       </span>
                        //     </div>
                        //   </div>

                        //   <div
                        //     id={title}
                        //     draggable
                        //     onDragStart={(e) => e.dataTransfer.setData("text/plain", title)}
                        //     style={{
                        //       color: item.color,
                        //       fontSize: item.fontSize,
                        //     }}
                        //     className="relative z-40 border-2 border-slate-200 px-2 py-1 rounded"
                        //   >
                        //     <span
                        //       id={title + "-status"}
                        //       className="h-3 w-3 rounded-full -translate-2 bg-red-600 absolute cursor-move"
                        //     ></span>
                        //     <p className="capitalize">{title}</p>
                        //     <span
                        //       className="bg-slate-200 h-3 w-3 rounded-full absolute -top-1 -right-1 cursor-pointer add_cross"
                        //       onClick={() => handelSetVariable(title)}
                        //     >
                        //       <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" width="8px" height="8px" viewBox="0 0 16 16" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        //         <path d="M0 14.545L1.455 16 8 9.455 14.545 16 16 14.545 9.455 8 16 1.455 14.545 0 8 6.545 1.455 0 0 1.455 6.545 8z" fillRule="evenodd" />
                        //       </svg>
                        //     </span>
                        //   </div>
                        // </div>

                      <div
                        id={title + "-remove_div"}
                        className="rmeove_div bg-[floralwhite] h-fit w-fit shadow-md p-1 flex flex-col items-center gap-2 border-2 border-slate-400 rounded-md"
                      >
                        <p className="capitalize heading_of_column">{title}</p>
                        <div className="relative">
                          <span
                            onClick={() => handleRemove(title)}
                            className="absolute top-1/2 -translate-y-1/2 -left-32 bg-white-200 py-4 rounded cursor-pointer px-2 pl-0 hover:bg-white-400">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none">
                              <path d="M10 11V17" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="M14 11V17" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="M4 7H20" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="M6 7H12H18V18C18 19.6569 16.6569 21 15 21H9C7.34315 21 6 19.6569 6 18V7Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </span>
                        </div>

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
                          <p className="capitalize">{title}</p>
                          <span
                            className=" bg-slate-200 h-3 w-3 rounded-full absolute -top-1 -right-1 cursor-pointer add_cross"
                            onClick={() => handelSetVariable(title)}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" width="8px" height="8px" viewBox="0 0 16 16" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                              <path d="M0 14.545L1.455 16 8 9.455 14.545 16 16 14.545 9.455 8 16 1.455 14.545 0 8 6.545 1.455 0 0 1.455 6.545 8z" fillRule="evenodd" />
                            </svg>
                          </span>
                        </div>
                      </div> }
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="h-1/2">
              <div className="Editor_heading text-center">
                <div className="Ediotr_svg_parent text-center">
                  <div>
                    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" width="20px" height="20px" viewBox="0 -2 32 32" version="1.1">

                      <title>brush</title>
                      <desc>Created with Sketch Beta.</desc>
                      <defs>

                      </defs>
                      <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" sketch:type="MSPage">
                        <g id="Icon-Set" sketch:type="MSLayerGroup" transform="translate(-99.000000, -154.000000)" fill="#000000">
                          <path d="M128.735,157.585 L116.047,170.112 L114.65,168.733 L127.339,156.206 C127.725,155.825 128.35,155.825 128.735,156.206 C129.121,156.587 129.121,157.204 128.735,157.585 L128.735,157.585 Z M112.556,173.56 C112.427,173.433 111.159,172.181 111.159,172.181 L113.254,170.112 L114.65,171.491 L112.556,173.56 L112.556,173.56 Z M110.461,178.385 C109.477,179.298 105.08,181.333 102.491,179.36 C102.491,179.36 103.392,178.657 104.074,177.246 C105.703,172.919 109.763,173.56 109.763,173.56 L111.159,174.938 C111.173,174.952 112.202,176.771 110.461,178.385 L110.461,178.385 Z M130.132,154.827 C128.975,153.685 127.099,153.685 125.942,154.827 L108.764,171.788 C106.661,171.74 103.748,172.485 102.491,176.603 C101.53,178.781 99,178.671 99,178.671 C104.253,184.498 110.444,181.196 111.857,179.764 C113.1,178.506 113.279,176.966 113.146,175.734 L130.132,158.964 C131.289,157.821 131.289,155.969 130.132,154.827 L130.132,154.827 Z" id="brush" sketch:type="MSShapeGroup">

                          </path>
                        </g>
                      </g>
                    </svg>
                  </div>
                  <p>Edit Style</p>
                </div>
              </div>
              <div className="h-2/5 w-full flex justify-around items-center gap-2 text-amber-100 py-1 px-4 row add_scroller Edit_style_scroller">
                {columns.map((title, index) => {
                  const item = droppedVariables.find((v) => v.name === title) || {
                    color: "#000000",
                    fontSize: "16px",
                  };
                  return (
                    <>
                      {/* === Show tools only if this column was dropped === */}
                      {droppedVariables.find((v) => v.name === title) && (
                        <div className="col-lg-12 row">
                          <div className="Inner_div_design rmeove_div bg-[floralwhite] h-fit w-fit shadow-md p15 flex flex-col items-center gap-2 border-2 border-slate-400 rounded-md">
                            <form>
                              <p className="block px-3 title_color_design border-l border-r border-grey  text-black text-center capitalize">{title}</p>
                              <label className="inline-block w-1/2">
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
                                  className="w-full border-2 border-amber-100 rounded-md"
                                />
                              </label>
                              <label className="inline-block w-1/2">
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
                                  className="font_size_design font_family_design"
                                />
                              </label>
                              <label className="inline-block w-1/2">
                                <select
                                  value={item.fontFamily}
                                  onChange={(e) => {
                                    setDroppedVariables((prev) =>
                                      prev.map((p) =>
                                        p.name === title
                                          ? { ...p, fontFamily: e.target.value }
                                          : p
                                      )
                                    );
                                  }}
                                  className="font_family_design"
                                >
                                  <option value="Arial">Arial</option>
                                  <option value="Times New Roman">Times New Roman</option>
                                  <option value="Courier New">Courier New</option>
                                  <option value="Georgia">Georgia</option>
                                  <option value="Verdana">Verdana</option>
                                  <option value="Helvetica">Helvetica</option>
                                </select>
                              </label>
                              <label className="inline-block w-1/2">
                                <select
                                  value={item.fontWeight}
                                  onChange={(e) => {
                                    setDroppedVariables((prev) =>
                                      prev.map((p) =>
                                        p.name === title
                                          ? { ...p, fontWeight: e.target.value }
                                          : p
                                      )
                                    );
                                  }}
                                  className="font_weight_design"
                                >
                                  <option value="normal">Normal</option>
                                  <option value="bold">Bold</option>
                                  <option value="lighter">Light</option>
                                  <option value="bolder">Bolder</option>
                                  <option value="100">100</option>
                                  <option value="200">200</option>
                                  <option value="300">300</option>
                                  <option value="400">400</option>
                                  <option value="500">500</option>
                                  <option value="600">600</option>
                                  <option value="700">700</option>
                                  <option value="800">800</option>
                                  <option value="900">900</option>
                                </select>
                              </label>
                            </form>
                          </div>
                        </div>
                      )}
                    </>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="col-lg-9 bg-white">
            <div className="Image_heading text-center">
              <div className="Image_Heading_svg_code inline-block px-2 py-4 bg-white ">
                {/* <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="9" r="7" stroke="#ffffff" strokeWidth="1.5" />
                  <path d="M7.35111 15L6.71424 17.323C6.0859 19.6148 5.77173 20.7607 6.19097 21.3881C6.3379 21.6079 6.535 21.7844 6.76372 21.9008C7.41635 22.2331 8.42401 21.7081 10.4393 20.658C11.1099 20.3086 11.4452 20.1339 11.8014 20.0959C11.9335 20.0818 12.0665 20.0818 12.1986 20.0959C12.5548 20.1339 12.8901 20.3086 13.5607 20.658C15.576 21.7081 16.5837 22.2331 17.2363 21.9008C17.465 21.7844 17.6621 21.6079 17.809 21.3881C18.2283 20.7607 17.9141 19.6148 17.2858 17.323L16.6489 15" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
                </svg> */}
              </div>
              {/* <p>Customize Template</p> */}
            </div>
            <div
              className="relative flex items-center justify-center min-h-[80vh] bg-transparent"
              style={{ display: previewOpen ? "none" : "flex" }}
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              ref={imageRef}
            >
              <div className="absolute inset-0 z-0 rounded-[5px]  pointer-events-none"></div>
              <img
                src={imageUrl}
                alt="Certificate"
                className="relative z-10 max-h-[80vh] mx-auto my-auto rounded-[5px] backdrop-blur-md shadow-2xl"
              />
            </div>
            <div className="row flex justify-center items-center mt-2 text-center">
              <div className="col-lg-4 mt-4">
                <button
                  onClick={() => setPreviewOpen(true)}
                  className=" shadow-md rounded-[6px] px-4 py-2 bg-cyan-900 text-white bg-gradient-to-r from-sky-500 to-sky-700 hover:from-sky-600 font-semibold"
                >
                  Preview
                </button>
              </div>
              <div className="col-lg-4 mt-4">
                <button
                  onClick={() => window.location.reload()}
                  className="shadow-md rounded-[6px] px-4 py-2 bg-cyan-900 text-white bg-gradient-to-r from-sky-500 to-sky-700 hover:from-sky-600 font-semibold"
                >
                  Reset changes
                </button>
              </div>
              <div className="col-lg-4 mt-4">
                <button
                  className="  shadow-md rounded-full px-4 py-2 text-white bg-gradient-to-r from-sky-500 to-sky-700 hover:from-sky-600"
                  onClick={handleSubmitCoords}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
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
              {droppedVariables.map((item) => (
                <div
                  key={item.name}
                  style={{
                    position: "absolute",
                    left: item.x,
                    top: item.y,
                    color: item.color,
                    fontSize: item.fontSize,
                    fontFamily: item.fontFamily,
                    fontWeight: item.fontWeight,
                    pointerEvents: "none",
                    textShadow: "0 0 4px #000",
                  }}
                >
                  {item.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}