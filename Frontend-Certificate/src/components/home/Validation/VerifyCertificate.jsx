import React, { useState } from 'react';
import axios from 'axios';

export default function VerifyCertificate() {
  const [certificateId, setCertificateId] = useState('');
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    setLoading(true);
    setError('');
    setData(null);
    try {
      const response = await axios.get(`http://127.0.0.1:8000/verify/${certificateId}/`);
      setData(response.data);
    } catch (err) {
      setError('Certificate not found or invalid.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-blue-800 mb-4">Certificate Verification</h1>
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <input
          type="text"
          className="w-full border border-gray-300 rounded-lg p-2 mb-4"
          placeholder="Enter Certificate ID"
          value={certificateId}
          onChange={(e) => setCertificateId(e.target.value)}
        />
        <button
          onClick={handleVerify}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
        >
          {loading ? 'Verifying...' : 'Verify Certificate'}
        </button>

        {error && <p className="text-red-500 mt-4">{error}</p>}

        {data && (
          <div className="mt-6 border-t pt-4">
            <p><strong>Name:</strong> {data.name}</p>
            <p><strong>Course:</strong> {data.course}</p>
            <p><strong>Date of Issue:</strong> {data.date_of_issue}</p>
            <p className="mt-4"><strong>Certificate Preview:</strong></p>
            <img
              src={data.certificate_url}
              alt="Certificate"
              className="mt-2 rounded-lg border border-gray-300"
            />
          </div>
        )}
      </div>
    </div>
  );
}
