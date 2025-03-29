"use client";
import React from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
  className?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  onRetry,
  className = "",
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`bg-orange-100 dark:bg-orange-900/80 border border-orange-400 dark:border-orange-700 text-orange-900 dark:text-orange-200 rounded-2xl p-6 shadow-lg ${className}`}
      role="alert"
      aria-live="assertive"
    >
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="relative">
          <div className="w-12 h-12 bg-gradient-to-br from-red-100 to-red-50 dark:from-red-900/20 dark:to-red-800/10 rounded-full flex items-center justify-center">
            <AlertTriangle
              className="w-6 h-6 text-red-500 dark:text-red-400"
              aria-hidden="true"
            />
          </div>
          <div className="absolute -inset-2 border-2 border-red-200 dark:border-red-900/20 rounded-full animate-pulse"></div>
        </div>

        <div className="text-center space-y-1">
          <h3 className="text-lg font-semibold text-red-800 dark:text-red-200">
            Operation Failed
          </h3>
          <p className="text-red-600 dark:text-red-300/90">{message}</p>
        </div>

        {onRetry && (
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={onRetry}
            className="mt-2 px-5 py-2.5 bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white rounded-full text-sm font-medium inline-flex items-center gap-2 shadow-md hover:shadow-lg transition-all"
            aria-label="Retry operation"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export default ErrorMessage;
