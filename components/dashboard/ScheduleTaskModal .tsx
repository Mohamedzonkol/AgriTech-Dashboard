"use client";
import { Calendar, X, Clock, CheckCircle, User, Tractor, FlaskConical, Droplet, Wheat, Wrench } from "lucide-react";
import React, { useEffect, useState } from "react";

const ScheduleTaskModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [taskType, setTaskType] = useState("irrigation");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [assignedTo, setAssignedTo] = useState("");

  const taskTypes = [
    { id: "irrigation", label: "Irrigation", icon: <Droplet className="w-5 h-5 mr-2" /> },
    { id: "harvest", label: "Harvest", icon: <Wheat className="w-5 h-5 mr-2" /> },
    { id: "fertilize", label: "Fertilize", icon: <FlaskConical className="w-5 h-5 mr-2" /> },
    { id: "maintenance", label: "Maintenance", icon: <Wrench className="w-5 h-5 mr-2" /> },
  ];

  const teamMembers = [
    { id: "1", name: "Mohamed Elsayed" },
    { id: "2", name: "Ahmed Hassan" },
    { id: "3", name: "Fatima Mahmoud" },
    { id: "4", name: "Omar Ibrahim" },
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
        className="bg-purple-500 hover:bg-purple-600 text-white py-3 px-4 rounded-lg flex flex-col items-center transition-transform hover:scale-105 duration-300"
      >
        <Calendar className="w-6 h-6 mb-1" />
        <span>Schedule Task</span>
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white p-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-purple-500" />
                Schedule New Task
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
                  Task Type
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {taskTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setTaskType(type.id)}
                      className={`p-3 rounded-lg border flex items-center justify-center ${
                        taskType === type.id
                          ? "border-purple-500 bg-purple-50 text-purple-700"
                          : "border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      {type.icon}
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full p-3 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Time
                  </label>
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full p-3 border rounded-lg"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Assign To
                </label>
                <select
                  value={assignedTo}
                  onChange={(e) => setAssignedTo(e.target.value)}
                  className="w-full p-3 border rounded-lg"
                >
                  <option value="">Select team member</option>
                  {teamMembers.map((member) => (
                    <option key={member.id} value={member.id}>
                      {member.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h3 className="font-medium text-gray-700 mb-2 flex items-center">
                  <Tractor className="w-5 h-5 mr-2" />
                  Equipment Needed
                </h3>
                <div className="space-y-2">
                  {taskType === "irrigation" && (
                    <>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        Irrigation Pump
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        Water Hoses
                      </label>
                    </>
                  )}
                  {taskType === "harvest" && (
                    <>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        Harvester
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        Transport Trailer
                      </label>
                    </>
                  )}
                  {/* Add other equipment options for different task types */}
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
              <button className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition flex items-center">
                <CheckCircle className="w-5 h-5 mr-2" />
                Schedule Task
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default ScheduleTaskModal;