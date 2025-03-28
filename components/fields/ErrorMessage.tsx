"use client";
import React from "react";
import { AlertTriangle } from "lucide-react";

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  return (
    <div 
      className="bg-red-50 border border-red-200 rounded-lg p-6 text-center"
      role="alert"
      aria-live="assertive"
    >
      <div className="flex flex-col items-center justify-center gap-3">
        <AlertTriangle className="w-10 h-10 text-red-500" aria-hidden="true" />
        <h3 className="text-lg font-medium text-red-800">Something went wrong</h3>
        <p className="text-red-600 mb-4">{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg inline-flex items-center gap-2 transition-colors"
            aria-label="Retry loading fields"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;