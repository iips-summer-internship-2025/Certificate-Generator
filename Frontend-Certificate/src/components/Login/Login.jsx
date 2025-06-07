// import React, { useState } from 'react';
// import './Login.css';
// import  LoginBackground  from '../../../public/assets/LoginBackground.jpg';
// import { useNavigate } from 'react-router-dom'




// function Login() {
//   // 1. Form state
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [message, setMessage] = useState('');
//   const navigate = useNavigate()

//   // Email validation regex
//   const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;

//     // 2. Handle form submit
//     const handleSubmit = async (e) => {
//         e.preventDefault();

//       // Check email format
//       if (!emailRegex.test(email)) {
//         setMessage('Invalid email format');
//       return;
//       }

//       try {
//         // Send login request to the backend API
//         const response = await fetch('http://127.0.0.1:8000/api/token/', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ email, password }) // Sending user credentials
//         });

//         const data = await response.json(); // Parse the JSON response

//       if (response.ok) {
//         localStorage.setItem('token', data.access);
//         setMessage('Login successful!');
//         navigate('/upload') // Redirect to upload page

//       } else {
//         // Show error message from backend or fallback message
//         setMessage(data.detail || 'Login failed');
//       }
//     } catch (error) {
//       // Handle network or unexpected errors
//       setMessage('Enter Correct Credentials ');
//     }
//   };

//     return (
//         <>
//             <div className="Login">
//                 <img src={LoginBackground} alt="BACKGROUND" />
//                 <div className="Inner_parent">
//                 <div className="container">
//                     <div className="Inner_Login">
//                         <div>
//                             <p>Welcome To IIPS</p>
//                             <h1>Sampoorn</h1>
//                         </div>
//                         <div className="Login_form">
//                             <form onSubmit={handleSubmit}>
//                                 <h2>Log in</h2>
//                                 <div className="Continue_with_mail">
//                                     <div>
//                                         <svg xmlns="http://www.w3.org/2000/svg" fill="#314e9e" width="20px" height="20px" viewBox="0 0 1920 1920">
//                                             <path d="M1920 428.266v1189.54l-464.16-580.146-88.203 70.585 468.679 585.904H83.684l468.679-585.904-88.202-70.585L0 1617.805V428.265l959.944 832.441L1920 428.266ZM1919.932 226v52.627l-959.943 832.44L.045 278.628V226h1919.887Z" fillRule="evenodd" />
//                                         </svg>
//                                         <input
//                                             type="email"
//                                             placeholder="Email"
//                                             value={email}
//                                             onChange={(e) => setEmail(e.target.value)}
//                                             required
//                                         />
//                                     </div>
//                                     <div>
//                                         <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 16 16" fill="none">
//                                             <path fillRule="evenodd" clipRule="evenodd" d="M4 6V4C4 1.79086 5.79086 0 8 0C10.2091 0 12 1.79086 12 4V6H14V16H2V6H4ZM6 4C6 2.89543 6.89543 2 8 2C9.10457 2 10 2.89543 10 4V6H6V4ZM7 13V9H9V13H7Z" fill="#314e9e" />
//                                         </svg>
//                                         <input
//                                             type="password"
//                                             placeholder="Password"
//                                             value={password}
//                                             onChange={(e) => setPassword(e.target.value)}
//                                             required
//                                         />
//                                     </div>
//                                 </div>
//                                 <button type="submit">Log in</button>
//                                 {message && <p>{message}</p>}
//                             </form>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             </div>
//         </>
//     );
// }

// export default Login;


// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import {
//   BadgeCheck,
//   Lock,
//   Eye,
//   EyeOff,
//   Mail,
//   Info,
//   FileText,
//   LogIn
// } from 'lucide-react';
// import logo from '../../../public/assets/logo.jpg'; // Adjust the path as needed

// export default function Login() {
//   const [email, setEmail] = useState(''); // State for email input
//   const [password, setPassword] = useState(''); // State for password input
//   const [message, setMessage] = useState(''); // State for feedback messages
//   const [showPassword, setShowPassword] = useState(false); // Toggle password visibility

//   const navigate = useNavigate();

//   // Regular expression for validating email format
//   const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Validate email format
//     if (!emailRegex.test(email)) {
//       setMessage('Invalid email format');
//       return;
//     }

//     try {
//       // Send login data to backend
//       const response = await fetch('http://127.0.0.1:8000/api/token/', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         localStorage.setItem('token', data.access); // Store token
//         setMessage('Login successful!');
//         navigate('/upload'); // Redirect
//       } else {
//         setMessage(data.detail || 'Login failed');
//       }
//     } catch (error) {
//       setMessage('Enter Correct Credentials ');
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-100 to-white p-8">
//       {/* Main card container with entrance animation */}
//       <motion.div
//         initial={{ opacity: 0, y: 50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className="bg-white flex flex-col md:flex-row rounded-3xl shadow-2xl overflow-hidden max-w-6xl w-full min-h-[600px]"
//       >
//         {/* Left panel with welcome info and animation */}
//         <motion.div
//           initial={{ x: -50, opacity: 0 }}
//           animate={{ x: 0, opacity: 1 }}
//           transition={{ delay: 0.2, duration: 0.5 }}
//           className="bg-cyan-50 flex flex-col justify-center items-center p-10 md:w-1/2 text-center gap-4"
//         >
//           <div className="bg-white p-1 rounded-full shadow-lg">
//             <img src={logo} alt="Logo" className="w-24 h-24 rounded-full object-contain " />
//           </div>
//           <motion.h2
//             className="text-4xl font-extrabold text-cyan-900"
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.4, duration: 0.6 }}
//           >
//             Welcome To IIPS
//           </motion.h2>
//           <p className="text-cyan-600 text-lg">Sampoorn</p>
//           <div className="text-sm text-cyan-600 flex items-center gap-2">
//             <Lock className="w-4 h-4" /> Secure & Trusted
//           </div>
//         </motion.div>

//         {/* Right panel with login form */}
//         <motion.div
//           initial={{ x: 50, opacity: 0 }}
//           animate={{ x: 0, opacity: 1 }}
//           transition={{ delay: 0.3, duration: 0.5 }}
//           className="flex flex-col justify-center p-10 md:w-1/2 w-full"
//         >
//           <form onSubmit={handleSubmit} className="space-y-6 text-base">
//             <h2 className="text-3xl font-bold text-cyan-900 flex items-center gap-2">
//               <FileText className="w-6 h-6 text-cyan-700" /> Log in
//             </h2>

//             {/* Email field */}
//             <div>
//               <label className="block text-cyan-800 font-semibold mb-1">Email address</label>
//               <div className="relative">
//                 <Mail className="absolute left-3 top-3 text-cyan-400 w-5 h-5" />
//                 <input
//                   type="email"
//                   placeholder="Enter your email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                   className="w-full pl-10 pr-4 py-3 rounded-md border border-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-300 text-base"
//                 />
//               </div>
//             </div>

//             {/* Password field */}
//             <div>
//               <label className="block text-cyan-800 font-semibold mb-1">Password</label>
//               <div className="relative">
//                 <Lock className="absolute left-3 top-3 text-cyan-400 w-5 h-5" />
//                 <input
//                   type={showPassword ? 'text' : 'password'}
//                   placeholder="Enter your password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                   className="w-full pl-10 pr-10 py-3 rounded-md border border-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-300 text-base"
//                 />
//                 {/* Toggle password visibility */}
//                 {showPassword ? (
//                   <EyeOff
//                     onClick={() => setShowPassword(false)}
//                     className="absolute right-3 top-3 text-cyan-500 w-5 h-5 cursor-pointer"
//                   />
//                 ) : (
//                   <Eye
//                     onClick={() => setShowPassword(true)}
//                     className="absolute right-3 top-3 text-cyan-500 w-5 h-5 cursor-pointer"
//                   />
//                 )}
//               </div>
//             </div>

//             {/* Submit button with hover animation */}
//             <motion.button
//               whileHover={{ scale: 1.03 }}
//               whileTap={{ scale: 0.97 }}
//               type="submit"
//               className="w-full bg-gradient-to-r from-cyan-400 to-cyan-600 text-white font-semibold py-3 rounded-lg shadow-lg"
//             >
//               <span className="flex justify-center items-center gap-2">
//                 <LogIn className="w-5 h-5" /> Login
//               </span>
//             </motion.button>

//             {/* Message display */}
//             {message && <p className="text-sm text-red-500">{message}</p>}

//             {/* Footer info */}
//             <p className="text-sm text-cyan-700 mt-2 flex items-center gap-1">
//               <Info className="w-5 h-5" /> Login required to access generator.
//             </p>
//           </form>
//         </motion.div>
//       </motion.div>
//     </div>
//   );
// }

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
      const response = await fetch('http://127.0.0.1:8000/api/token/', {
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
                  className="w-full pl-3 pr-8 py-2 rounded-md border border-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-300 text-sm"
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
                  className="w-full pl-3 pr-8 py-2 rounded-md border border-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-300 text-sm"
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
