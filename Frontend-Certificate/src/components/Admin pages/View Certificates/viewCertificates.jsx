// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Card, CardContent } from "@/components/ui/card";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";

// // Mock data for certificates
// const mockCertificates = [
//   {
//     id: 1,
//     recipient: "alice@email.com",
//     title: "Certificate of Achievement",
//     dateSent: "2024-06-10",
//   },
//   // Add more mock data as needed
// ];

// export default function ViewCertificates() {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [certificates] = useState(mockCertificates);

//   const filteredCertificates = certificates.filter(
//     (cert) =>
//       cert.recipient.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       cert.title.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const handleSearch = () => {
//     // Search functionality is handled by the filter above
//     console.log("Searching for:", searchQuery);
//   };

//   const handleView = (certificateId) => {
//     console.log("Viewing certificate:", certificateId);
//   };

//   const handleDelete = (certificateId) => {
//     console.log("Deleting certificate:", certificateId);
//   };

//   return (
//     <div className="p-8 flex flex-col gap-5">
//       {/* Header */}
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold text-blue-600">View Certificates</h1>
//       </div>

//       {/* Search Section */}
//           <div className="flex gap-4 justify-between ">
//             <Input
//               placeholder="Search by recipient/ title/ Certificate ID/ "
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="flex"
//             />
//             <Button 
//               onClick={handleSearch}
//               className="bg-blue-500 hover:bg-blue-700"
//             >
//               Search
//             </Button>
//           </div>

//       {/* Certificates Table */}
//       <Card className=' p-3 rounded-xl'>
//           <Table>
//             <TableHeader>
//               <TableRow className="bg-blue-50">
//                 <TableHead className="font-semibold text-gray-700">Recipient</TableHead>
//                 <TableHead className="font-semibold text-gray-700">Title</TableHead>
//                 <TableHead className="font-semibold text-gray-700">Date Sent</TableHead>
//                 <TableHead className="font-semibold text-gray-700">Actions</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {filteredCertificates.length > 0 ? (
//                 filteredCertificates.map((certificate) => (
//                   <TableRow key={certificate.id}>
//                     <TableCell>{certificate.recipient}</TableCell>
//                     <TableCell>{certificate.title}</TableCell>
//                     <TableCell>{certificate.dateSent}</TableCell>
//                     <TableCell>
//                       <div className="flex gap-2">
//                         <Button
//                           size="sm"
//                           variant="default"
//                           className="bg-green-600 hover:bg-green-700 text-white"
//                           onClick={() => handleView(certificate.id)}
//                         >
//                           View
//                         </Button>
//                         <Button
//                           size="sm"
//                           variant="destructive"
//                           onClick={() => handleDelete(certificate.id)}
//                         >
//                           Delete
//                         </Button>
//                       </div>
//                     </TableCell>
//                   </TableRow>
//                 ))
//               ) : (
//                 <TableRow>
//                   <TableCell colSpan={4} className="text-center text-gray-500 py-8">
//                     No certificates found
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//       </Card>
//     </div>
//   );
// }
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function ViewCertificates() {
  const [searchQuery, setSearchQuery] = useState("");
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 8;

  useEffect(() => {
    const fetchCertificates = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        const API_URL = import.meta.env.VITE_API_BASE_URL;
        console.log('API URL:', API_URL);
        const response = await fetch(`${API_URL}/api/certificates/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            page: page,
            page_size: pageSize,
            search: searchQuery.trim(),
          }),
        });
        const data = await response.json();
        setCertificates(data.results || []);
        setTotalPages(data.totalPages || 1);
      } catch (error) {
        console.error("Failed to fetch certificates:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCertificates();
  }, [page, searchQuery]);

  const handlePrev = () => setPage((p) => Math.max(1, p - 1));
  const handleNext = () => setPage((p) => Math.min(totalPages, p + 1));

  const handleSearch = () => {
    setPage(1); // Reset to first page on new search
    // The effect will re-run due to searchQuery change
  };

  const handleView = (certificateId) => {
    console.log("Viewing certificate:", certificateId);
    // Implement view logic (like opening a modal or redirecting to a page)
  };

  const handleDelete = (certificateId) => {
    console.log("Deleting certificate:", certificateId);
    // Implement delete API call if needed
  };

  return (
    <div className="p-8 flex flex-col gap-5">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-blue-600">View Certificates</h1>
      </div>

      {/* Search Section */}
      <div className="flex gap-4 justify-between ">
        <Input
          placeholder="Search by recipient/ title/ Certificate ID/ name/ event/ roll no"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button
          onClick={handleSearch}
          className="bg-blue-500 hover:bg-blue-700"
        >
          Search
        </Button>
      </div>

      {/* Certificates Table */}
      <Card className="p-3 rounded-xl">
        {loading ? (
          <div className="text-center text-gray-500 py-8">Loading certificates...</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="bg-blue-50">
                <TableHead className="font-semibold text-gray-700">Recipient</TableHead>
                <TableHead className="font-semibold text-gray-700">Title</TableHead>
                <TableHead className="font-semibold text-gray-700">Date Sent</TableHead>
                <TableHead className="font-semibold text-gray-700">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {certificates.length > 0 ? (
                certificates.map((certificate) => (
                  <TableRow key={certificate.id}>
                    <TableCell>{certificate.recipient}</TableCell>
                    <TableCell>{certificate.title}</TableCell>
                    <TableCell>{certificate.dateSent}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700 text-white"
                          onClick={() => handleView(certificate.id)}
                        >
                          View
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDelete(certificate.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-gray-500 py-8">
                    No certificates found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </Card>

      {/* Pagination controls */}
      <div style={{ marginTop: "1rem" }}>
        <button onClick={handlePrev} disabled={page === 1}>
          Previous
        </button>
        <span style={{ margin: "0 1rem" }}>
          Page {page} of {totalPages}
        </span>
        <button onClick={handleNext} disabled={page === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}