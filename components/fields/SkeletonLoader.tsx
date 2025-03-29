"use client";
import React from "react";
import { motion } from "framer-motion";

interface SkeletonLoaderProps {
  count?: number;
  className?: string;
  cardClassName?: string;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  count = 3,
  className = "",
  cardClassName = "",
}) => {
  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 ${className}`}
    >
      {Array.from({ length: count }).map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0.5, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          className={`relative overflow-hidden rounded-2xl border border-gray-100 dark:border-gray-800/50 bg-white/80 dark:bg-gray-800/30 backdrop-blur-sm shadow-sm ${cardClassName}`}
          aria-label="Loading content"
        >
          {/* Shimmer effect */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-gray-100/30 dark:via-gray-700/20 to-transparent animate-[shimmer_1.5s_infinite]" />
          </div>

          {/* Header */}
          <div className="p-5 border-b border-gray-100 dark:border-gray-700/30">
            <div className="flex justify-between items-center mb-3">
              <div className="h-5 bg-gray-200/70 dark:bg-gray-700/50 rounded-full w-3/4 animate-pulse" />
              <div className="h-4 bg-gray-200/50 dark:bg-gray-700/30 rounded-full w-16 animate-pulse" />
            </div>
            <div className="h-3.5 bg-gray-200/50 dark:bg-gray-700/30 rounded-full w-1/2 animate-pulse" />
          </div>

          {/* Content */}
          <div className="p-5 space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex justify-between items-center">
                <div className="h-3 bg-gray-200/40 dark:bg-gray-700/20 rounded-full w-1/4 animate-pulse" />
                <div className="h-3.5 bg-gray-200/60 dark:bg-gray-700/40 rounded-full w-1/3 animate-pulse" />
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="px-5 py-4 border-t border-gray-100 dark:border-gray-700/30 flex justify-end gap-3">
            <div className="h-8 bg-gray-200/60 dark:bg-gray-700/40 rounded-full w-16 animate-pulse" />
            <div className="h-8 bg-gray-300/70 dark:bg-gray-600/50 rounded-full w-16 animate-pulse" />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
