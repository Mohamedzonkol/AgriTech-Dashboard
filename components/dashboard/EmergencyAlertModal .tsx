"use client";
import {
  AlertTriangle, X, Phone, MapPin, Clock,
  HeartPulse, Wrench, Flame, Cloud, Loader2, Check
} from "lucide-react";
import React, { useState, useEffect } from "react";
import { useAlertData } from "@/hooks/useAlertData";
import { EmergencyType, SeverityType } from "../../utils/types";

const EmergencyAlertModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [emergencyType, setEmergencyType] = useState<EmergencyType>(EmergencyType.EquipmentFailure);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<SeverityType>(SeverityType.Medium);
  const {
    addAlert,
    loading: isSubmitting,
    error: submitError,
    fetchAlerts
  } = useAlertData();

  // Farm coordinates (replace with dynamic values if available)
  const latitude = 30.802498;
  const longitude = 26.820553;
  const locationDescription = "Farm Field #3, North Section";

  const emergencyTypes = [
    { id: EmergencyType.EquipmentFailure, label: "Equipment Failure", icon: <Wrench className="w-5 h-5 mr-2" /> },
    { id: EmergencyType.MedicalEmergency, label: "Medical Emergency", icon: <HeartPulse className="w-5 h-5 mr-2" /> },
    { id: EmergencyType.Fire, label: "Fire", icon: <Flame className="w-5 h-5 mr-2" /> },
    { id: EmergencyType.SevereWeather, label: "Severe Weather", icon: <Cloud className="w-5 h-5 mr-2" /> },
    { id: EmergencyType.Pest, label: "Pest Infestation", icon: <AlertTriangle className="w-5 h-5 mr-2" /> },
    { id: EmergencyType.Irrigation, label: "Irrigation Issue", icon: <Wrench className="w-5 h-5 mr-2" /> },
    { id: EmergencyType.Soil, label: "Soil Quality Issue", icon: <Check className="w-5 h-5 mr-2" /> },
    { id: EmergencyType.Other, label: "Other", icon: <AlertTriangle className="w-5 h-5 mr-2" /> },
  ];

  const severityLevels = [
    { id: SeverityType.Low, label: "Low", color: "bg-yellow-100 text-yellow-800" },
    { id: SeverityType.Medium, label: "Medium", color: "bg-orange-100 text-orange-800" },
    { id: SeverityType.High, label: "High", color: "bg-red-100 text-red-800" },
  ];

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  const handleSubmit = async () => {
    if (!message.trim()) {
      alert("Please provide emergency details");
      return;
    }

    const alertData = {
      type: emergencyType,
      message: message,
      severity: severity,
      latitude: latitude,
      longitude: longitude,
      locationDescription: locationDescription,
      createdAt: new Date(),
    };

    try {
      await addAlert(alertData);
      setMessage("");
      setEmergencyType(EmergencyType.EquipmentFailure);
      setSeverity(SeverityType.Medium);
      setTimeout(() => setIsOpen(false), 1500);
    } catch (error) {
      console.error("Error submitting alert:", error.message);
    }
  };

  const handleViewHistory = async () => {
    try {
      await fetchAlerts();
      // Here you would typically navigate to an alerts history page
      // or show the history in a modal
      alert("Viewing alert history - implement this functionality");
    } catch (error) {
      console.error("Error fetching alerts:", error);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="relative bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 col-span-2 text-white py-3 px-6 rounded-xl flex flex-col items-center transition-all duration-300 hover:shadow-lg hover:shadow-red-500/20 hover:-translate-y-0.5"
      >
        <AlertTriangle className="w-6 h-6 mb-1" />
        <span>Emergency Alert</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white p-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800 flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2 text-red-500" />
                Emergency Alert
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700"
                disabled={isSubmitting}
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Emergency Type
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {emergencyTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setEmergencyType(type.id)}
                      disabled={isSubmitting}
                      className={`p-3 rounded-lg border flex items-center justify-center ${emergencyType === type.id
                        ? "border-red-500 bg-red-50 text-red-700"
                        : "border-gray-200 hover:bg-gray-50"
                        } ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                      {type.icon}
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Severity Level
                </label>
                <div className="flex gap-3">
                  {severityLevels.map((level) => (
                    <button
                      key={level.id}
                      onClick={() => setSeverity(level.id)}
                      disabled={isSubmitting}
                      className={`px-4 py-2 rounded-lg border flex-1 text-center ${severity === level.id
                        ? `${level.color} border-transparent`
                        : "border-gray-200 hover:bg-gray-50"
                        } ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                      {level.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Details
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe the emergency..."
                  className="w-full p-3 border rounded-lg h-32"
                  disabled={isSubmitting}
                />
              </div>

              <div className="bg-red-50 border border-red-100 rounded-lg p-4 mb-6">
                <h3 className="font-medium text-red-800 mb-2 flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  Your Location
                </h3>
                <p className="text-sm text-red-700">
                  Latitude: {latitude}, Longitude: {longitude}
                </p>
                <p className="text-sm text-red-700 mt-1">
                  Nearest address: {locationDescription}
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                <h3 className="font-medium text-blue-800 mb-2 flex items-center">
                  <Phone className="w-5 h-5 mr-2" />
                  Emergency Contacts
                </h3>
                <ul className="text-sm text-blue-700 space-y-2">
                  <li className="flex justify-between">
                    <span>Local Emergency Services</span>
                    <span className="font-medium">911</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Farm Manager</span>
                    <span className="font-medium">(555) 123-4567</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Safety Officer</span>
                    <span className="font-medium">(555) 987-6543</span>
                  </li>
                </ul>
              </div>

              {submitError && (
                <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-3 text-red-700">
                  {submitError}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-white p-4 border-t border-gray-200 flex justify-between">
              <button
                onClick={handleViewHistory}
                disabled={isSubmitting}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-gray-800 transition disabled:opacity-50 flex items-center"
              >
                <Clock className="w-5 h-5 mr-2" />
                View Alert History
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition flex items-center disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <AlertTriangle className="w-5 h-5 mr-2" />
                    Send Emergency Alert
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EmergencyAlertModal;