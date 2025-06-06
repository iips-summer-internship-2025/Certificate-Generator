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


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { UploadCloud, Image as ImageIcon, FileSpreadsheet, Cloud } from 'lucide-react';
import Papa from 'papaparse'; // <-- Added for CSV parsing

export default function Upload() {
  const [csvFile, setCsvFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [userType, setUserType] = useState('merit');
  const [csvDragActive, setCsvDragActive] = useState(false);
  const [imgDragActive, setImgDragActive] = useState(false);

  const navigate = useNavigate();
  // for testing purpose without backend

  const handleSubmit = () => {

    if (!csvFile || !imageFile) {
      alert('Please upload both files.');
      return;
    }
    console.log(csvFile, imageFile);
    Papa.parse(csvFile, {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const rows = results.data;
        // Check if any row has empty name or email
        const hasEmpty = rows.some(
          (row) =>
            !row.name || row.name.toString().trim() === '' ||
            !row.email || row.email.toString().trim() === ''
        );
        if (hasEmpty) {
          alert('CSV contains empty "name" or "email" fields. Please reupload a valid file.');
          navigate("/upload");
          return;
        }

      },
      error: function () {
        alert('Failed to parse the CSV file.');
      }
    });
      const formData = new FormData();
      formData.append('csvfile', csvFile);
      formData.append('imagefile', imageFile);
      formData.append('userType', userType);


      navigate("/editor", {
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

    // Inside your Upload component

    // function getCookie(name) {
    //   let cookieValue = null;
    //   if (document.cookie && document.cookie !== '') {
    //     const cookies = document.cookie.split(';');
    //     for (let i = 0; i < cookies.length; i++) {
    //       const cookie = cookies[i].trim();
    //       // Does this cookie string begin with the name we want?
    //       if (cookie.substring(0, name.length + 1) === (name + '=')) {
    //         cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
    //         break;
    //       }
    //     }
    //   }
    //   return cookieValue;
    // }


    // const handleSubmit = async () => {
    //   if (!csvFile || !imageFile) {
    //     alert('Please upload both files.');
    //     return;
    //   }

    //   const formData = new FormData();
    //   formData.append('csvfile', csvFile);
    //   formData.append('imagefile', imageFile);
    //   formData.append('userType', userType);

    //   try {
    //     const response = await fetch('http://localhost:8000/api/upload/', {
    //       method: 'POST',
    //       credentials: 'include',
    //       headers: {
    //         'X-CSRFToken': getCookie('csrftoken'),
    //       },
    //       body: formData,
    //     });

    //     if (response.ok) {
    //       const data = await response.json();
    //       alert('Upload successful!');
    //       //added route to editor page
    //       navigate("/editor", {
    //       state: { csvFile, imageFile, userType }
    //       });
    //       console.log('Response:', data);
    //       setCsvFile(null);
    //       setImageFile(null);
    //     } else {
    //       const err = await response.text();
    //       alert('Upload failed: ' + err);
    //     }
    //   } catch (error) {
    //     alert('Error uploading files: ' + error.message);
    //   }
    // };

    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-700 to-sky-100 p-6" >
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="bg-white rounded-[30px] shadow-2xl p-10 max-w-6xl w-full flex flex-col items-center text-center gap-8 mx-4 my-4 aspect-[16/9] justify-center"
        >
          {/* Cloud Icon Header */}
          <div className="text-sky-500 flex justify-center m-1">
            <Cloud className="w-12 h-12" />
          </div>

          {/* Heading */}
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Upload Files</h1>
          <p className="text-gray-600 text-sm mb-2">
            To generate your certificates, please upload your CSV/Excel file and an image template.
          </p>

          {/* CSV and Image Upload in a Row */}
          <div className="flex flex-col md:flex-row w-full gap-8 justify-center p-4 items-center">
            {/* CSV Upload */}
            <motion.div
              whileHover={{ scale: 0.98 }}
              whileTap={{ scale: 0.98 }}
              className={`flex flex-col justify-center items-center text-center gap-2 border-2 border-dashed rounded-xl px-6 py-8 transition h-48 cursor-pointer bg-white shadow-sm w-full md:w-1/2 ${csvDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'
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
              whileHover={{ scale: 0.98 }}
              whileTap={{ scale: 0.98 }}
              className={`flex flex-col justify-center items-center text-center gap-2 border-2 border-dashed rounded-xl px-6 py-8 transition h-48 cursor-pointer bg-white shadow-sm w-full md:w-1/2 ${imgDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'
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
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSubmit}
            className="mt-8 bg-gradient-to-r from-sky-500 to-sky-700 hover:from-sky-600 hover:to-sky-800 text-white px-8 py-3 rounded-xl shadow-xl w-1/3 flex items-center justify-center gap-2 text-base font-semibold"
          >
            <UploadCloud className="w-5 h-5" />
            Submit
          </motion.button>

          {/* Info Section Below Submit */}
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4 text-left w-full">
            <h2 className="text-lg font-semibold text-blue-700 mb-2">How to upload & accepted file types</h2>
            <ul className="list-disc ml-6 text-blue-900 text-sm space-y-1">
              <li>Accepted spreadsheet formats: <span className="font-semibold">.csv, .xls, .xlsx</span></li>
              <li>Accepted image formats: <span className="font-semibold">.png, .jpg, .jpeg, .heic</span></li>
              <li>Click or drag your files into the respective boxes above.</li>
              <li>Ensure your Excel/CSV file has columns for each certificate field (e.g., Name, Date, Course).</li>
              <li>Use a high-resolution image template (at least 1500px wide) for best results.</li>
              <li>Include an <span className="font-semibold">email</span> column in Excel/CSV file to send certificates automatically.</li>
            </ul>
          </div>
        </motion.div>
      </div >
    );
  }




