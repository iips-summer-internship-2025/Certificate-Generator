// import React, { useState } from 'react';

// function Upload() {
//     const [csvFile, setCsvFile] = useState(null);
//     const [imageFile, setImageFile] = useState(null);
//     const [userType, setUserType] = useState('merit');
//     const [csvDragActive, setCsvDragActive] = useState(false);
//     const [imgDragActive, setImgDragActive] = useState(false);

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
      

//       const handleSubmit = async () => {
//         if (!csvFile || !imageFile) {
//           alert('Please upload both files.');
//           return;
//         }
      
//         const formData = new FormData();
//         formData.append('csvfile', csvFile);
//         formData.append('imagefile', imageFile);
//         formData.append('userType', userType);
      
//         try {
//           const response = await fetch('http://localhost:8000/api/upload/', {
//             method: 'POST',
//             credentials: 'include',
//             headers: {
//               'X-CSRFToken': getCookie('csrftoken'),
//             },
//             body: formData,
//           });
      
//           if (response.ok) {
//             const data = await response.json();
//             alert('Upload successful!');
//             console.log('Response:', data);
//             setCsvFile(null);
//             setImageFile(null);
//           } else {
//             const err = await response.text();
//             alert('Upload failed: ' + err);
//           }
//         } catch (error) {
//           alert('Error uploading files: ' + error.message);
//         }
//       };
      
  
//     return (
//         <>
//             <div className="min-h-screen flex flex-col items-center justify-center bg-black relative p-6">
//                 <img src="../bg-upload.jpg" alt="Background" className="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-60" />
//                 <h1 className="text-white text-4xl md:text-5xl font-bold uppercase ">Upload your Files Here</h1>
//                 {/* Header */}
//                 <div className="z-10 text-center mt-8">
//                     <div className='mb-4 mt-4 gap-5 rounded-lg p-4 '>
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
//                             className={`flex-1 flex flex-col justify-center items-center gap-4 border-2 border-dashed rounded-lg p-6 transition h-48 cursor-pointer
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
//                             className={`flex-1 flex flex-col justify-center items-center gap-4 border-2 border-dashed rounded-lg p-6 transition h-48 cursor-pointer
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
//                 <button
//   className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition w-80 "
//   onClick={handleSubmit}
// >
//   Submit
// </button>

//                 </div>
//             </div>
//         </>
//     );
// }

// export default Upload;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Upload() {
    const [csvFile, setCsvFile] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [userType, setUserType] = useState('merit');
    const [csvDragActive, setCsvDragActive] = useState(false);
    const [imgDragActive, setImgDragActive] = useState(false);


    // Handle submit 
    const navigate = useNavigate();

    const handleSubmit = () => {

         if (!csvFile || !imageFile) {
          alert('Please upload both files.');
          return;
        }
      
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

    // Drag and drop handlers for CSV
    const handleCsvDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setCsvDragActive(true);
    };

    const handleCsvDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setCsvDragActive(false);
    };


    const handleCsvDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setCsvDragActive(false);
        const file = e.dataTransfer.files[0];
        if (file && /\.(csv|xls|xlsx)$/i.test(file.name)) {
            setCsvFile(file);
        } else {
            alert('Upload a valid CSV or Excel file');
        }
    };

    // Drag and drop handlers for Image
    const handleImgDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setImgDragActive(true);
    };
    const handleImgDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setImgDragActive(false);
    };
    const handleImgDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setImgDragActive(false);
        const file = e.dataTransfer.files[0];
        if (file && /\.(png|jpe?g|heic)$/i.test(file.name)) {
            setImageFile(file);
        } else {
            alert('Upload a valid image file');
        }
    };

    // Inside your Upload component

    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
          const cookies = document.cookie.split(';');
          for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
            }
          }
        }
        return cookieValue;
      }
      
  
    return (
        <>
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 relative p-6">
                {/* <img src="../bg-upload.jpg" alt="Background" className="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-60" /> */}
                <h1 className="text-white text-4xl md:text-5xl font-bold uppercase ">Upload your Files Here</h1>
                {/* Header */}
                <div className="z-10 text-center mt-8">
                    <div className='mb-4 mt-4 gap-5 rounded-lg p-4'>
                        <p className="text-white text-2xl mb-2 pb-2">Select the category</p>
                        {/* Radio Buttons */}
                        <div className="flex gap-6 justify-center mb-4 text-white">
                            <label className="inline-flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="type"
                                    value="merit"
                                    checked={userType === 'merit'}
                                    onChange={() => setUserType('merit')}
                                    className="accent-blue-500 "
                                />
                                <span className='text-lg'>Merit</span>
                            </label>
                            <label className="inline-flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="type"
                                    value="participant"
                                    checked={userType === 'participant'}
                                    onChange={() => setUserType('participant')}
                                    className="accent-blue-500 "
                                />
                                <span className='text-lg'> Participant</span>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Upload Card */}
                <div className="z-10 bg-white text-black p-10 rounded-xl shadow-lg w-full max-w-4xl">
                    <div className="flex flex-col md:flex-row justify-between ">
                        {/* CSV Upload Box */}
                        <div
                            className={`flex-1 flex flex-col justify-center items-center gap-4 border-2 border-dashed rounded-lg p-6 transition h-54 cursor-pointer
                                ${csvDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-500'}
                            `}
                            onDragOver={handleCsvDragOver}
                            onDragLeave={handleCsvDragLeave}
                            onDrop={handleCsvDrop}
                            // onClick={() => document.getElementById('csv-upload').click()}
                        >
                            <label className="text-lg font-semibold">CSV / Excel</label>
                            <label className="bg-blue-100 text-blue-700 px-4 py-2 rounded cursor-pointer hover:bg-blue-200 transition">
                                Choose File
                                <input
                                    id="csv-upload"
                                    type="file"
                                    accept=".csv,.xls,.xlsx"
                                    onChange={handleCsvChange}
                                    className="hidden"
                                />
                            </label>
                            <p className="text-gray-500 text-sm">Drag & drop file here</p>
                            {csvFile && <p className="text-sm text-center text-gray-600">{csvFile.name}</p>}
                        </div>

                        {/* Image Upload Box */}
                        <div
                            className={`flex-1 flex flex-col justify-center items-center gap-4 border-2 border-dashed rounded-lg p-6 transition h-54 cursor-pointer
                                ${imgDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-500'}
                            `}
                            onDragOver={handleImgDragOver}
                            onDragLeave={handleImgDragLeave}
                            onDrop={handleImgDrop}
                            onClick={() => document.getElementById('img-upload').click()}
                        >
                            <label className="text-lg font-semibold">Image (png, jpg, jpeg, heic)</label>
                            <label className="bg-blue-100 text-blue-700 px-4 py-2 rounded cursor-pointer hover:bg-blue-200 transition">
                                Choose File
                                <input
                                    id="img-upload"
                                    type="file"
                                    accept=".png,.jpg,.jpeg,.heic"
                                    onChange={handleImageChange}
                                    className="hidden"
                                />
                            </label>
                            <p className="text-gray-500 text-sm">Drag & drop file here</p>
                            {imageFile && <p className="text-sm text-center text-gray-600">{imageFile.name}</p>}
                        </div>
                    </div>
                </div>

                {/* Submit Button */}
                <div className="z-10 mt-8">
                    <button
                        className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition w-80 "
                        onClick={handleSubmit}
                        >
                        Submit
                    </button>

                </div>
            </div>
        </>
    );
}

export default Upload; 