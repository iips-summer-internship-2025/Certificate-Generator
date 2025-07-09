
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Lock,
  Eye,
  EyeOff,
  Mail,
  Info,
  FileText,
  LogIn
} from 'lucide-react';
import logo from '../../../public/assets/logo.jpg'; // Adjust the path as needed


export default function Login() {
  const [email, setEmail] = useState(''); // State for email input
  const [password, setPassword] = useState(''); // State for password input
  const [message, setMessage] = useState(''); // State for feedback messages
  const [showPassword, setShowPassword] = useState(false); // Toggle password visibility

  const navigate = useNavigate();

  // Regular expression for validating email format
  const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate email format
    if (!emailRegex.test(email)) {
      setMessage('Invalid email format');
      return;
    }

    try {
      
      // Send login data to backend
      console.log("before getting env");
      const API_URL = import.meta.env.VITE_API_BASE_URL;
      console.log('API URL:', API_URL);
      const response = await fetch(`${API_URL}/api/token/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.access); // Store token in local storage
        setMessage('Login successful!');
        navigate('/upload'); // Navigate to upload page on success
      } else {
        setMessage(data.detail || 'Login failed'); // Show error message
      }
    } catch (error) {
      setMessage('Enter Correct Credentials '); // Show fallback error message
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-700 to-white p-2 sm:p-4 md:p-8">
      {/* Main container with login form and welcome section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        className="bg-white flex flex-col gap-6 md:gap-0 mx-4 md:flex-row rounded-3xl shadow-2xl overflow-hidden w-full max-w-2xl md:max-w-4xl lg:max-w-7xl min-h-[500px] md:min-h-[600px]"
      >
        {/* Left panel with animated welcome section */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 1.2 }}
          className="bg-sky-100 flex flex-col justify-center items-center p-4 sm:p-6 md:p-12 md:w-1/2 w-full text-center gap-4 md:gap-6"
        >
          <div className="bg-white p-2 sm:p-4 rounded-full shadow-lg overflow-hidden">
            <img src={logo} alt="Logo" className="w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 object-contain m-2 sm:m-3 " />
          </div>
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-cyan-900"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1.2 }}
          >
            Welcome To IIPS
          </motion.h2>
          <p className="text-cyan-600 text-lg sm:text-xl">Sampoorn</p>
          <div className="text-sm sm:text-base text-cyan-600 flex items-center gap-2">
            <Lock className="w-5 h-5" /> Secure & Trusted
          </div>
        </motion.div>

        {/* Right panel with login form */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 1.2 }}
          className="flex flex-col justify-center items-center pt-6 pb-6 sm:pt-8 sm:pb-8 md:pt-8 md:pb-8 md:w-1/2 w-full gap-8 md:gap-12"
        >
          <form onSubmit={handleSubmit} className="w-full flex flex-col items-center gap-6 px-2 sm:px-6">
            {/* Form heading */}
            <h2 className="text-2xl sm:text-3xl font-bold text-cyan-900 flex items-center gap-2 text-center mt-0 mb-2 pb-6 sm:pb-10">
              <FileText className="w-6 h-6 text-cyan-700" /> Log in
            </h2>

            {/* Email input field */}
            <div className="w-full max-w-xs sm:max-w-sm md:max-w-md">
              <label className="block text-cyan-800 font-semibold mb-1">Email address</label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-3 pr-8 py-2 px-2 rounded-md border border-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-300 text-sm"
                />
                <Mail className="absolute right-3 top-3 text-cyan-400 w-4 h-4" />
              </div>
            </div>

            {/* Password input field */}
            <div className="w-full max-w-xs sm:max-w-sm md:max-w-md">
              <label className="block text-cyan-800 font-semibold mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-3 pr-8 py-2 px-2 rounded-md border border-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-300 text-sm"
                />
                {/* Show/hide password toggle */}
                {showPassword ? (
                  <EyeOff
                    onClick={() => setShowPassword(false)}
                    className="absolute right-3 top-3 text-cyan-500 w-4 h-4 cursor-pointer"
                    
                  />
                ) : (
                  <Eye
                    onClick={() => setShowPassword(true)}
                    className="absolute right-3 top-3 text-cyan-500 w-4 h-4 cursor-pointer"
                  />
                )}
              </div>
            </div>

            {/* Submit button */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="w-full max-w-xs sm:max-w-sm md:max-w-md bg-gradient-to-r from-cyan-400 to-cyan-600 text-white font-semibold py-2 rounded-lg shadow-lg text-base "
            >
              <span className="flex justify-center items-center gap-2">
                <LogIn className="w-4 h-4" /> Login
              </span>
            </motion.button>

            {/* Display error or success message */}
            {message && <p className="text-sm text-red-500 mt-2">{message}</p>}

            {/* Additional login info */}
            <p className="text-sm text-cyan-700 flex items-center gap-1">
              <Info className="w-5 h-5 " /> Login required to access generator.
            </p>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
}
