import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SuccessIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const ErrorIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const Toast = ({ message, type = 'error', onClose }) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  const isSuccess = type === 'success';

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed top-5 right-5 z-50 flex items-center max-w-sm w-full p-4 rounded-lg shadow-lg bg-slate-800 border border-slate-700 text-slate-300"
          role="alert"
        >
          <div className={`inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg ${
            isSuccess ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
          }`}>
            {isSuccess ? <SuccessIcon /> : <ErrorIcon />}
          </div>
          <div className="ml-3 text-sm font-normal flex-1">{message}</div>
          <button
            type="button"
            className="ml-4 -mx-1.5 -my-1.5 bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg focus:ring-2 focus:ring-slate-600 p-1.5 inline-flex h-8 w-8"
            onClick={onClose}
            aria-label="Close"
          >
            <span className="sr-only">Close</span>
            <CloseIcon />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
