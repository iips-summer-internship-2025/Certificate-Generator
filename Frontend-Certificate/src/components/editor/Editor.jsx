
import React, { useEffect, useRef, useState } from "react";
import "../../index.css";
import { useLocation } from "react-router-dom";
import Papa from "papaparse";

export default function Editor() {
  const { state } = useLocation();
  const imageFile = state?.imageFile;
  const csvFile = state?.csvFile;

  if (!imageFile || !csvFile) {
    return <p className="c">Missing files</p>;
  }

  const imageUrl = URL.createObjectURL(imageFile);

  // Read CSV headers (column names)
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

  // Drag & Drop State
  const imageRef = useRef(null);
  const [droppedVariables, setDroppedVariables] = useState([]);

  const handleDrop = (e) => {
    e.preventDefault();
    const variable = e.dataTransfer.getData("text/plain");

    // Exclude variables whose name starts with "blob" ==> exclude image drag and drop
    if (variable.startsWith("blob")) return;
    
    const rect = imageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setDroppedVariables((prev) => [
        ...prev.filter((item) => item.name !== variable),
        { name: variable, x, y }
    ]);

    // put the div of column at the position
    let d = document.getElementById(variable);
    if (d) {
        d.style.position = "absolute";
        d.style.left = `${e.clientX}px`;
        d.style.top = `${e.clientY}px`;
        d.style.zIndex = '99';
    }  

    // status for variable
    let d_status = document.getElementById(`${variable}-status`);
    if(d_status){
        d_status.style.backgroundColor='green';
    }
  };
  console.log(droppedVariables)



  const handleRemove = (title) => {
    document.getElementById(title).style.display='none';
    setDroppedVariables((prev) => [
        ...prev.filter((item) => item.name != title)
    ])
  }


  return (
    <div className="h-[100dvh] w-screen bg-slate-900 overflow-hidden text-white">

      {/* Draggable Variables */}
      <div className="h-2/5 w-full flex justify-around items-center gap-2 text-amber-100">
        {columns.map((title, index) => (
          <div
            id={title}
            key={index}
            draggable
            onDragStart={(e) => e.dataTransfer.setData("text/plain", title)}
            className=" relative bg-slate-700 rounded-md border-2 border-slate-400 border-dashed"
          >
            <span id={`${title}-status`} className=" h-3 w-3 rounded-full -translate-2 bg-red-600 absolute cursor-move"></span>
            <p className=" m-2">{title}</p>
            
            <span onClick={() => handleRemove(title)} className=" bg-slate-200 h-3 w-3 rounded-full absolute -top-1 -right-1 cursor-pointer"></span>
          </div>
        ))}
      </div>



      {/* Image with Droppable Area */}
      <div className="h-3/5 flex p-4 relative justify-around">


        {/* Image Container */}
        <div
          className="relative border-4 border-amber-400 border-dashed"
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          ref={imageRef}
        >
          {/* Certificate Image */}
          <img src={imageUrl} alt="Certificate" className="h-full" />



          {/* Render Dropped Texts */}
          {/* {droppedVariables.map((item, index) => (
            <div
              key={index}
              className="absolute text-black font-bold text-lg"
              style={{
                left: `${item.x}px`,
                top: `${item.y}px`,
                transform: "translate(-50%, -50%)",
              }}
            >
              {item.name}
            </div>
          ))} */}
        </div>

        <div className=" relative flex flex-col justify-around h-fit w-fit gap-5 self-end">
            <button onClick={() => window.location.reload()} className=" border-4 border-cyan-600 border-dashed shadow-md rounded-md   px-4 py-2 bg-cyan-900 text-slate-300">Reset changes</button>
            <button className=" border-4 border-cyan-600 border-dashed shadow-md rounded-[4px]   px-4 py-2 bg-cyan-900 text-slate-300">Submit</button>
        </div>
      </div>
    </div>
  );
}
