"use client";

import { Droplet, X, Clock, Gauge, Calendar } from "lucide-react";
import React, { useEffect, useState } from "react";

const StartIrrigationModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [duration, setDuration] = useState(60);
  const [zone, setZone] = useState("north");
  const [schedule, setSchedule] = useState("now");

  const irrigationZones = [
    { id: "north", label: "North Field" },
    { id: "south", label: "South Field" },
    { id: "east", label: "East Field" },
    { id: "west", label: "West Field" },
  ];
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  
    // Cleanup in case the component unmounts while modal is open
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);
  return (
    <>
      {/* Button to open the modal */}
      <button
        onClick={() => setIsOpen(true)}
        className="relative bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 px-6 rounded-xl flex flex-col items-center transition-all duration-300 hover:shadow-lg hover:shadow-green-500/20 hover:-translate-y-0.5"
        >
        <Droplet className="w-6 h-6 mb-1" />
        <span>Start Irrigation</span>
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white p-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800 flex items-center">
                <Droplet className="w-5 h-5 mr-2 text-green-500" />
                Irrigation Control
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Irrigation Zone
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {irrigationZones.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setZone(item.id)}
                      className={`p-3 rounded-lg border flex items-center justify-center ${
                        zone === item.id
                          ? "border-green-500 bg-green-50 text-green-700"
                          : "border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Duration: {duration} minutes
                </label>
                <input
                  type="range"
                  min="5"
                  max="240"
                  step="5"
                  value={duration}
                  onChange={(e) => setDuration(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>5 min</span>
                  <span>4 hours</span>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Schedule
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setSchedule("now")}
                    className={`p-3 rounded-lg border flex flex-col items-center ${
                      schedule === "now"
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    <Clock className="w-5 h-5 mb-1" />
                    Start Now
                  </button>
                  <button
                    onClick={() => setSchedule("later")}
                    className={`p-3 rounded-lg border flex flex-col items-center ${
                      schedule === "later"
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    <Calendar className="w-5 h-5 mb-1" />
                    Schedule Later
                  </button>
                </div>
              </div>

              {schedule === "later" && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Time
                  </label>
                  <input
                    type="datetime-local"
                    className="w-full p-3 border rounded-lg"
                  />
                </div>
              )}

              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                <h3 className="font-medium text-blue-800 mb-2 flex items-center">
                  <Gauge className="w-5 h-5 mr-2" />
                  Current Soil Conditions
                </h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-gray-600">Moisture:</span>{" "}
                    <span className="font-medium">32%</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Last watered:</span>{" "}
                    <span className="font-medium">2 days ago</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Water needed:</span>{" "}
                    <span className="font-medium text-green-600">25mm</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Forecast:</span>{" "}
                    <span className="font-medium">No rain (3 days)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-white p-4 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-gray-800 transition"
              >
                Cancel
              </button>
              <button className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition flex items-center">
                <Droplet className="w-5 h-5 mr-2" />
                {schedule === "now" ? "Start Irrigation" : "Schedule Irrigation"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default StartIrrigationModal;