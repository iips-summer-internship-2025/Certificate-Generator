// import { useState } from "react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Table, TableHead, TableHeader, TableRow, TableBody, TableCell } from "@/components/ui/table";
// import { ShieldCheck, Search, FileText } from "lucide-react";
// import { motion } from "framer-motion";

// export default function CertificateValidation() {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filteredData, setFilteredData] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const handleSearch = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch(`/api/validate?query=${encodeURIComponent(searchTerm)}`);
//       const result = await response.json();
//       setFilteredData(result);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       setFilteredData([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-sky-200 to-sky-500 text-gray-800 p-6">
//       <motion.div 
//         className="max-w-4xl mx-auto"
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//       >
//         <div className="flex items-center gap-3 text-4xl font-bold text-sky-900 mb-6">
//           <ShieldCheck className="text-sky-700" size={36} />
//           Certificate Validation
//         </div>

//         <Card className="bg-white/70 backdrop-blur-md shadow-xl">
//           <CardContent className="p-6">
//             <div className="flex flex-col md:flex-row items-center gap-4">
//               <Input
//                 className="flex-1 border-sky-400 focus:ring-sky-500"
//                 placeholder="Enter Roll No. or Certificate ID"
//                 value={searchTerm}
//                 onChange={e => setSearchTerm(e.target.value)}
//               />
//               <Button onClick={handleSearch} className="bg-sky-600 hover:bg-sky-700" disabled={loading}>
//                 <Search className="mr-2 h-4 w-4" /> {loading ? "Searching..." : "Search"}
//               </Button>
//             </div>

//             <div className="mt-6 overflow-x-auto">
//               <Table>
//                 <TableHeader>
//                   <TableRow className="bg-sky-100">
//                     <TableHead>ID</TableHead>
//                     <TableHead>Roll No.</TableHead>
//                     <TableHead>Name</TableHead>
//                     <TableHead>Email</TableHead>
//                     <TableHead>Course</TableHead>
//                     <TableHead>Issue Date</TableHead>
//                     <TableHead>Status</TableHead>
//                     <TableHead>Action</TableHead>
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   {filteredData.length === 0 ? (
//                     <TableRow>
//                       <TableCell colSpan={8} className="text-center py-4 text-gray-500">
//                         {loading ? "Loading results..." : "No results found. Start by searching above."}
//                       </TableCell>
//                     </TableRow>
//                   ) : (
//                     filteredData.map((item, idx) => (
//                       <motion.tr
//                         key={idx}
//                         initial={{ opacity: 0, y: 10 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ delay: idx * 0.1 }}
//                         className="bg-white hover:bg-sky-50 transition duration-300"
//                       >
//                         <TableCell>{item.id}</TableCell>
//                         <TableCell>{item.roll}</TableCell>
//                         <TableCell>{item.name}</TableCell>
//                         <TableCell>{item.email}</TableCell>
//                         <TableCell>{item.course}</TableCell>
//                         <TableCell>{item.date}</TableCell>
//                         <TableCell className={item.status === "Valid" ? "text-green-600" : "text-red-600"}>{item.status}</TableCell>
//                         <TableCell>
//                           <Button size="sm" variant="outline" className="text-sky-600 border-sky-400">
//                             <FileText className="h-4 w-4 mr-1" /> View
//                           </Button>
//                         </TableCell>
//                       </motion.tr>
//                     ))
//                   )}
//                 </TableBody>
//               </Table>
//             </div>
//           </CardContent>
//         </Card>
//       </motion.div>
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableHead, TableHeader, TableRow, TableBody, TableCell } from "@/components/ui/table";
import { ShieldCheck, Search, FileText } from "lucide-react";
import { motion } from "framer-motion";

const demoData = [
  {
    id: "CERT001",
    roll: "R001",
    name: "Alice Johnson",
    email: "alice@example.com",
    course: "AI Fundamentals",
    date: "2025-05-01",
    status: "Valid",
    link: "https://example.com/certificates/CERT001"
  },
  {
    id: "CERT002",
    roll: "R002",
    name: "Bob Smith",
    email: "bob@example.com",
    course: "Web Development",
    date: "2025-05-02",
    status: "Valid",
    link: "https://example.com/certificates/CERT002"
  },
  {
    id: "CERT003",
    roll: "R003",
    name: "Charlie Brown",
    email: "charlie@example.com",
    course: "Cyber Security",
    date: "2025-05-03",
    status: "Invalid"
  }
];

// export default function CertificateValidation() {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filteredData, setFilteredData] = useState(demoData);
//   const [loading, setLoading] = useState(false);

//   const handleSearch = async () => {
//     setLoading(true);
//     try {
//       await new Promise((resolve) => setTimeout(resolve, 500));
//       const result = demoData.filter(
//         item => item.roll.toLowerCase() === searchTerm.toLowerCase() || item.id.toLowerCase() === searchTerm.toLowerCase()
//       );
//       setFilteredData(result);
//     } catch (error) {
//       console.error("Error filtering demo data:", error);
//       setFilteredData([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-300 to-blue-700 text-gray-800 p-6">
//       <motion.div 
//         className="w-full max-w-6xl"
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//       >
//         <motion.div
//           className="text-center mb-10"
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.6 }}
//         >
//           <h1 className="text-6xl font-black text-white drop-shadow-xl flex items-center justify-center gap-4">
//             <ShieldCheck className="text-white animate-bounce" size={44} />
//             <span className="bg-white text-sky-600 px-4 py-1 rounded-lg shadow-lg">Certificate Validation</span>
//           </h1>
//           <p className="mt-3 text-lg text-white/90 font-medium">Search with Roll Number or Certificate ID</p>
//         </motion.div>

//         <Card className="bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl">
//           <CardContent className="p-8">
//             <div className="flex flex-col md:flex-row items-center gap-4 justify-center">
//               <Input
//                 className="w-full md:w-2/3 border-sky-500 shadow-sm focus:ring-2 focus:ring-sky-500"
//                 placeholder="e.g. R001 or CERT001"
//                 value={searchTerm}
//                 onChange={e => setSearchTerm(e.target.value)}
//               />
//               <Button onClick={handleSearch} className="bg-gradient-to-r from-sky-500 to-sky-700 hover:from-sky-600 hover:to-sky-800 text-white shadow-lg" disabled={loading}>
//                 <Search className="mr-2 h-4 w-4" /> {loading ? "Searching..." : "Search"}
//               </Button>
//             </div>

//             <div className="mt-8 overflow-x-auto">
//               <Table>
//                 <TableHeader>
//                   <TableRow className="bg-sky-100 text-sky-800">
//                     <TableHead>ID</TableHead>
//                     <TableHead>Roll No.</TableHead>
//                     <TableHead>Name</TableHead>
//                     <TableHead>Email</TableHead>
//                     <TableHead>Course</TableHead>
//                     <TableHead>Issue Date</TableHead>
//                     <TableHead>Status</TableHead>
//                     <TableHead>Action</TableHead>
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   {filteredData.length === 0 ? (
//                     <TableRow>
//                       <TableCell colSpan={8} className="text-center py-4 text-gray-500">
//                         {loading ? "Loading results..." : "No results found. Try another ID."}
//                       </TableCell>
//                     </TableRow>
//                   ) : (
//                     filteredData.map((item, idx) => (
//                       <motion.tr
//                         key={idx}
//                         initial={{ opacity: 0, y: 10 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ delay: idx * 0.1 }}
//                         className="bg-white hover:bg-sky-50 transition duration-300 rounded-xl"
//                       >
//                         <TableCell>{item.id}</TableCell>
//                         <TableCell>{item.roll}</TableCell>
//                         <TableCell>{item.name}</TableCell>
//                         <TableCell>{item.email}</TableCell>
//                         <TableCell>{item.course}</TableCell>
//                         <TableCell>{item.date}</TableCell>
//                         <TableCell className={item.status === "Valid" ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>{item.status}</TableCell>
//                         <TableCell>
//                           {item.status === "Valid" && item.link ? (
//                             <a href={item.link} target="_blank" rel="noopener noreferrer">
//                               <Button size="sm" variant="outline" className="text-sky-700 border-sky-400 hover:bg-sky-100">
//                                 <FileText className="h-4 w-4 mr-1" /> View
//                               </Button>
//                             </a>
//                           ) : (
//                             <span className="text-gray-400 italic">N/A</span>
//                           )}
//                         </TableCell>
//                       </motion.tr>
//                     ))
//                   )}
//                 </TableBody>
//               </Table>
//             </div>
//           </CardContent>
//         </Card>
//       </motion.div>
//     </div>
//   );
// }
export default function CertificateValidation() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(demoData);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const result = demoData.filter(
        item => item.roll.toLowerCase() === searchTerm.toLowerCase() || item.id.toLowerCase() === searchTerm.toLowerCase()
      );
      setFilteredData(result);
    } catch (error) {
      console.error("Error filtering demo data:", error);
      setFilteredData([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white-300  text-gray-800 p-6 mx-6 gap-4 backdrop-blur-3xl shadow-5xl rounded-3xl">
      <Card className="w-full max-w-6xl bg-white/80 backdrop-blur-3xl shadow-3xl rounded-3xl">
        <CardContent className="p-8">
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-6xl font-black text-white drop-shadow-xl flex items-center justify-center gap-4">
              <ShieldCheck className="text-sky-700 animate-bounce" size={44} />
              <span className="bg-white text-black px-4 py-1 rounded-lg shadow-lg">Certificate Validation</span>
            </h1>
            <p className="mt-3 text-lg text-black-90 font-medium">Search with Roll Number or Certificate ID</p>
          </motion.div>

          <div className="flex flex-col md:flex-row items-center gap-4 justify-center">
            <Input
              className="w-full md:w-2/3 border-sky-500 shadow-sm focus:ring-2 focus:ring-sky-500"
              placeholder="e.g. R001 or CERT001"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
            <Button onClick={handleSearch} className="bg-gradient-to-r from-sky-500 to-sky-700 hover:from-sky-600 hover:to-sky-800 text-white shadow-lg" disabled={loading}>
              <Search className="mr-2 h-4 w-4" /> {loading ? "Searching..." : "Search"}
            </Button>
          </div>

          <div className="mt-8 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-sky-100 text-sky-800">
                  <TableHead>ID</TableHead>
                  <TableHead>Roll No.</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Issue Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-4 text-gray-500">
                      {loading ? "Loading results..." : "No results found. Try another ID."}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredData.map((item, idx) => (
                    <motion.tr
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="bg-white hover:bg-sky-50 transition duration-300 rounded-xl"
                    >
                      <TableCell>{item.id}</TableCell>
                      <TableCell>{item.roll}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.email}</TableCell>
                      <TableCell>{item.course}</TableCell>
                      <TableCell>{item.date}</TableCell>
                      <TableCell className={item.status === "Valid" ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>{item.status}</TableCell>
                      <TableCell>
                        {item.status === "Valid" && item.link ? (
                          <a href={item.link} target="_blank" rel="noopener noreferrer">
                            <Button size="sm" variant="outline" className="text-sky-700 border-sky-400 hover:bg-sky-100">
                              <FileText className="h-4 w-4 mr-1" /> View
                            </Button>
                          </a>
                        ) : (
                          <span className="text-gray-400 italic">N/A</span>
                        )}
                      </TableCell>
                    </motion.tr>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


