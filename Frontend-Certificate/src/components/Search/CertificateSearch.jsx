import { useState } from 'react';
import axios from 'axios';
import Header from '../home/Header';
import Footer from '../home/Footer';

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
        // 'http://127.0.0.1:8000/api/search/',
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
    <>
      <Header />
      <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-10">
            <svg className="inline-block" xmlns="http://www.w3.org/2000/svg" width="50px" height="50px" viewBox="-0.5 0 25 25" fill="none">
              <path d="M22 11.8201C22 9.84228 21.4135 7.90885 20.3147 6.26436C19.2159 4.61987 17.6542 3.33813 15.8269 2.58126C13.9996 1.82438 11.9889 1.62637 10.0491 2.01223C8.10927 2.39808 6.32748 3.35052 4.92896 4.74904C3.53043 6.14757 2.578 7.92935 2.19214 9.86916C1.80629 11.809 2.00436 13.8197 2.76123 15.6469C3.51811 17.4742 4.79985 19.036 6.44434 20.1348C8.08883 21.2336 10.0222 21.8201 12 21.8201" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M2 11.8201H22" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M12 21.8201C10.07 21.8201 8.5 17.3401 8.5 11.8201C8.5 6.30007 10.07 1.82007 12 1.82007C13.93 1.82007 15.5 6.30007 15.5 11.8201" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M18.3691 21.6901C20.3021 21.6901 21.8691 20.1231 21.8691 18.1901C21.8691 16.2571 20.3021 14.6901 18.3691 14.6901C16.4361 14.6901 14.8691 16.2571 14.8691 18.1901C14.8691 20.1231 16.4361 21.6901 18.3691 21.6901Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M22.9998 22.8202L20.8398 20.6702" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <h1 className="text-4xl font-bold mb-3" style={{color: '#143d69'}}>Certificate Search</h1>
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
                className="py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed text-lg px-3 rounded"
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
          ) : (
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
      <Footer />
    </>
  );
};

export default CertificateSearch;
