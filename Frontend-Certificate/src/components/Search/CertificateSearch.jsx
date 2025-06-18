import { useState } from 'react';
import axios from 'axios';

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
        // 'https://certificate-generator-production-ff36.up.railway.app/api/search/',
        'http://127.0.0.1:8000/api/search/',
        {
          params: { q: searchQuery },
          headers: {
            'Content-Type': 'application/json',
          },
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

  const openPreview = (url) => {
    setPreviewUrl(url);
  };

  const closePreview = () => {
    setPreviewUrl(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-600 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-white mb-3">Certificate Search</h1>
          <p className="text-blue-100 text-lg">Find certificates by name or email address</p>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="mb-10">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Enter name or email"
              className="flex-1 px-5 py-3 text-gray-800 bg-white border border-blue-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed text-lg"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Searching...
                </span>
              ) : 'Search'}
            </button>
          </div>
          {error && <p className="mt-2 text-sm text-red-300">{error}</p>}
        </form>

        {/* Certificate Preview Modal */}
        {previewUrl && (
          <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-5xl w-full max-h-[90vh] flex flex-col">
              <div className="flex justify-between items-center p-4 border-b">
                <h2 className="text-xl font-semibold text-gray-800">Certificate Preview</h2>
                <button
                  onClick={closePreview}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  aria-label="Close preview"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="flex-1 p-4 overflow-auto">
                <img 
                  src={previewUrl} 
                  alt="Certificate Preview" 
                  className="w-full h-auto max-h-[70vh] object-contain mx-auto"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/800x600?text=Certificate+Not+Available';
                  }}
                />
              </div>
              <div className="p-4 border-t flex justify-end">
                <button
                  onClick={closePreview}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Results Section */}
        {searchResults.length > 0 ? (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-white">Search Results</h2>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-white/20">
                  <thead className="bg-white/10">
                    <tr>
                      <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                        Name
                      </th>
                      {/* Hide Roll No and Email on medium/small screens */}
                      <th scope="col" className="hidden md:table-cell px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                        Roll No
                      </th>
                      <th scope="col" className="hidden md:table-cell px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                        Email
                      </th>
                      <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                        Certificate ID
                      </th>
                      <th scope="col" className="px-6 py-4 text-right text-xs font-semibold text-white uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {searchResults.map((certificate) => (
                      <tr key={certificate.certificate_id} className="hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                          {certificate.name}
                        </td>
                        {/* Hide Roll No and Email on medium/small screens */}
                        <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm text-blue-100">
                          {certificate.roll_no}
                        </td>
                        <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm text-blue-100">
                          {certificate.email_id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-100">
                          {certificate.certificate_id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-right space-x-2">
                          {certificate.certificate && (
                            <>
                              <button
                                onClick={() => openPreview(certificate.certificate)}
                                className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm transition-colors text-sm"
                              >
                                Preview
                              </button>
                              <button
                                onClick={async () => {
                                  try {
                                    const response = await fetch(certificate.certificate, { mode: 'cors' });
                                    const blob = await response.blob();
                                    const url = window.URL.createObjectURL(blob);
                                    const link = document.createElement('a');
                                    link.href = url;
                                    link.download = `certificate_${certificate.certificate_id}.jpg`;
                                    document.body.appendChild(link);
                                    link.click();
                                    document.body.removeChild(link);
                                    window.URL.revokeObjectURL(url);
                                  } catch (err) {
                                    alert('Failed to download image.');
                                  }
                                }}
                                className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-sm transition-colors text-sm"
                              >
                                Download
                              </button>
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ): (
          !loading && searchQuery && (
            <div className="text-center py-12">
              <div className="inline-block p-6 bg-white/10 rounded-xl backdrop-blur-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-white/70 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-xl text-white">No certificates found matching your search.</p>
                <p className="text-blue-100 mt-2">Try a different name or email address</p>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default CertificateSearch;
