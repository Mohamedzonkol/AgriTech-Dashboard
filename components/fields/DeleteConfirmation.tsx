"use client";
import React from "react";
import { motion } from "framer-motion";

interface DeleteConfirmationProps {
  fieldName: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteConfirmation = ({ fieldName, onConfirm, onCancel }: DeleteConfirmationProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.2 }}
        className="bg-white dark:bg-gray-900 shadow-xl rounded-lg p-6 w-full max-w-md"
      >
        <h3 className="text-xl font-semibold text-red-600 mb-4">Confirm Deletion</h3>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
        {`Are you sure you want to delete "${fieldName}"? This action cannot be undone.`}
        </p>

        <div className="flex justify-end space-x-2">
          <button
            className="px-4 py-2 border rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default DeleteConfirmation;
