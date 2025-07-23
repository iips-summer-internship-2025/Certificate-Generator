import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const VerificationSuccess = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchCertificate = async () => {
      try {
        const apiBase = import.meta.env.VITE_API_BASE_URL;
        const response = await fetch(`${apiBase}/api/verify/${id}/`);
        //const response = await fetch(`http://localhost:8000/api/verify/${id}/`);
        if (!response.ok) throw new Error("Certificate not found");
        const result = await response.json();
        if (result.status === "valid") {
          setData(result);
        } else {
          setNotFound(true);
        }
      } catch (err) {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };
    fetchCertificate();
  }, [id]);

  if (loading) return <div className="p-6 text-lg">Loading...</div>;

  if (notFound || !data)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
        <div className="bg-white p-10 rounded-xl shadow-lg text-center max-w-sm w-full">
          <h1 className="text-2xl font-bold text-red-600 mb-4">❌ Certificate Not Found</h1>
          <p className="text-gray-600">Please check the certificate ID.</p>
        </div>
      </div>
    );

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white w-full max-w-md rounded-xl shadow-xl p-4 m-4 text-center space-y-6">
        
        {/* ✅ Icon */}
        <img
          src="https://cdn-icons-png.flaticon.com/512/845/845646.png"
          alt="Verified"
          className="w-14 h-14 mx-auto"
        />

        {/* ✅ Title */}
        <h1 className="text-xl font-bold text-green-700">Certificate Verified</h1>

        
        
        <p className="text-sm text-gray-500 mt-2">
          Issued & verified by the <span className="font-semibold">International Institute of Professional Studies(IIPS)</span>
        </p>

        <p className="text-sm text-gray-500 mt-2">
          This certificate is digitally authenticated and protected against tampering or misuse.
        </p>
        <br>
        </br>

        {/* ✅ Info */}
        <div className="text-gray-700 space-y-1">
          <p><b><span className="font-medium">Name:</span> {data.name}</b></p>
          <p><b><span className="font-medium">Certificate ID:</span> {data.certificate_id}</b></p>
        </div>

        {/* ✅ View Button */}
        <a
          href={data.certificate_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-4 bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-md transition"
        >
          View Certificate
        </a>

        
      
      </div>
    </div>
  );
};

export default VerificationSuccess;
