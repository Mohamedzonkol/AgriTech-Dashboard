import {
  AlertTriangle,
  BarChart2,
  Calendar,
  Droplet,
  Tractor,
} from "lucide-react";
import React from "react";

// Add this at the top

const QuickActions = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 col-span-1">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
      <div className="grid grid-cols-2 gap-4">
        <button className="bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg flex flex-col items-center transition">
          <Droplet className="w-6 h-6 mb-1" />
          <span>Start Irrigation</span>
        </button>
        <button className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg flex flex-col items-center transition">
          <Tractor className="w-6 h-6 mb-1" />
          <span>Check Machinery</span>
        </button>
        <button className="bg-yellow-500 hover:bg-yellow-600 text-white py-3 px-4 rounded-lg flex flex-col items-center transition">
          <BarChart2 className="w-6 h-6 mb-1" />
          <span>Crop Analysis</span>
        </button>
        <button className="bg-purple-500 hover:bg-purple-600 text-white py-3 px-4 rounded-lg flex flex-col items-center transition">
          <Calendar className="w-6 h-6 mb-1" />
          <span>Schedule Task</span>
        </button>
        <button className="bg-red-500 hover:bg-red-600 text-white py-3 px-4 rounded-lg flex flex-col items-center transition col-span-2">
          <AlertTriangle className="w-6 h-6 mb-1" />
          <span>Emergency Alert</span>
        </button>
      </div>
    </div>
  );
};
export default QuickActions;
