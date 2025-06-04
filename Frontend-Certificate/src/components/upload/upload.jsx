// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// function Upload() {
//     const [csvFile, setCsvFile] = useState(null);
//     const [imageFile, setImageFile] = useState(null);
//     const [userType, setUserType] = useState('merit');
//     const [csvDragActive, setCsvDragActive] = useState(false);
//     const [imgDragActive, setImgDragActive] = useState(false);


//     // Handle submit 
//     const navigate = useNavigate();

//     const handleSubmit = () => {

//          if (!csvFile || !imageFile) {
//           alert('Please upload both files.');
//           return;
//         }
      
//         const formData = new FormData();
//         formData.append('csvfile', csvFile);
//         formData.append('imagefile', imageFile);
//         formData.append('userType', userType);


//         navigate("/editor", {
//         state: { csvFile, imageFile, userType }
//         });
//     };

//     const handleCsvChange = (e) => {
//         const file = e.target.files[0];
//         if (file && /\.(csv|xls|xlsx)$/i.test(file.name)) {
//             setCsvFile(file);
//         } else {
//             alert('Upload a valid CSV or Excel file');
//         }
//     };

//     const handleImageChange = (e) => {
//         const file = e.target.files[0];
//         if (file && /\.(png|jpe?g|heic)$/i.test(file.name)) {
//             setImageFile(file);
//         } else {
//             alert('Upload a valid image file');
//         }
//     };

//     // Drag and drop handlers for CSV
//     const handleCsvDragOver = (e) => {
//         e.preventDefault();
//         e.stopPropagation();
//         setCsvDragActive(true);
//     };

//     const handleCsvDragLeave = (e) => {
//         e.preventDefault();
//         e.stopPropagation();
//         setCsvDragActive(false);
//     };


//     const handleCsvDrop = (e) => {
//         e.preventDefault();
//         e.stopPropagation();
//         setCsvDragActive(false);
//         const file = e.dataTransfer.files[0];
//         if (file && /\.(csv|xls|xlsx)$/i.test(file.name)) {
//             setCsvFile(file);
//         } else {
//             alert('Upload a valid CSV or Excel file');
//         }
//     };

//     // Drag and drop handlers for Image
//     const handleImgDragOver = (e) => {
//         e.preventDefault();
//         e.stopPropagation();
//         setImgDragActive(true);
//     };
//     const handleImgDragLeave = (e) => {
//         e.preventDefault();
//         e.stopPropagation();
//         setImgDragActive(false);
//     };
//     const handleImgDrop = (e) => {
//         e.preventDefault();
//         e.stopPropagation();
//         setImgDragActive(false);
//         const file = e.dataTransfer.files[0];
//         if (file && /\.(png|jpe?g|heic)$/i.test(file.name)) {
//             setImageFile(file);
//         } else {
//             alert('Upload a valid image file');
//         }
//     };

//     // Inside your Upload component

//     function getCookie(name) {
//         let cookieValue = null;
//         if (document.cookie && document.cookie !== '') {
//           const cookies = document.cookie.split(';');
//           for (let i = 0; i < cookies.length; i++) {
//             const cookie = cookies[i].trim();
//             // Does this cookie string begin with the name we want?
//             if (cookie.substring(0, name.length + 1) === (name + '=')) {
//               cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
//               break;
//             }
//           }
//         }
//         return cookieValue;
//       }
      

//     //   const handleSubmit = async () => {
//     //     if (!csvFile || !imageFile) {
//     //       alert('Please upload both files.');
//     //       return;
//     //     }
      
//     //     const formData = new FormData();
//     //     formData.append('csvfile', csvFile);
//     //     formData.append('imagefile', imageFile);
//     //     formData.append('userType', userType);
      
//     //     try {
//     //       const response = await fetch('http://localhost:8000/api/upload/', {
//     //         method: 'POST',
//     //         credentials: 'include',
//     //         headers: {
//     //           'X-CSRFToken': getCookie('csrftoken'),
//     //         },
//     //         body: formData,
//     //       });
      
//     //       if (response.ok) {
//     //         const data = await response.json();
//     //         alert('Upload successful!');
//     //         console.log('Response:', data);
//     //         setCsvFile(null);
//     //         setImageFile(null);
//     //       } else {
//     //         const err = await response.text();
//     //         alert('Upload failed: ' + err);
//     //       }
//     //     } catch (error) {
//     //       alert('Error uploading files: ' + error.message);
//     //     }
//     //   };
      
  
//     return (
//         <>
//             <div className="min-h-screen flex flex-col items-center justify-center bg-black relative p-6">
//                 <img src="../bg-upload.jpg" alt="Background" className="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-60" />
//                 <h1 className="text-white text-4xl md:text-5xl font-bold uppercase ">Upload your Files Here</h1>
//                 {/* Header */}
//                 <div className="z-10 text-center mt-8">
//                     <div className='mb-4 mt-4 gap-5 rounded-lg p-4'>
//                         <p className="text-white text-2xl mb-2 pb-2">Select the category</p>
//                         {/* Radio Buttons */}
//                         <div className="flex gap-6 justify-center mb-4 text-white">
//                             <label className="inline-flex items-center gap-2">
//                                 <input
//                                     type="radio"
//                                     name="type"
//                                     value="merit"
//                                     checked={userType === 'merit'}
//                                     onChange={() => setUserType('merit')}
//                                     className="accent-blue-500 "
//                                 />
//                                 <span className='text-lg'>Merit</span>
//                             </label>
//                             <label className="inline-flex items-center gap-2">
//                                 <input
//                                     type="radio"
//                                     name="type"
//                                     value="participant"
//                                     checked={userType === 'participant'}
//                                     onChange={() => setUserType('participant')}
//                                     className="accent-blue-500 "
//                                 />
//                                 <span className='text-lg'> Participant</span>
//                             </label>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Upload Card */}
//                 <div className="z-10 bg-white text-black p-10 rounded-xl shadow-lg w-full max-w-4xl">
//                     <div className="flex flex-col md:flex-row justify-between ">
//                         {/* CSV Upload Box */}
//                         <div
//                             className={`flex-1 flex flex-col justify-center items-center gap-4 border-2 border-dashed rounded-lg p-6 transition h-54 cursor-pointer
//                                 ${csvDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-500'}
//                             `}
//                             onDragOver={handleCsvDragOver}
//                             onDragLeave={handleCsvDragLeave}
//                             onDrop={handleCsvDrop}
//                             onClick={() => document.getElementById('csv-upload').click()}
//                         >
//                             <label className="text-lg font-semibold">CSV / Excel</label>
//                             <label className="bg-blue-100 text-blue-700 px-4 py-2 rounded cursor-pointer hover:bg-blue-200 transition">
//                                 Choose File
//                                 <input
//                                     id="csv-upload"
//                                     type="file"
//                                     accept=".csv,.xls,.xlsx"
//                                     onChange={handleCsvChange}
//                                     className="hidden"
//                                 />
//                             </label>
//                             <p className="text-gray-500 text-sm">Drag & drop file here</p>
//                             {csvFile && <p className="text-sm text-center text-gray-600">{csvFile.name}</p>}
//                         </div>

//                         {/* Image Upload Box */}
//                         <div
//                             className={`flex-1 flex flex-col justify-center items-center gap-4 border-2 border-dashed rounded-lg p-6 transition h-54 cursor-pointer
//                                 ${imgDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-500'}
//                             `}
//                             onDragOver={handleImgDragOver}
//                             onDragLeave={handleImgDragLeave}
//                             onDrop={handleImgDrop}
//                             onClick={() => document.getElementById('img-upload').click()}
//                         >
//                             <label className="text-lg font-semibold">Image (png, jpg, jpeg, heic)</label>
//                             <label className="bg-blue-100 text-blue-700 px-4 py-2 rounded cursor-pointer hover:bg-blue-200 transition">
//                                 Choose File
//                                 <input
//                                     id="img-upload"
//                                     type="file"
//                                     accept=".png,.jpg,.jpeg,.heic"
//                                     onChange={handleImageChange}
//                                     className="hidden"
//                                 />
//                             </label>
//                             <p className="text-gray-500 text-sm">Drag & drop file here</p>
//                             {imageFile && <p className="text-sm text-center text-gray-600">{imageFile.name}</p>}
//                         </div>
//                     </div>
//                 </div>

//                 {/* Submit Button */}
//                 <div className="z-10 mt-8">
//                     <button
//                         className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition w-80 "
//                         onClick={handleSubmit}
//                         >
//                         Submit
//                     </button>

//                 </div>
//             </div>
//         </>
//     );
// }

// export default Upload; 

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { UploadCloud, Image as ImageIcon, FileSpreadsheet } from 'lucide-react';

// export default function Upload() {
//   const [csvFile, setCsvFile] = useState(null);
//   const [imageFile, setImageFile] = useState(null);
//   const [userType, setUserType] = useState('merit');
//   const [csvDragActive, setCsvDragActive] = useState(false);
//   const [imgDragActive, setImgDragActive] = useState(false);

//   const navigate = useNavigate();

//   const handleSubmit = () => {
//     if (!csvFile || !imageFile) {
//       alert('Please upload both files.');
//       return;
//     }
//     navigate('/editor', {
//       state: { csvFile, imageFile, userType }
//     });
//   };

//   const handleCsvChange = (e) => {
//     const file = e.target.files[0];
//     if (file && /\.(csv|xls|xlsx)$/i.test(file.name)) {
//       setCsvFile(file);
//     } else {
//       alert('Upload a valid CSV or Excel file');
//     }
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file && /\.(png|jpe?g|heic)$/i.test(file.name)) {
//       setImageFile(file);
//     } else {
//       alert('Upload a valid image file');
//     }
//   };

//   const handleCsvDragOver = (e) => {
//     e.preventDefault();
//     setCsvDragActive(true);
//   };

//   const handleCsvDragLeave = (e) => {
//     e.preventDefault();
//     setCsvDragActive(false);
//   };

//   const handleCsvDrop = (e) => {
//     e.preventDefault();
//     setCsvDragActive(false);
//     const file = e.dataTransfer.files[0];
//     if (file && /\.(csv|xls|xlsx)$/i.test(file.name)) {
//       setCsvFile(file);
//     } else {
//       alert('Upload a valid CSV or Excel file');
//     }
//   };

//   const handleImgDragOver = (e) => {
//     e.preventDefault();
//     setImgDragActive(true);
//   };

//   const handleImgDragLeave = (e) => {
//     e.preventDefault();
//     setImgDragActive(false);
//   };

//   const handleImgDrop = (e) => {
//     e.preventDefault();
//     setImgDragActive(false);
//     const file = e.dataTransfer.files[0];
//     if (file && /\.(png|jpe?g|heic)$/i.test(file.name)) {
//       setImageFile(file);
//     } else {
//       alert('Upload a valid image file');
//     }
//   };

//   const renderUploadBox = (label, accept, file, onChange, onDragOver, onDragLeave, onDrop, inputId, active, Icon) => (
//     <motion.div
//       whileHover={{ scale: 1.03 }}
//       whileTap={{ scale: 0.97 }}
//       className={`flex flex-col justify-center items-center text-center gap-4 border-2 border-dashed rounded-xl p-10 transition h-64 cursor-pointer bg-white shadow-md w-full md:w-1/2 ${active ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'}`}
//       onDragOver={onDragOver}
//       onDragLeave={onDragLeave}
//       onDrop={onDrop}
//       onClick={() => document.getElementById(inputId).click()}
//     >
//       <Icon className="w-10 h-10 text-blue-500 animate-pulse" />
//       <p className="text-lg font-semibold text-gray-800">{label}</p>
//       <p className="text-gray-500 text-sm">Click or drag file to this area to upload</p>
//       <input
//         id={inputId}
//         type="file"
//         accept={accept}
//         onChange={onChange}
//         className="hidden"
//       />
//       {file && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-center text-gray-600 mt-2">{file.name}</motion.p>}
//     </motion.div>
//   );

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-sky-900 to-sky-700 relative p-6">
//       <motion.div
//         initial={{ opacity: 0, y: -30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 1 }}
//         className="z-10 text-center w-full max-w-7xl"
//       >
//         <h1 className="text-white text-4xl md:text-5xl font-bold uppercase tracking-wide drop-shadow-xl mb-10 ">Certificate Generator</h1>

        

//         <div className="flex flex-col md:flex-row justify-between items-start w-full gap-10 mb-10">
//           {renderUploadBox(
//             'Upload Excel Spreadsheet',
//             '.csv,.xls,.xlsx',
//             csvFile,
//             handleCsvChange,
//             handleCsvDragOver,
//             handleCsvDragLeave,
//             handleCsvDrop,
//             'csv-upload',
//             csvDragActive,
//             FileSpreadsheet
//           )}

//           {renderUploadBox(
//             'Upload Certificate Template',
//             '.png,.jpg,.jpeg,.heic',
//             imageFile,
//             handleImageChange,
//             handleImgDragOver,
//             handleImgDragLeave,
//             handleImgDrop,
//             'img-upload',
//             imgDragActive,
//             ImageIcon
//           )}
//         </div>

//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.3 }}
//           className="bg-white text-blue-900 p-6 rounded-xl shadow-lg text-left w-full max-w-5xl"
//         >
//           <ul className="list-disc ml-5 space-y-2 text-sm">
//             <li>Ensure your Excel file has columns for each certificate field (e.g., Name, Date, Course).</li>
//             <li>Design template should have blank space for text placement.</li>
//             <li>Use high-resolution templates (at least 1500px wide).</li>
//             <li>Include an email column to send certificates automatically.</li>
//           </ul>
//         </motion.div>

//         <motion.div className="mt-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             onClick={handleSubmit}
//             className="bg-blue-600 text-white px-8 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition w-80 flex items-center justify-center gap-2 text-lg font-medium"
//           >
//             <UploadCloud className="w-5 h-5" /> Submit
//           </motion.button>
//         </motion.div>
//       </motion.div>
//     </div>
//   );
// }

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { UploadCloud, Image as ImageIcon, FileSpreadsheet, Cloud } from 'lucide-react';

export default function Upload() {
  const [csvFile, setCsvFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [userType, setUserType] = useState('merit');
  const [csvDragActive, setCsvDragActive] = useState(false);
  const [imgDragActive, setImgDragActive] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!csvFile || !imageFile) {
      alert('Please upload both files.');
      return;
    }
    navigate('/editor', {
      state: { csvFile, imageFile, userType }
    });
  };

  const handleCsvChange = (e) => {
    const file = e.target.files[0];
    if (file && /\.(csv|xls|xlsx)$/i.test(file.name)) {
      setCsvFile(file);
    } else {
      alert('Upload a valid CSV or Excel file');
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && /\.(png|jpe?g|heic)$/i.test(file.name)) {
      setImageFile(file);
    } else {
      alert('Upload a valid image file');
    }
  };

  const handleCsvDragOver = (e) => {
    e.preventDefault();
    setCsvDragActive(true);
  };

  const handleCsvDragLeave = (e) => {
    e.preventDefault();
    setCsvDragActive(false);
  };

  const handleCsvDrop = (e) => {
    e.preventDefault();
    setCsvDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file && /\.(csv|xls|xlsx)$/i.test(file.name)) {
      setCsvFile(file);
    } else {
      alert('Upload a valid CSV or Excel file');
    }
  };

  const handleImgDragOver = (e) => {
    e.preventDefault();
    setImgDragActive(true);
  };

  const handleImgDragLeave = (e) => {
    e.preventDefault();
    setImgDragActive(false);
  };

  const handleImgDrop = (e) => {
    e.preventDefault();
    setImgDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file && /\.(png|jpe?g|heic)$/i.test(file.name)) {
      setImageFile(file);
    } else {
      alert('Upload a valid image file');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-700  to-sky-100 p-6 ">
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        className="bg-white rounded-[30px] shadow-2xl p-10 h-190 max-w-xl w-full flex flex-col items-center text-center gap-8 mx-4"
      >
        {/* Cloud Icon Header */}
        <div className="text-sky-500 flex justify-center mb-6">
          <Cloud className="w-12 h-12" />
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-bold text-gray-800 mb-3">Upload Files</h1>
        <p className="text-gray-600 text-sm mb-8">
          To generate your certificates, please upload your CSV/Excel file and an image template.
        </p>

        {/* CSV Upload */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`flex flex-col justify-center items-center text-center gap-2 border-2 border-dashed rounded-xl px-6 py-8 transition h-48 cursor-pointer bg-white shadow-sm w-2/3 mb-6 ${
            csvDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'
          }`}
          onDragOver={handleCsvDragOver}
          onDragLeave={handleCsvDragLeave}
          onDrop={handleCsvDrop}
          onClick={() => document.getElementById('csv-upload').click()}
        >
          <FileSpreadsheet className="w-8 h-8 text-blue-500" />
          <p className="font-medium text-gray-800">Upload CSV/Excel</p>
          <p className="text-xs text-gray-500">Click or drag file to this area to upload</p>
          <input
            id="csv-upload"
            type="file"
            accept=".csv,.xls,.xlsx"
            onChange={handleCsvChange}
            className="hidden"
          />
          {csvFile && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-gray-600 mt-2"
            >
              {csvFile.name}
            </motion.p>
          )}
        </motion.div>

        {/* Image Upload */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`flex flex-col justify-center items-center text-center gap-2 border-2 border-dashed rounded-xl px-6 py-8 transition h-48 cursor-pointer bg-white shadow-sm w-2/3 ${
            imgDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'
          }`}
          onDragOver={handleImgDragOver}
          onDragLeave={handleImgDragLeave}
          onDrop={handleImgDrop}
          onClick={() => document.getElementById('img-upload').click()}
        >
          <ImageIcon className="w-8 h-8 text-blue-500" />
          <p className="font-medium text-gray-800">Upload Certificate Image</p>
          <p className="text-xs text-gray-500">Click or drag file to this area to upload</p>
          <input
            id="img-upload"
            type="file"
            accept=".png,.jpg,.jpeg,.heic"
            onChange={handleImageChange}
            className="hidden"
          />
          {imageFile && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-gray-600 mt-2"
            >
              {imageFile.name}
            </motion.p>
          )}
        </motion.div>

        {/* Submit Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSubmit}
          className="mt-8 bg-gradient-to-r from-sky-500 to-sky-700 hover:from-sky-600 hover:to-sky-800 text-white px-8 py-3 rounded-xl shadow-xl w-1/3 rounded flex items-center justify-center gap-2 text-base font-semibold"
        >
          <UploadCloud className="w-5 h-5" />
          Submit
        </motion.button>
      </motion.div>
    </div>
  );
}



