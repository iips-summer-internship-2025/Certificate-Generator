
// import React, { useEffect, useRef, useState } from "react";
// import "../../index.css";
// import { useLocation } from "react-router-dom";
// import Papa from "papaparse";
// import './Editor.css';
// import ErrorPage from "../Error page/ErrorPage";
// import Loader from "../Loader/Loader";

// export default function Editor() {
//   const { state } = useLocation();
//   const imageFile = state?.imageFile;
//   const csvFile = state?.csvFile;

//   if (!imageFile || !csvFile) {
//     return (<ErrorPage
//       message="The page you're looking for doesn't exist."
//       statusCode={404}
//     />)
//   }

//   const imageUrl = URL.createObjectURL(imageFile);
//   const [columns, setColumns] = useState([]);

//   useEffect(() => {
//     if (csvFile) {
//       Papa.parse(csvFile, {
//         header: true,
//         complete: (results) => {
//           if (results.meta.fields) {
//             setColumns(results.meta.fields);
//           }
//         },
//       });
//     }
//   }, [csvFile]);

//   const imageRef = useRef(null);
//   const [droppedVariables, setDroppedVariables] = useState([]);

//   const handleDrop = (e) => {
//     e.preventDefault();
//     const variable = e.dataTransfer.getData("text/plain");

//     if (variable.startsWith("blob")) return;

//     const rect = imageRef.current.getBoundingClientRect();
//     const x = e.clientX - rect.left;
//     const y = e.clientY - rect.top;

//     setDroppedVariables((prev) => {
//       const existing = prev.find((item) => item.name === variable);
//       const newItem = {
//         name: variable,
//         x,
//         y,
//         color: existing ? existing.color : "#565552",
//         fontSize: existing ? existing.fontSize : "16px",
//       };
//       return [...prev.filter((item) => item.name !== variable), newItem];
//     });

//     let d = document.getElementById(variable);
//     if (d) {
//       d.style.position = "absolute";
//       d.style.left = `${e.clientX}px`;
//       d.style.top = `${e.clientY}px`;
//       d.style.zIndex = '99';
//     }

//     let d_status = document.getElementById(variable + "-status");
//     if (d_status) {
//       d_status.style.backgroundColor = 'green';
//     }
//   };
//   console.log(droppedVariables)
//   const handleRemove = (title) => {
//     document.getElementById(title).style.display = 'none';
//     setDroppedVariables((prev) =>
//       prev.filter((item) => item.name !== title)
//     );
//   };

//   // Function to handle the submission of coordinates
//   // const handleSubmitCoords = async () => {
//   //   try {

//   //     const payload = droppedVariables.map(({ name, x, y, color, fontSize }) => ({
//   //       name,
//   //       x,
//   //       y,
//   //       color,
//   //       fontSize,
//   //     }));

//   //     const response = await fetch('/api/coords', {
//   //       method: 'POST',
//   //       headers: {
//   //         'Content-Type': 'application/json',
//   //       },
//   //       body: JSON.stringify({ coords: payload }),
//   //     });

//   //     const data = await response.json();
//   //     if (response.ok && data.received) {
//   //       alert('Sending in process!');
//   //       setLoading(true);
//   //     }
//   //     else {
//   //       setLoading(false);
//   //       alert(data.error || "Failed to send coordinates. Please try again.");
//   //       window.location.reload();
//   //     }
//   //   } catch (error) {
//   //     setLoading(false);
//   //     alert('Error: ' + error.message);
//   //     window.location.reload();
//   //   }
//   // };
//   //testing without backend
//   const handleSubmitCoords = async () => {

//     setLoading(true);

//   }

//   return (
//     <div className="h-[100dvh] w-screen bg-slate-900 text-white">
//       <div className="h-2/5 w-full flex justify-around items-center gap-2 text-amber-100">
//         {columns.map((title, index) => {
//           const item = droppedVariables.find((v) => v.name === title) || {
//             color: "#565552",
//             fontSize: "16px",
//           };

//           return (
//             <div key={index}>

//               {/* Dr */}
//               <div
//                 id={title}
//                 draggable
//                 onDragStart={(e) =>
//                   e.dataTransfer.setData("text/plain", title)
//                 }
//                 style={{
//                   color: item.color,
//                   fontSize: item.fontSize,
//                 }}
//                 className="relative text-grey rounded-md border-2 border-slate-400 border-dashed"
//               >
//                 <span
//                   id={title + "-status"}
//                   className="h-3 w-3 rounded-full -translate-2 bg-red-600 absolute cursor-move"
//                 ></span>
//                 <p className="m-2 font-bold ">{title}</p>
//                 <span
//                   onClick={() => handleRemove(title)}
//                   className=" bg-slate-200 h-3 w-3 rounded-full absolute -top-1 -right-1 cursor-pointer"
//                 ></span>
//               </div>

//               <div className="color_design">
//                 <p>{title}</p>
//                 <div className="Inner_div_design">
//                   <form>
//                     <label>
//                       Color:
//                       <input
//                         type="color"
//                         value={item.color}
//                         onChange={(e) => {
//                           setDroppedVariables((prev) =>
//                             prev.map((p) =>
//                               p.name === title
//                                 ? { ...p, color: e.target.value }
//                                 : p
//                             )
//                           );
//                         }}
//                       />
//                     </label>
//                     <label>
//                       Font-Size
//                       <input
//                         type="number"
//                         value={parseInt(item.fontSize)}
//                         min="8"
//                         max="72"
//                         onChange={(e) => {
//                           const newSize = `${e.target.value}px`;
//                           setDroppedVariables((prev) =>
//                             prev.map((p) =>
//                               p.name === title
//                                 ? { ...p, fontSize: newSize }
//                                 : p
//                             )
//                           );
//                         }}
//                       />
//                     </label>
//                   </form>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       <div className="h-3/5 flex p-4 relative justify-around">
//         <div
//           className="relative border-4 border-amber-400 border-dashed"
//           onDrop={handleDrop}
//           onDragOver={(e) => e.preventDefault()}
//           ref={imageRef}
//         >
//           <img src={imageUrl} alt="Certificate" className="h-full" />
//         </div>

//         <div className="relative flex flex-col justify-around h-fit w-fit gap-5 self-end">
//           <button
//             onClick={() => window.location.reload()}
//             className=" border-4 border-cyan-600 border-dashed shadow-md rounded-md px-4 py-2 bg-cyan-900 text-slate-300"
//           >
//             Reset changes
//           </button>
//           <button className=" border-4 border-cyan-600 border-dashed shadow-md rounded-[4px] px-4 py-2 bg-cyan-900 text-slate-300"
//             onClick={handleSubmitCoords}>
//             Submit
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useRef, useState } from "react";
// import "../../index.css";
import { useLocation , useNavigate } from "react-router-dom";
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
        fontSize: existing ? existing.fontSize : "16px",
        // fontSize: existing ? (existing.fontSize/imgWidth*100) : "16px",
      };
      return [...prev.filter((item) => item.name !== variable), newItem];
    });

    let d = document.getElementById(variable);
    if (d) {
      d.style.position = "absolute";
      d.style.left = `${e.clientX}px`;

      // the distance from top was okay if you havn't scrolled the screen
      // if you scrolled down, maybe because of the image is overflowing from the screen viewport
      // then the dragging and dropping was facing issue,
      // if you dropped at a place on image, it was going above because its calculating
      // from the top of screen and not accounting for the scroll amount
      // that's why i am using below method
      d.style.top = `${window.scrollY + e.clientY}px`;
      d.style.zIndex = '50';
    }

    let d_status = document.getElementById(variable + "-status");
    if (d_status) {
      d_status.style.backgroundColor = 'green';
    }
  };

  console.log(droppedVariables);

  const handleRemove = (title) => {
    const d = document.getElementById(title);
    if (d) d.style.display = 'none';
    const dRemove = document.getElementById(title + "-remove_div");
    if (dRemove) dRemove.style.display = 'none';
    setDroppedVariables((prev) =>
      prev.filter((item) => item.name !== title)
    );
  };

  // Function to handle the submission of coordinates
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
          droppedVariables.map(({ name, x, y, color, fontSize }) => ({
            title: name,
            x: (x / imageRef.current.offsetWidth) * 100, // percentage of width
            y: (y / imageRef.current.offsetHeight) * 100, // percentage of height
            font_color: color,
            font_size: (parseInt(fontSize) / imageRef.current.offsetHeight) * 100, // font size as % of height
          }))
        )
      );
      const response = await fetch('http://localhost:8000/api/upload/', {
        method: 'POST',
        body: formData,
      });

        const text = await response.text();
        setLoading(false);
        if (response.ok) {
          // handle success (e.g., show a message or redirect)
        } else {
          alert(text || "Failed to send coordinates. Please try again.");
        }
      } catch (error) {
        setLoading(false);
        alert('Error: ' + error.message);
      }
    };

  // // Function to handle the submission of coordinates
  // const handleSubmitCoords = async () => {
  //   setLoading(true);
  // };

  // Preview code

  const [imgDims, setImgDims] = useState({ width: 1, height: 1 });
  const previewImgRef = useRef(null);


  return (
    <div className=" flex flex-col justify-center items-center gap-14 w-screen text-white bg-gradient-to-br from-sky-700 to-white p-8">
      {loading && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
          <Loader />
        </div>
      )}
      <div className="h-2/5 w-full flex justify-around items-center gap-2 text-amber-100">
        {columns.map((title, index) => {
          const item = droppedVariables.find((v) => v.name === title) || {
            color: "#000000",
            fontSize: "16px",
          };

          return (
            <div
              key={index}
              id={title + "-remove_div"}
              className="bg-[rgba(30,30,30,0.12)] h-fit w-fit shadow-md p-4 flex flex-col items-center gap-2 border-2 border-slate-400 rounded-md"
            >
              {/* Draggable */}
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
                <p className="  ">{title}</p>
                <span
                  onClick={() => handleRemove(title)}
                  className=" bg-slate-200 h-3 w-3 rounded-full absolute -top-1 -right-1 cursor-pointer add_cross"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" width="8px" height="8px" viewBox="0 0 16 16" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <path d="M0 14.545L1.455 16 8 9.455 14.545 16 16 14.545 9.455 8 16 1.455 14.545 0 8 6.545 1.455 0 0 1.455 6.545 8z" fillRule="evenodd" />
                  </svg>
                </span>
              </div>

              <div className="text-center">
                <p>{title}</p>
                <div className="Inner_div_design">
                  <form>

                    {/* color selection */}
                    <label className="block">
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
                        className="border border-gray-500 rounded ml-[25px]"
                      />
                    </label>

                    {/* Font Size */}
                    <label>
                      Font-Size:
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
                        className="border rounded"
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
          className="relative border-4 border-[#9a9797] rounded-[5px] shadow-[2px_2px_8px_2px_#1e1e1f6e]"
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
            // onClick={() => setPreviewOpen(true)}
            onClick={() => navigate('/certi_preview', { state: { imageFile, csvFile, droppedVariables } })}
            className="border-4 border-cyan-600 shadow-md rounded-[4px] px-4 py-2 bg-cyan-900 text-white bg-gradient-to-r from-sky-500 to-sky-700 hover:from-sky-600 font-semibold"
          >
            Preview
          </button>
          <button
            onClick={() => window.location.reload()}
            className=" border-4 border-cyan-600 shadow-md rounded-[4px] px-4 py-2 bg-cyan-900 text-white bg-gradient-to-r from-sky-500 to-sky-700 hover:from-sky-600 font-semibold"
          >
            Reset changes
          </button>
          {/* <button
            className=" border-4 border-cyan-600 shadow-md rounded-[4px] px-4 py-2 text-white bg-gradient-to-r from-sky-500 to-sky-700 hover:from-sky-600"
            onClick={handleSubmitCoords}
          >
            Submit
          </button> */}
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