// import { useState } from 'react';
// import axios from 'axios';

// const CertificateSearch = () => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [searchResults, setSearchResults] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [previewUrl, setPreviewUrl] = useState(null);

//   const handleSearch = async (e) => {
//     e.preventDefault();
//     if (!searchQuery.trim()) {
//       setError('Please enter a search term');
//       return;
//     }

//     setLoading(true);
//     setError(null);

//     try {
//       const response = await axios.get(
//         'https://certificate-generator-production-ff36.up.railway.app/api/search/',
//         // 'http://127.0.0.1:8000/api/search/',
//         {
//           params: { q: searchQuery },
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         }
//       );
//       setSearchResults(response.data.results || []);
//     } catch (err) {
//       setError(err.response?.data?.error || 'Failed to search certificates');
//       setSearchResults([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const openPreview = (url) => {
//     setPreviewUrl(url);
//   };

//   const closePreview = () => {
//     setPreviewUrl(null);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-sky-900 to-white py-8 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-6xl mx-auto justify-center bg-white backdrop-blur-sm rounded-xl shadow-lg p-8">
//         {/* Header Section */}
//         <div className="text-center mb-10">
//           <h1 className="text-4xl font-bold text-sky-700 mb-3">Certificate Search</h1>
//           <p className="text-sky-700 text-lg">Find certificates by name or email address</p>
//         </div>

//         {/* Search Form */}
//         <form onSubmit={handleSearch} className="mb-10">
//           <div className="flex flex-col sm:flex-row gap-3">
//             <input
//               type="text"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               placeholder="Enter name or email"
//               className="flex-1 px-5 py-3 text-gray-800 bg-white border border-blue-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
//             />
//             <button
//               type="submit"
//               disabled={loading}
//               className="w-1/8 px-6 py-3 bg-blue-600 border-rounded hover:bg-blue-700 text-white font-medium rounded-lg shadow-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed text-lg"
//             >
//               {loading ? (
//                 <span className="flex items-center justify-center">
//                   <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                   </svg>
//                   Searching...
//                 </span>
//               ) : 'Search'}
//             </button>
//           </div>
//           {error && <p className="mt-2 text-sm text-red-300">{error}</p>}
//         </form>

//         {/* Certificate Preview Modal */}
//         {previewUrl && (
//           <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
//             <div className="bg-white rounded-xl max-w-5xl w-full max-h-[90vh] flex flex-col">
//               <div className="flex justify-between items-center p-4 border-b">
//                 <h2 className="text-xl font-semibold text-gray-800">Certificate Preview</h2>
//                 <button
//                   onClick={closePreview}
//                   className="p-2 rounded-full hover:bg-gray-100 transition-colors"
//                   aria-label="Close preview"
//                 >
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                   </svg>
//                 </button>
//               </div>
//               <div className="flex-1 p-4 overflow-auto">
//                 <img 
//                   src={previewUrl} 
//                   alt="Certificate Preview" 
//                   className="w-full h-auto max-h-[70vh] object-contain mx-auto"
//                   onError={(e) => {
//                     e.target.onerror = null;
//                     e.target.src = 'https://via.placeholder.com/800x600?text=Certificate+Not+Available';
//                   }}
//                 />
//               </div>
//               <div className="p-4 border-t flex justify-end">
//                 <button
//                   onClick={closePreview}
//                   className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
//                 >
//                   Close
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Results Section */}
//         {searchResults.length > 0 ? (
//           <div className="space-y-6">
//             <h2 className="text-2xl font-semibold text-white">Search Results</h2>
//             <div className="bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden shadow-xl">
//               <div className="overflow-x-auto">
//                 <table className="min-w-full divide-y divide-white/20">
//                   <thead className="bg-white/10">
//                     <tr>
//                       <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
//                         Name
//                       </th>
//                       {/* Hide Roll No and Email on medium/small screens */}
//                       <th scope="col" className="hidden md:table-cell px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
//                         Roll No
//                       </th>
//                       <th scope="col" className="hidden md:table-cell px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
//                         Email
//                       </th>
//                       <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
//                         Certificate ID
//                       </th>
//                       <th scope="col" className="px-6 py-4 text-right text-xs font-semibold text-white uppercase tracking-wider">
//                         Actions
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody className="divide-y divide-white/10">
//                     {searchResults.map((certificate) => (
//                       <tr key={certificate.certificate_id} className="hover:bg-white/5 transition-colors">
//                         <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
//                           {certificate.name}
//                         </td>
//                         {/* Hide Roll No and Email on medium/small screens */}
//                         <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm text-blue-100">
//                           {certificate.roll_no}
//                         </td>
//                         <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm text-blue-100">
//                           {certificate.email_id}
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-100">
//                           {certificate.certificate_id}
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-right space-x-2">
//                           {certificate.certificate && (
//                             <>
//                               <button
//                                 onClick={() => openPreview(certificate.certificate)}
//                                 className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm transition-colors text-sm"
//                               >
//                                 Preview
//                               </button>
//                               <button
//                                 onClick={async () => {
//                                   try {
//                                     const response = await fetch(certificate.certificate, { mode: 'cors' });
//                                     const blob = await response.blob();
//                                     const url = window.URL.createObjectURL(blob);
//                                     const link = document.createElement('a');
//                                     link.href = url;
//                                     link.download = `certificate_${certificate.certificate_id}.jpg`;
//                                     document.body.appendChild(link);
//                                     link.click();
//                                     document.body.removeChild(link);
//                                     window.URL.revokeObjectURL(url);
//                                   } catch (err) {
//                                     alert('Failed to download image.');
//                                   }
//                                 }}
//                                 className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-sm transition-colors text-sm"
//                               >
//                                 Download
//                               </button>
//                             </>
//                           )}
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         ): (
//           !loading && searchQuery && (
//             <div className="text-center py-12">
//               <div className="inline-block p-6 bg-white/10 rounded-xl backdrop-blur-sm">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-white/70 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                 </svg>
//                 <p className="text-xl text-white">No certificates found matching your search.</p>
//                 <p className="text-blue-100 mt-2">Try a different name or email address</p>
//               </div>
//             </div>
//           )
//         )}
//       </div>
//     </div>
//   );
// };

// export default CertificateSearch;

// import { useState, useEffect } from 'react';
// import {
//   Search, Download, Eye, Award, Users, Menu, X, Shield,
//   ChevronRight, Mail, Hash, User, Frown, Loader2, CheckCircle,
//   AlertCircle, ChevronDown, ChevronUp, Layers, BadgeCheck,
//   Bell, HelpCircle, Settings
// } from 'lucide-react';
// import { motion, AnimatePresence } from 'framer-motion';

// const CertificateSearch = () => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [searchResults, setSearchResults] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [previewUrl, setPreviewUrl] = useState(null);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [viewMode, setViewMode] = useState('table');

//   // Mock data for demonstration
//   useEffect(() => {
//     if (searchQuery && searchQuery.length > 2) {
//       setSearchResults([
//         {
//           certificate_id: 'CERT-2023-001',
//           name: 'Alex Johnson',
//           email_id: 'alex.johnson@example.com',
//           roll_no: 'STU-001',
//           certificate: 'https://images.unsplash.com/photo-1589330694653-ded6df03f754?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
//         },
//         {
//           certificate_id: 'CERT-2023-002',
//           name: 'Sarah Williams',
//           email_id: 'sarah.williams@example.com',
//           roll_no: 'STU-002',
//           certificate: 'https://images.unsplash.com/photo-1589330694653-ded6df03f754?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
//         },
//         {
//           certificate_id: 'CERT-2023-003',
//           name: 'Michael Brown',
//           email_id: 'michael.brown@example.com',
//           roll_no: 'STU-003',
//           certificate: 'https://images.unsplash.com/photo-1589330694653-ded6df03f754?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
//         }
//       ]);
//     }
//   }, [searchQuery]);

//   const handleSearch = async (e) => {
//     e.preventDefault();
//     if (!searchQuery.trim()) {
//       setError('Please enter a search term');
//       return;
//     }

//     setLoading(true);
//     setError(null);

//     try {
//       // Simulated loading delay
//       await new Promise(resolve => setTimeout(resolve, 1500));
//       // In a real app, you would fetch from your API here
//     } catch (err) {
//       setError(err.response?.data?.error || 'Failed to search certificates');
//       setSearchResults([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const openPreview = (url) => {
//     setPreviewUrl(url);
//   };

//   const closePreview = () => {
//     setPreviewUrl(null);
//   };

//   const downloadCertificate = async (certificate) => {
//     try {
//       const response = await fetch(certificate.certificate, { mode: 'cors' });
//       const blob = await response.blob();
//       const url = window.URL.createObjectURL(blob);
//       const link = document.createElement('a');
//       link.href = url;
//       link.download = `certificate_${certificate.certificate_id}.jpg`;
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//       window.URL.revokeObjectURL(url);
//     } catch (err) {
//       alert('Failed to download image.');
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-blue-200">

//       {/* Main Content */}
//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ">
//         {/* Enhanced Search Section */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.3, delay: 0.3 }}
//           className="bg-white rounded-2xl shadow-xl border border-black-200 mb-10 overflow-hidden"
//         >
//           <div className="p-8 mt-4">
//             <div className="flex flex-col items-center text-center mb-8">
//               <motion.div
//                 whileHover={{ scale: 1.05 }}
//                 className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center shadow-inner mb-4"
//               >
//                 <svg className="w-8 h-8 text-indigo-600 " viewBox="0 0 24 24" fill="none" stroke="currentColor">
//                   <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//                 </svg>
//               </motion.div>
//               <h2 className="text-2xl font-semibold text-gray-900 mb-2">Find Certificates</h2>
//               <p className="text-gray-500 max-w-md mb-4">
//                 Search by name, email, certificate ID or blockchain hash
//               </p>
//             </div>

//             <div className="flex flex-col sm:flex-row gap-4">
//               <div className="flex-1 relative">
//                 <div className="absolute right-4 inset-y-0 flex items-center pointer-events-none">
//                   <Search className="h-5 w-5 text-gray-400" />
//                 </div>
//                 <motion.input
//                   whileFocus={{ borderColor: "#6366f1" }}
//                   type="text"
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   onKeyDown={(e) => e.key === 'Enter' && handleSearch(e)}
//                   placeholder="Search certificates..."
//                   className="w-full mx-4 pr-28 pl-28 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 placeholder-gray-500 transition-all shadow-sm"
//                 />
//               </div>
//               <motion.button
//                 whileHover={{ scale: 1.03 }}
//                 whileTap={{ scale: 0.98 }}
//                 onClick={handleSearch}
//                 disabled={loading}
//                 className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:opacity-70 text-white font-medium rounded-xl shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed flex items-center justify-center"
//               >
//                 {loading ? (
//                   <>
//                     <Loader2 className="w-5 h-5 mr-2 animate-spin" />
//                     Searching...
//                   </>
//                 ) : (
//                   <>
//                     <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
//                       <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//                     </svg>
//                     Search
//                   </>
//                 )}
//               </motion.button>
//             </div>

//             {error && (
//               <motion.div
//                 initial={{ opacity: 0, y: -10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg"
//               >
//                 <div className="flex items-center">
//                   <div className="flex-shrink-0">
//                     <AlertCircle className="h-5 w-5 text-red-400" />
//                   </div>
//                   <div className="ml-3">
//                     <p className="text-sm text-red-800">{error}</p>
//                   </div>
//                 </div>
//               </motion.div>
//             )}
//           </div>
//         </motion.div>

//         {/* Results Section */}
//         <AnimatePresence>
//           {searchResults.length > 0 ? (
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.3 }}
//               className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden"
//             >
//               <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
//                 <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
//                   <div className="flex items-center space-x-3">
//                     <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
//                       <Layers className="w-5 h-5 text-green-600" />
//                     </div>
//                     <div>
//                       <h3 className="text-lg font-semibold text-gray-900">Search Results</h3>
//                       <p className="text-sm text-gray-500">
//                         {searchResults.length} {searchResults.length === 1 ? 'certificate' : 'certificates'} found
//                       </p>
//                     </div>
//                   </div>
//                   <div className="mt-4 sm:mt-0 flex items-center space-x-2">
//                     <span className="text-sm text-gray-500">View:</span>
//                     <div className="flex items-center bg-gray-100 rounded-lg p-1">
//                       <motion.button
//                         whileHover={{ scale: 1.05 }}
//                         whileTap={{ scale: 0.95 }}
//                         onClick={() => setViewMode('table')}
//                         className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${viewMode === 'table'
//                           ? 'bg-white text-gray-900 shadow-sm'
//                           : 'text-gray-600 hover:text-gray-900'
//                           }`}
//                       >
//                         Table
//                       </motion.button>
//                       <motion.button
//                         whileHover={{ scale: 1.05 }}
//                         whileTap={{ scale: 0.95 }}
//                         onClick={() => setViewMode('grid')}
//                         className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${viewMode === 'grid'
//                           ? 'bg-white text-gray-900 shadow-sm'
//                           : 'text-gray-600 hover:text-gray-900'
//                           }`}
//                       >
//                         Grid
//                       </motion.button>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {viewMode === 'table' ? (
//                 <div className="overflow-x-auto">
//                   <table className="min-w-full divide-y divide-gray-200">
//                     <thead className="bg-gray-50">
//                       <tr>
//                         <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                           <div className="flex items-center space-x-2">
//                             <User className="w-4 h-4" />
//                             <span>Candidate</span>
//                           </div>
//                         </th>
//                         <th scope="col" className="hidden lg:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                           <div className="flex items-center space-x-2">
//                             <Hash className="w-4 h-4" />
//                             <span>Roll Number</span>
//                           </div>
//                         </th>
//                         <th scope="col" className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                           <div className="flex items-center space-x-2">
//                             <Mail className="w-4 h-4" />
//                             <span>Email</span>
//                           </div>
//                         </th>
//                         <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                           <div className="flex items-center space-x-2">
//                             <Award className="w-4 h-4" />
//                             <span>Certificate</span>
//                           </div>
//                         </th>
//                         <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                           Actions
//                         </th>
//                       </tr>
//                     </thead>
//                     <tbody className="bg-white divide-y divide-gray-200">
//                       {searchResults.map((certificate) => (
//                         <motion.tr
//                           key={certificate.certificate_id}
//                           initial={{ opacity: 0 }}
//                           animate={{ opacity: 1 }}
//                           transition={{ duration: 0.3 }}
//                           className="hover:bg-gray-50 transition-colors"
//                         >
//                           <td className="px-6 py-4 whitespace-nowrap">
//                             <div className="flex items-center">
//                               <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
//                                 <User className="w-5 h-5 text-blue-600" />
//                               </div>
//                               <div className="ml-4">
//                                 <div className="text-sm font-medium text-gray-900">{certificate.name}</div>
//                                 <div className="text-sm text-gray-500 md:hidden">{certificate.email_id}</div>
//                               </div>
//                             </div>
//                           </td>
//                           <td className="hidden lg:table-cell px-6 py-4 whitespace-nowrap">
//                             <div className="text-sm text-gray-900">{certificate.roll_no}</div>
//                           </td>
//                           <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap">
//                             <div className="text-sm text-gray-900">{certificate.email_id}</div>
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap">
//                             <div className="flex items-center">
//                               <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
//                                 <BadgeCheck className="w-3 h-3 mr-1" />
//                                 Verified
//                               </span>
//                               <span className="ml-2 text-sm text-gray-500">#{certificate.certificate_id}</span>
//                             </div>
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                             <div className="flex justify-end items-center space-x-2">
//                               {certificate.certificate && (
//                                 <>
//                                   <motion.button
//                                     whileHover={{ scale: 1.05 }}
//                                     whileTap={{ scale: 0.95 }}
//                                     onClick={() => openPreview(certificate.certificate)}
//                                     className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
//                                   >
//                                     <Eye className="w-3 h-3 mr-1" />
//                                     View
//                                   </motion.button>
//                                   <motion.button
//                                     whileHover={{ scale: 1.05 }}
//                                     whileTap={{ scale: 0.95 }}
//                                     onClick={() => downloadCertificate(certificate)}
//                                     className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
//                                   >
//                                     <Download className="w-3 h-3 mr-1" />
//                                     Download
//                                   </motion.button>
//                                 </>
//                               )}
//                             </div>
//                           </td>
//                         </motion.tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               ) : (
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
//                   {searchResults.map((certificate) => (
//                     <motion.div
//                       key={certificate.certificate_id}
//                       initial={{ opacity: 0, scale: 0.95 }}
//                       animate={{ opacity: 1, scale: 1 }}
//                       transition={{ duration: 0.3 }}
//                       whileHover={{ y: -5 }}
//                       className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all"
//                     >
//                       <div className="p-5 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
//                         <div className="flex items-center justify-between">
//                           <div className="flex items-center space-x-3">
//                             <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
//                               <User className="w-5 h-5 text-blue-600" />
//                             </div>
//                             <div>
//                               <h3 className="font-medium text-gray-900">{certificate.name}</h3>
//                               <p className="text-sm text-gray-500">#{certificate.certificate_id}</p>
//                             </div>
//                           </div>
//                           <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
//                             <BadgeCheck className="w-3 h-3 mr-1" />
//                             Verified
//                           </span>
//                         </div>
//                       </div>
//                       <div className="p-5">
//                         <div className="space-y-3 text-sm">
//                           <div className="flex items-center text-gray-600">
//                             <Mail className="w-4 h-4 mr-3 text-gray-400" />
//                             <span>{certificate.email_id}</span>
//                           </div>
//                           <div className="flex items-center text-gray-600">
//                             <Hash className="w-4 h-4 mr-3 text-gray-400" />
//                             <span>{certificate.roll_no}</span>
//                           </div>
//                         </div>
//                       </div>
//                       <div className="px-5 py-4 bg-gray-50 border-t border-gray-200 flex justify-end space-x-3">
//                         <motion.button
//                           whileHover={{ scale: 1.05 }}
//                           whileTap={{ scale: 0.95 }}
//                           onClick={() => openPreview(certificate.certificate)}
//                           className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50"
//                         >
//                           <Eye className="w-4 h-4 mr-2" />
//                           View
//                         </motion.button>
//                         <motion.button
//                           whileHover={{ scale: 1.05 }}
//                           whileTap={{ scale: 0.95 }}
//                           onClick={() => downloadCertificate(certificate)}
//                           className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700"
//                         >
//                           <Download className="w-4 h-4 mr-2" />
//                           Download
//                         </motion.button>
//                       </div>
//                     </motion.div>
//                   ))}
//                 </div>
//               )}
//             </motion.div>
//           ) : (
//             !loading && searchQuery && (
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ duration: 0.3 }}
//                 className="bg-white rounded-2xl shadow-xl border border-gray-200 p-12 text-center"
//               >
//                 <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
//                   <Frown className="w-10 h-10 text-gray-400" />
//                 </div>
//                 <h3 className="text-2xl font-medium text-gray-900 mb-3">No certificates found</h3>
//                 <p className="text-gray-500 mb-6 max-w-md mx-auto">
//                   We couldn't find any certificates matching your search criteria.
//                 </p>
//                 <div className="text-sm text-gray-400 flex flex-wrap items-center justify-center gap-2">
//                   <span>Try different keywords</span>
//                   <span>•</span>
//                   <span>Check spelling</span>
//                   <span>•</span>
//                   <span>Broaden your search</span>
//                 </div>
//               </motion.div>
//             )
//           )}
//         </AnimatePresence>

//         {/* Loading State */}
//         {loading && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="bg-white rounded-2xl shadow-xl border border-gray-200 p-12 text-center"
//           >
//             <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
//               <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
//             </div>
//             <h3 className="text-2xl font-medium text-gray-900 mb-3">Searching certificates</h3>
//             <p className="text-gray-500 mb-6">
//               Scanning our blockchain database...
//             </p>
//             <div className="w-full bg-gray-200 rounded-full h-2.5 max-w-md mx-auto overflow-hidden">
//               <motion.div
//                 initial={{ width: 0 }}
//                 animate={{ width: '65%' }}
//                 transition={{ duration: 1.5, repeat: Infinity, repeatType: 'reverse' }}
//                 className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2.5 rounded-full"
//               ></motion.div>
//             </div>
//           </motion.div>
//         )}

//         {/* Certificate Preview Modal */}
//         <AnimatePresence>
//           {previewUrl && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
//             >
//               <motion.div
//                 initial={{ scale: 0.95, opacity: 0 }}
//                 animate={{ scale: 1, opacity: 1 }}
//                 exit={{ scale: 0.95, opacity: 0 }}
//                 className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] flex flex-col overflow-hidden"
//               >
//                 <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
//                   <div className="flex items-center space-x-3">
//                     <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
//                       <Eye className="w-5 h-5 text-blue-600" />
//                     </div>
//                     <div>
//                       <h2 className="text-lg font-semibold text-gray-900">Certificate Preview</h2>
//                       <p className="text-sm text-gray-500">Blockchain Verified Document</p>
//                     </div>
//                   </div>
//                   <motion.button
//                     whileHover={{ rotate: 90 }}
//                     onClick={closePreview}
//                     className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
//                     aria-label="Close preview"
//                   >
//                     <X className="h-6 w-6" />
//                   </motion.button>
//                 </div>
//                 <div className="flex-1 p-6 overflow-auto bg-gradient-to-br from-gray-50 to-gray-100">
//                   <motion.div
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.1 }}
//                     className="bg-white rounded-xl shadow-sm p-6 border border-gray-200"
//                   >
//                     <img
//                       src={previewUrl}
//                       alt="Certificate Preview"
//                       className="w-full h-auto max-h-[70vh] object-contain mx-auto"
//                       onError={(e) => {
//                         e.target.onerror = null;
//                         e.target.src = 'https://via.placeholder.com/800x600?text=Certificate+Not+Available';
//                       }}
//                     />
//                   </motion.div>
//                 </div>
//                 <div className="p-6 border-t border-gray-200 flex justify-between items-center bg-white">
//                   <div className="flex items-center space-x-2 text-sm text-gray-500">
//                     <svg className="w-5 h-5 text-green-500" viewBox="0 0 24 24" fill="none">
//                       <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//                     </svg>
//                     <span>Blockchain Verified</span>
//                   </div>
//                   <div className="flex space-x-3">
//                     <motion.button
//                       whileHover={{ scale: 1.03 }}
//                       whileTap={{ scale: 0.98 }}
//                       onClick={closePreview}
//                       className="px-5 py-2.5 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors"
//                     >
//                       Close
//                     </motion.button>
//                     <motion.button
//                       whileHover={{ scale: 1.03 }}
//                       whileTap={{ scale: 0.98 }}
//                       className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-colors flex items-center"
//                     >
//                       <Download className="w-5 h-5 mr-2" />
//                       Download
//                     </motion.button>
//                   </div>
//                 </div>
//               </motion.div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </main>
//     </div>
//   );
// };

// export default CertificateSearch;

import { useState } from 'react';
import axios from 'axios';
import Header from '../home/Header';
import Footer from '../home/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Eye, Download, X, AlertCircle } from 'lucide-react';

const CertificateSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setError('Please enter a search term');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        'https://certificate-generator-production-ff36.up.railway.app/api/search/',
        {
          params: { q: searchQuery },
          headers: { 'Content-Type': 'application/json' },
        }
      );
      setSearchResults(response.data.results || []);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to search certificates');
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const openPreview = (url) => setPreviewUrl(url);
  const closePreview = () => setPreviewUrl(null);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-900 to-white px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-6xl mx-auto bg-white backdrop-blur-md rounded-2xl shadow-2xl p-8"
      >
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-sky-700 mb-2">🔍 Certificate Search</h1>
          <p className="text-lg text-sky-800">Find certificates by name or email</p>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="mb-8 flex flex-col items-center space-y-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Enter name or email"
            className="w-full max-w-md px-4 py-3 border border-blue-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-60"
          >
            <Search className="w-5 h-5" />
            {loading ? 'Searching...' : 'Search'}
          </button>
          {error && (
            <div className="text-red-500 text-sm flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              {error}
            </div>
          )}
        </form>

        {/* Preview Modal */}
        <AnimatePresence>
          {previewUrl && (
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-white rounded-xl p-6 max-w-4xl w-full max-h-[80vh] flex flex-col"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Certificate Preview</h2>
                  <button onClick={closePreview}>
                    <X className="w-6 h-6 text-gray-500 hover:text-red-500" />
                  </button>
                </div>
                <div className="overflow-auto flex-grow">
                  <img
                    src={previewUrl}
                    alt="Certificate Preview"
                    className="w-full h-auto rounded-lg"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/800x600?text=Preview+Not+Available';
                    }}
                  />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results */}
        {searchResults.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="overflow-x-auto mt-10"
          >
            <table className="min-w-full text-white bg-blue-800 rounded-xl overflow-hidden text-left shadow-md">
              <thead className="bg-blue-900 text-sm uppercase">
                <tr>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4 hidden md:table-cell">Roll No</th>
                  <th className="px-6 py-4 hidden md:table-cell">Email</th>
                  <th className="px-6 py-4">Certificate ID</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {searchResults.map((certificate) => (
                  <tr key={certificate.certificate_id} className="hover:bg-blue-700">
                    <td className="px-6 py-4">{certificate.name}</td>
                    <td className="px-6 py-4 hidden md:table-cell">{certificate.roll_no}</td>
                    <td className="px-6 py-4 hidden md:table-cell">{certificate.email_id}</td>
                    <td className="px-6 py-4">{certificate.certificate_id}</td>
                    <td className="px-6 py-4 text-right space-x-2">
                      {certificate.certificate && (
                        <>
                          <button
                            onClick={() => openPreview(certificate.certificate)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 bg-sky-600 hover:bg-sky-700 text-white rounded-md text-sm"
                          >
                            <Eye size={16} /> Preview
                          </button>
                          <button
                            onClick={async () => {
                              try {
                                const response = await fetch(certificate.certificate, { mode: 'cors' });
                                const blob = await response.blob();
                                const url = URL.createObjectURL(blob);
                                const link = document.createElement('a');
                                link.href = url;
                                link.download = `certificate_${certificate.certificate_id}.jpg`;
                                document.body.appendChild(link);
                                link.click();
                                document.body.removeChild(link);
                                URL.revokeObjectURL(url);
                              } catch {
                                alert('Failed to download image.');
                              }
                            }}
                            className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded-md text-sm"
                          >
                            <Download size={16} /> Download
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        ) : (
          !loading &&
          searchQuery && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center mt-12"
            >
              <div className="inline-block bg-blue-100 text-blue-900 p-6 rounded-lg shadow">
                <AlertCircle className="w-8 h-8 mx-auto mb-2" />
                <p className="font-medium">No certificates found.</p>
                <p className="text-sm">Try searching with a different name or email.</p>
              </div>
            </motion.div>
          )
        )}
      </motion.div>
    </div>
  );
};

export default CertificateSearch;
