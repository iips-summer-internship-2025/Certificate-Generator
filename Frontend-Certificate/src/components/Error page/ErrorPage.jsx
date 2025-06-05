import PropTypes from 'prop-types';

const ErrorPage = ({ message = "Something went wrong!", statusCode }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4">
      <div className="max-w-md w-full bg-sky-950 rounded-lg shadow-lg p-8 text-center">
        <div className="text-6xl font-bold text-sky-400 mb-4">
          {statusCode || "Error"}
        </div>
        <h1 className="text-2xl font-semibold mb-4">Oops!</h1>
        <p className="text-gray-300 mb-6">{message}</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-sky-800 hover:bg-sky-700 text-white font-medium py-2 px-4 rounded transition duration-200"
        >
          Refresh Page
        </button>
        <p className="text-gray-400 mt-6 text-sm">
          If the problem persists, please contact support.
        </p>
      </div>
    </div>
  );
};

ErrorPage.propTypes = {
  message: PropTypes.string,
  statusCode: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default ErrorPage;