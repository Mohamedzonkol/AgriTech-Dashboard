"use client";
import React from "react";

interface SkeletonLoaderProps {
  count?: number;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ count = 3 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <div 
          key={index}
          className="border rounded-xl overflow-hidden shadow-sm bg-white"
          aria-label="Loading field data"
        >
          <div className="bg-gray-100 p-4 border-b animate-pulse">
            <div className="flex justify-between items-center">
              <div className="h-6 bg-gray-200 rounded w-3/4"></div>
              <div className="h-5 bg-gray-200 rounded-full w-16"></div>
            </div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mt-2"></div>
          </div>
          
          <div className="p-4 space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex justify-between py-2">
                <div className="h-4 bg-gray-100 rounded w-1/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
              </div>
            ))}
          </div>
          
          <div className="bg-gray-50 px-4 py-3 border-t flex justify-end gap-4">
            <div className="h-8 bg-gray-200 rounded w-16"></div>
            <div className="h-8 bg-gray-200 rounded w-16"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;