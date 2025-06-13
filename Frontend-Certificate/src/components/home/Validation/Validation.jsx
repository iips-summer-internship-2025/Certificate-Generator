import React, { useState } from 'react';
import axios from 'axios';
import Header from '../Header'; 
import Footer from '../Footer';

export default function ValidateCertificate() {
  const [uniqueId, setUniqueId] = useState('');
  const [certificateData, setCertificateData] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setCertificateData(null);

    try {
      const response = await axios.get(`https://your-backend-url/api/certificate/${uniqueId}`);
      if (response.data && response.data.valid) {
        setCertificateData(response.data);
      } else {
        setError('Certificate not found or invalid.');
      }
    } catch (err) {
      setError('Certificate not found or invalid.');
    }
  };

  return (
    <>
    <Header/>
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <h1 className="text-2xl font-bold text-blue-800 mb-4">Enter Detail to see your certificate</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <input
          type="text"
          placeholder="Enter Unique Certificate ID"
          value={uniqueId}
          onChange={(e) => setUniqueId(e.target.value)}
          className="w-full px-4 py-2 mb-4 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Validate
        </button>
      </form>

      {error && <p className="text-red-600 mt-4">{error}</p>}

      {certificateData && (
        <div className="mt-6 p-4 border border-green-600 rounded-lg bg-white shadow">
          <h2 className="text-lg font-semibold text-green-700">Certificate Found</h2>
          <p><strong>Name:</strong> {certificateData.name}</p>
          <p><strong>Status:</strong> Valid</p>
          <a
            href={certificateData.certificateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            View Certificate
          </a>
        </div>
      )}
    </div>
    <Footer />
    </>
  );
}
