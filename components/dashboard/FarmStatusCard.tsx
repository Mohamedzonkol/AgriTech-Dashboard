import { Tractor } from "lucide-react";
import { useFarmStatusData } from "../../hooks/useFarmStatusData";
import React from "react";

const FarmStatusCard = () => {
  const { farmStatus, loading, error } = useFarmStatusData();

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 animate-pulse space-y-4">
        <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-6 bg-gray-100 rounded mb-4 last:mb-0"></div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-red-500 transition-transform duration-300 hover:scale-105">
        <div className="flex items-center text-red-500">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-lg font-semibold">Error loading farm data</h2>
        </div>
        <p className="mt-2 text-gray-600">{error.message}</p>
      </div>
    );
  }



  return (
    <div className="bg-white rounded-xl shadow-lg p-6 transition-transform duration-300 hover:scale-105 hover:shadow-xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Farm Status</h2>
        <div className="p-3 bg-green-100 rounded-full">
          <Tractor className="text-green-600 w-6 h-6" />
        </div>
      </div>
      <div className="space-y-3 ">
        <div className="flex justify-between items-center py-2 border-b">
        <span className="flex items-center font-medium text-gray-600">  
        <div className="w-3 h-3 rounded-full bg-green-500 mr-2 "></div>
            Active Machines
          </span>
          <span className="font-bold">{farmStatus?.activeMachines}/5</span>
        </div>
    
        <div className="flex justify-between items-center py-2 border-b">
        <span className="font-medium text-gray-600">Crop Health</span>
          <span className="font-bold text-green-600">{farmStatus?.cropHealth}</span>
        </div>
        <div className="flex justify-between items-center py-2 border-b">
        <span className="font-medium text-gray-600">Irrigation Status</span>
          <span className="font-bold text-blue-600">
            {farmStatus?.irrigationStatus}
          </span>
        </div>
        <div className="flex justify-between items-center py-2 border-b">
        <span className="font-medium text-gray-600">Soil Quality</span>
          <span className="font-bold text-yellow-600">
            {farmStatus?.soilQuality}
          </span>
        </div>
        <div className="flex justify-between items-center py-2 border-b">
        <span className="font-medium text-gray-600">Pest Risk</span>
          <span className="font-bold text-red-600">{farmStatus?.pestRisk}</span>
        </div>
        <div className="flex justify-between items-center py-2">
          <span className="font-medium text-gray-600">Water Reservoir</span>
          <div className="w-20 bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full"
              style={{ width: `${farmStatus?.waterReservoir}%` }}
            ></div>
          </div>
          <span className="font-bold">{farmStatus?.waterReservoir}%</span>
        </div>
      </div>
    </div>
  );
};

export default FarmStatusCard;