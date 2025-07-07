// import React from 'react';
// import { motion } from 'framer-motion';
// import { UserRoundPlus, FileText } from 'lucide-react';

// const certificates = [
//   { name: 'Alex Johnson' },
//   { name: 'Priya Sharma' },
//   { name: 'Michael Chen' },
//   { name: 'Sara Müller' },
//   { name: "Liam O'Brien" },
//   { name: 'Ava Dubois' },
// ];

// const CertificatePreview = () => {
//   return (
//     <div className="min-h-screen bg-gradient-to-b from-[#e8f0ff] to-[#d6e3ff] py-10 px-4">
//       <motion.h1 
//         initial={{ opacity: 0, y: -20 }} 
//         animate={{ opacity: 1, y: 0 }} 
//         transition={{ duration: 0.5 }}
//         className="text-3xl font-bold text-center text-indigo-800 flex items-center justify-center gap-2"
//       >
//         <UserRoundPlus className="w-7 h-7 text-indigo-700" /> Certificate Preview
//       </motion.h1>
//       <p className="text-center text-gray-600 mt-2">Review the generated certificates before final submission.</p>

//       <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
//         {certificates.map((cert, index) => (
//           <motion.div 
//             key={index} 
//             initial={{ opacity: 0, scale: 0.9 }} 
//             animate={{ opacity: 1, scale: 1 }} 
//             transition={{ duration: 0.3, delay: index * 0.1 }}
//             className="bg-white rounded-xl shadow-md overflow-hidden border border-indigo-100"
//           >
//             <div className="relative bg-gradient-to-r from-indigo-100 to-blue-100 h-44 flex items-center justify-center">
//               <FileText className="w-12 h-12 text-indigo-500" />
//               <div className="absolute top-2 right-2 p-1 rounded-full bg-white shadow-md">
//                 <UserRoundPlus className="w-5 h-5 text-indigo-500" />
//               </div>
//             </div>
//             <div className="p-4 text-center">
//               <h3 className="font-semibold text-gray-800 text-lg">{cert.name}</h3>
//               <p className="text-sm text-gray-500">Certificate of Completion</p>
//             </div>
//           </motion.div>
//         ))}
//       </div>

//       <div className="flex justify-center gap-6 mt-12 p-4">
//         <button className="flex items-center gap-2 bg-white border border-indigo-500 text-indigo-600 font-medium px-6 py-2 rounded-lg shadow hover:bg-indigo-50 transition">
//           <UserRoundPlus className="w-5 h-5" /> Edit Design
//         </button>
//         <button className="flex items-center gap-2 bg-indigo-600 text-white font-medium px-6 py-2 rounded-lg shadow hover:bg-indigo-700 transition">
//           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
//             <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
//           </svg>
//           Submit Certificates
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CertificatePreview;

// import React, { useEffect, useState } from 'react';
// import { motion } from 'framer-motion';
// import { useNavigate } from 'react-router-dom';
// import { UserRoundPlus } from 'lucide-react';
// import axios from 'axios';

// const certificates = [
//   { name: 'Alex Johnson' },
//   { name: 'Priya Sharma' },
//   { name: 'Michael Chen' },
//   { name: 'Sara Müller' },
//   { name: "Liam O'Brien" },
//   { name: 'Ava Dubois' },
// ];


// const CertificatePreview = () => {
//   const [certificates, setCertificates] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();


//   const handleEdit = () => {
//     navigate('/editor');
//   };

//   const handleSubmit = () => {
//     // Submit logic here
//     alert('Certificates submitted successfully!');
//   };

//   if (loading) return <p className="text-center text-gray-700">Loading certificates...</p>;

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-sky-100 to-sky-300 py-10 px-4">
//       <motion.h1 
//         initial={{ opacity: 0, y: -20 }} 
//         animate={{ opacity: 1, y: 0 }} 
//         transition={{ duration: 0.5 }}
//         className="text-3xl font-bold text-center text-sky-900 flex items-center justify-center gap-2"
//       >
//         <UserRoundPlus className="w-7 h-7 text-sky-800" /> Certificate Preview
//       </motion.h1>
//       <p className="text-center text-sky-700 mt-2">Review the generated certificates before final submission.</p>

//       <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
//         {certificates.map((cert, index) => (
//           <motion.div 
//             key={index} 
//             initial={{ opacity: 0, scale: 0.9 }} 
//             whileInView={{ opacity: 1, scale: 1 }} 
//             transition={{ duration: 0.4, delay: index * 0.1 }}
//             className="bg-white rounded-2xl shadow-lg overflow-hidden border border-sky-200 hover:shadow-xl transition duration-300"
//           >
//             <div className="h-52 bg-white">
//               <img 
//                 src={cert.imageUrl} 
//                 alt={`Certificate for ${cert.name}`} 
//                 className="w-full h-full object-cover"
//               />
//             </div>
//             <div className="p-4 text-center">
//               <h3 className="font-semibold text-sky-800 text-lg">{cert.name}</h3>
//               <p className="text-sm text-sky-600">Certificate of Completion</p>
//             </div>
//           </motion.div>
//         ))}
//       </div>

//       <div className="flex justify-center gap-6 mt-12">
//         <button
//           onClick={handleEdit}
//           className="flex items-center gap-2 bg-white border border-sky-500 text-sky-600 font-medium px-6 py-2 rounded-lg shadow hover:bg-sky-100 transition"
//         >
//           <UserRoundPlus className="w-5 h-5" /> Edit Design
//         </button>
//         <button
//           onClick={handleSubmit}
//           className="flex items-center gap-2 bg-sky-600 text-white font-medium px-6 py-2 rounded-lg shadow hover:bg-sky-700 transition"
//         >
//           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
//             <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
//           </svg>
//           Submit Certificates
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CertificatePreview;

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { UserRoundPlus } from 'lucide-react';

const demoData = [
  {
    name: 'Alex Johnson',
    imageUrl: 'https://via.placeholder.com/600x300?text=Alex+Johnson+Certificate'
  },
  {
    name: 'Priya Sharma',
    imageUrl: 'https://via.placeholder.com/600x300?text=Priya+Sharma+Certificate'
  },
  {
    name: 'Michael Chen',
    imageUrl: 'https://via.placeholder.com/600x300?text=Michael+Chen+Certificate'
  },
  {
    name: 'Sara Müller',
    imageUrl: 'https://via.placeholder.com/600x300?text=Sara+Muller+Certificate'
  },
  {
    name: "Liam O'Brien",
    imageUrl: 'https://via.placeholder.com/600x300?text=Liam+OBrien+Certificate'
  },
  {
    name: 'Ava Dubois',
    imageUrl: 'https://via.placeholder.com/600x300?text=Ava+Dubois+Certificate'
  }
];

// // Function to handle the submission of coordinates
//   const handleSubmitCoords = async () => {
//     setLoading(true);
//     try {
//       const formData = new FormData();
//       formData.append('imagefile', imageFile);
//       formData.append('csvfile', csvFile);
//       formData.append('userType', 'merit');
//       formData.append(
//         'coords',
//         JSON.stringify(
//           droppedVariables.map(({ name, x, y, color, fontSize }) => ({
//             title: name,
//             x: (x / imageRef.current.offsetWidth) * 100, // percentage of width
//             y: (y / imageRef.current.offsetHeight) * 100, // percentage of height
//             font_color: color,
//             font_size: (parseInt(fontSize) / imageRef.current.offsetHeight) * 100, // font size as % of height
//           }))
//         )
//       );
//       const response = await fetch('http://localhost:8000/api/upload/', {
//         method: 'POST',
//         body: formData,
//       });

//       const text = await response.text();
//       setLoading(false);
//       if (response.ok) {
//         // handle success (e.g., show a message or redirect)
        
//       } else {
//         alert(text || "Failed to send coordinates. Please try again.");
//       }
//     } catch (error) {
//       setLoading(false);
//       alert('Error: ' + error.message);
//     }
//   };


const CertificatePreview = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate fetch from backend with demo data
    setTimeout(() => {
      setCertificates(demoData);
      setLoading(false);
    }, 1000);
  }, []);

  const handleEdit = () => {
    navigate('/editor');
  };

  const handleSubmit = () => {
    alert('Certificates submitted successfully!');
  };

  if (loading) return <p className="text-center text-gray-700">Loading certificates...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 to-sky-300 py-10 px-4">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold text-center text-sky-900 flex items-center justify-center gap-2"
      >
        <UserRoundPlus className="w-7 h-7 text-sky-800" /> Certificate Preview
      </motion.h1>
      <p className="text-center text-sky-700 mt-2">Review the generated certificates before final submission.</p>

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {certificates.map((cert, index) => (
          <motion.div 
            key={index} 
            initial={{ opacity: 0, scale: 0.9 }} 
            whileInView={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden border border-sky-200 hover:shadow-xl transition duration-300"
          >
            <div className="h-52 bg-white">
              <img 
                src={cert.imageUrl} 
                alt={`Certificate for ${cert.name}`} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4 text-center">
              <h3 className="font-semibold text-sky-800 text-lg">{cert.name}</h3>
              <p className="text-sm text-sky-600">Certificate of Completion</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-center gap-6 mt-12 p-4">
        <button
          onClick={handleEdit}
          className=" flex items-center gap-2 bg-white border border-sky-500 text-sky-600 font-medium px-6 py-2 rounded-lg shadow hover:bg-sky-100 transition"
        >
          <UserRoundPlus className="w-5 h-5" /> Edit Design
        </button>
        <button
          onClick={handleSubmit}
          className="flex items-center gap-2 bg-sky-600 text-white font-medium px-6 py-2 rounded-lg shadow hover:bg-sky-700 transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
          Submit Certificates
        </button>
      </div>
    </div>
  );
};

export default CertificatePreview;