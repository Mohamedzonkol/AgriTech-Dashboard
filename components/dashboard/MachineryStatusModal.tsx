"use client";

import { Tractor, Droplet, Calendar, X, Wrench, Clock } from "lucide-react";
import React, { useEffect, useState } from "react";

const MachineryStatusModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [machines] = useState([
    { id: 1, name: "Tractor A", status: "active", fuel: 78, lastMaintenance: "2023-10-15", hoursUsed: 248 },
    { id: 2, name: "Harvester B", status: "idle", fuel: 45, lastMaintenance: "2023-09-28", hoursUsed: 187 },
    { id: 3, name: "Irrigation Pump", status: "maintenance", fuel: 0, lastMaintenance: "2023-11-02", hoursUsed: 312 }
  ]);
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
        <button
        onClick={() => setIsOpen(true)}
  className="relative bg-gradient-to-br from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white py-3 px-4 rounded-xl flex flex-col items-center transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/20 hover:-translate-y-0.5"
        >
        <Tractor className="w-6 h-6 mb-1" />
        <span>Check Machinery</span>
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white p-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800 flex items-center">
                <Tractor className="w-5 h-5 mr-2" />
                Machinery Status
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
              <div className="space-y-4">
                {machines.map(machine => (
                  <div key={machine.id} className="border rounded-lg p-4 hover:bg-gray-50 transition">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium text-lg">{machine.name}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        machine.status === 'active' ? 'bg-green-100 text-green-800' :
                        machine.status === 'idle' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {machine.status.toUpperCase()}
                      </span>
                    </div>
                    
                    <div className="mt-4 grid grid-cols-2 gap-4">
                      <div className="flex items-center">
                        <Droplet className="w-5 h-5 mr-2 text-blue-500" />
                        <div>
                          <p className="text-sm text-gray-500">Fuel Level</p>
                          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                            <div 
                              className={`h-2.5 rounded-full ${
                                machine.fuel > 50 ? 'bg-green-500' : 
                                machine.fuel > 20 ? 'bg-yellow-500' : 'bg-red-500'
                              }`} 
                              style={{width: `${machine.fuel}%`}}
                            ></div>
                          </div>
                          <p className="text-sm mt-1">{machine.fuel}% remaining</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <Wrench className="w-5 h-5 mr-2 text-amber-500" />
                        <div>
                          <p className="text-sm text-gray-500">Last Maintenance</p>
                          <p className="font-medium">{machine.lastMaintenance}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 mr-2 text-purple-500" />
                        <div>
                          <p className="text-sm text-gray-500">Hours Used</p>
                          <p className="font-medium">{machine.hoursUsed} hrs</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <Calendar className="w-5 h-5 mr-2 text-green-500" />
                        <div>
                          <p className="text-sm text-gray-500">Next Service</p>
                          <p className="font-medium">Due in {Math.floor(Math.random() * 30) + 1} days</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-3 border-t flex justify-between">
                      <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                        View Usage History
                      </button>
                      <button className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg">
                        Schedule Service
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                <h3 className="font-medium text-blue-800 mb-2">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-2">
                  <button className="bg-white hover:bg-blue-100 text-blue-800 py-2 px-3 rounded-lg border border-blue-200 text-sm">
                    Request Fuel Delivery
                  </button>
                  <button className="bg-white hover:bg-blue-100 text-blue-800 py-2 px-3 rounded-lg border border-blue-200 text-sm">
                    Report Issue
                  </button>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-white p-4 border-t border-gray-200 flex justify-end">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-gray-800 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MachineryStatusModal;