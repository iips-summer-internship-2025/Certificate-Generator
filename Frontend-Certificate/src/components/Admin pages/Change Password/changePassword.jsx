// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { LockKeyhole, ShieldCheck, Eye, EyeOff } from 'lucide-react';

// export default function ChangePassword() {
//   const [formData, setFormData] = useState({
//     currentPassword: '',
//     newPassword: '',
//     confirmPassword: '',
//   });

//   const [showPasswords, setShowPasswords] = useState(false);

//   const toggleVisibility = () => {
//     setShowPasswords((prev) => !prev);
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const { currentPassword, newPassword, confirmPassword } = formData;

//     if (!currentPassword || !newPassword || !confirmPassword) {
//       alert('Please fill all fields.');
//       return;
//     }

//     if (newPassword !== confirmPassword) {
//       alert('New passwords do not match.');
//       return;
//     }

//     // TODO: Send to backend
//     alert('Password changed successfully!');
//   };

//   return (
//     <div className="min-h-screen  overflow-hidden flex items-center justify-center bg-gradient-to-br from-white-200 to-white-100 p-6">
//       <motion.div
//         initial={{ opacity: 0, y: -30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 1 }}
//         className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-xl"
//       >
//         {/* Header */}
//         <div className="flex flex-col items-center mb-8">
//           <ShieldCheck className="w-15 pt-4 h-15 text-sky-600 mb-2" />
//           <h1 className="text-3xl font-bold text-gray-800">Change Password</h1>
//           <p className="text-gray-500 text-sm text-center">
//             Keep your account secure by updating your password regularly.
//           </p>
//         </div>

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="flex flex-col items-center gap-6 w-full p-4">
//           {/* Current Password */}
//           <div className="flex items-center gap-3 w-full">
//             <label className="text-sm font-medium text-gray-700 w-1/3 text-right">Current Password</label>
//             <div className="relative w-2/3">
//               <input
//                 type={showPasswords.currentPassword ? 'text' : 'password'}
//                 name="currentPassword"
//                 value={formData.currentPassword}
//                 onChange={handleChange}
//                 placeholder="Enter current password"
//                 className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
//               />
//               <span
//                 className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 cursor-pointer"
//                 onClick={() =>
//                   setShowPasswords((prev) => ({
//                     ...prev,
//                     currentPassword: !prev.currentPassword,
//                   }))
//                 }
//               >
//                 {showPasswords.currentPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//               </span>
//             </div>
//           </div>

//           {/* New Password */}
//           <div className="flex items-center gap-3 w-full">
//             <label className="text-sm font-medium text-gray-700 w-1/3 text-right">New Password</label>
//             <div className="relative w-2/3">
//               <input
//                 type={showPasswords.newPassword ? 'text' : 'password'}
//                 name="newPassword"
//                 value={formData.newPassword}
//                 onChange={handleChange}
//                 placeholder="Enter new password"
//                 className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
//               />
//               <span
//                 className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 cursor-pointer"
//                 onClick={() =>
//                   setShowPasswords((prev) => ({
//                     ...prev,
//                     newPassword: !prev.newPassword,
//                   }))
//                 }
//               >
//                 {showPasswords.newPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//               </span>
//             </div>
//           </div>

//           {/* Confirm Password */}
//           <div className="flex items-center gap-3 w-full">
//             <label className="text-sm font-medium text-gray-700 w-1/3 text-right">Confirm Password</label>
//             <div className="relative w-2/3">
//               <input
//                 type={showPasswords.confirmPassword ? 'text' : 'password'}
//                 name="confirmPassword"
//                 value={formData.confirmPassword}
//                 onChange={handleChange}
//                 placeholder="Confirm new password"
//                 className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
//               />
//               <span
//                 className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 cursor-pointer"
//                 onClick={() =>
//                   setShowPasswords((prev) => ({
//                     ...prev,
//                     confirmPassword: !prev.confirmPassword,
//                   }))
//                 }
//               >
//                 {showPasswords.confirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//               </span>
//             </div>
//           </div>

//           {/* Submit Button */}
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             type="submit"
//             className="bg-gradient-to-r from-sky-500 to-sky-700 w-1/2 text-white font-semibold py-3 px-6 rounded-xl shadow-md mt-4 "
//           >
//             <div className="flex items-center justify-center gap-2 ">
//               <LockKeyhole size={20} />
//               Update Password
//             </div>
//           </motion.button>
//         </form>
//       </motion.div>
//     </div>
//   );
// }

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LockKeyhole, ShieldCheck, Eye, EyeOff } from 'lucide-react';

export default function ChangePassword({ email }) {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [showPasswords, setShowPasswords] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { currentPassword, newPassword, confirmPassword } = formData;

    if (!currentPassword || !newPassword || !confirmPassword) {
      alert('Please fill all fields.');
      return;
    }

    if (newPassword !== confirmPassword) {
      alert('New password do not match with Confirm password.');
      return;
    }

    const payload = {
      email,
      currentPassword,
      newPassword,
    };

    try {
      const response = await fetch('http://127.0.0.1:8000/api/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(`Error: ${errorData.message || 'Failed to change password'}`);
        return;
      }

      alert('Password changed successfully!');
    } catch (error) {
      console.error('Error:', error);
      alert('An unexpected error occurred.');
    }
  };

  const toggleVisibility = (field) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  return (
    <div className="min-h-screen  overflow-hidden flex items-center justify-center bg-gradient-to-br from-white-200 to-white-100 p-6">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-xl"
      >
        <div className="flex flex-col items-center mb-8">
          <ShieldCheck className="w-15 pt-4 h-15 text-sky-600 mb-2" />
          <h1 className="text-3xl font-bold text-gray-800">Change Password</h1>
          <p className="text-gray-500 text-sm text-center">
            Keep your account secure by updating your password regularly.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-6 w-full p-4">
          <div className="flex items-center gap-3 w-full">
            <label className="text-sm font-medium text-gray-700 w-1/3 text-right">Current Password</label>
            <div className="relative w-2/3">
              <input
                type={showPasswords.currentPassword ? 'text' : 'password'}
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                placeholder="Enter current password"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
              />
              <span
                className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 cursor-pointer"
                onClick={() => toggleVisibility('currentPassword')}
              >
                {showPasswords.currentPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full">
            <label className="text-sm font-medium text-gray-700 w-1/3 text-right">New Password</label>
            <div className="relative w-2/3">
              <input
                type={showPasswords.newPassword ? 'text' : 'password'}
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                placeholder="Enter new password"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
              />
              <span
                className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 cursor-pointer"
                onClick={() => toggleVisibility('newPassword')}
              >
                {showPasswords.newPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full">
            <label className="text-sm font-medium text-gray-700 w-1/3 text-right">Confirm Password</label>
            <div className="relative w-2/3">
              <input
                type={showPasswords.confirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm new password"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
              />
              <span
                className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 cursor-pointer"
                onClick={() => toggleVisibility('confirmPassword')}
              >
                {showPasswords.confirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="bg-gradient-to-r from-sky-500 to-sky-700 w-1/2 text-white font-semibold py-3 px-6 rounded-xl shadow-md mt-4 "
          >
            <div className="flex items-center justify-center gap-2 ">
              <LockKeyhole size={20} />
              Update Password
            </div>
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}

