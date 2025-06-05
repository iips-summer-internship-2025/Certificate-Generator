import React from 'react';
import { motion } from 'framer-motion';
import { Loader2, Sparkles } from 'lucide-react';

export default function Loader({ message = "Generating Certificates..." }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-700 to-blue-200">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        className="bg-white rounded-3xl shadow-2xl p-10 max-w-md w-full flex flex-col items-center justify-center gap-6 text-center"
      >
        {/* Spinning Loader Icon */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          className='p-4'
        >
          <Loader2 className="w-16 h-16 text-sky-500" />
        </motion.div>

        {/* Animated Sparkles Icon */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <Sparkles className="w-6 h-6 text-yellow-500 animate-pulse" />
        </motion.div>

        {/* Loading Message */}
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="text-xl font-semibold text-gray-700"
        >
          {message}
        </motion.h2>

        <p className="text-sm text-gray-500">
          This might take a few moments. Hang tight while we prepare your certificates.
        </p>
      </motion.div>
    </div>
  );
}
