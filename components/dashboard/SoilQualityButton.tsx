"use client";
import {
  AlertTriangle,
  BarChart2,
  Calendar,
  Droplet,
  Tractor,
  Gauge,
  Leaf,
  Layers,
  FlaskConical,
  X,
  Loader2,
} from "lucide-react";
import React, { useState, useEffect } from "react";

interface SoilData {
  moisture: {
    value: number;
    available: boolean;
    unit: string | null;
  };
  ph: {
    value: number;
    available: boolean;
    unit: string | null;
  };
  clayContent: {
    value: number;
    available: boolean;
    unit: string | null;
  };
  organicCarbon: {
    value: number;
    available: boolean;
    unit: string | null;
  };
  qualityRating: string;
}

const SoilQualityButton = ({ latitude, longitude }: { latitude: number; longitude: number }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [soilData, setSoilData] = useState<SoilData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSoilData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://crop-pilot-api.azurewebsites.net/api/Dashbored/Soil/Report?latitude=${latitude}&longitude=${longitude}`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.succeeded && data.data) {
        // Add default units if not provided
        const processedData = {
          ...data.data,
          moisture: {
            ...data.data.moisture,
            unit: data.data.moisture.unit || "%",
          },
          ph: {
            ...data.data.ph,
            unit: data.data.ph.unit || "pH",
          },
          clayContent: {
            ...data.data.clayContent,
            unit: data.data.clayContent.unit || "g/kg",
          },
          organicCarbon: {
            ...data.data.organicCarbon,
            unit: data.data.organicCarbon.unit || "g/kg",
          },
        };
        setSoilData(processedData);
      } else {
        throw new Error(data.message || "Failed to fetch soil data");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
      console.error("Error fetching soil data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchSoilData();
      document.body.classList.add("overflow-hidden");
    }
    else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  const getRatingColor = (rating: string) => {
    switch (rating.toLowerCase()) {
      case "excellent":
        return "bg-emerald-100 text-emerald-800";
      case "good":
        return "bg-green-100 text-green-800";
      case "fair":
        return "bg-yellow-100 text-yellow-800";
      case "poor":
        return "bg-orange-100 text-orange-800";
      case "bad":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <>
      {/* Button to open the soil report */}
      <button
        onClick={() => setIsOpen(true)}
        className="bg-amber-500 hover:bg-amber-600 text-white py-3 px-4 rounded-lg flex flex-col col-span-2 items-center transition-transform hover:scale-105 duration-300"
      >
        <Layers className="w-6 h-6 mb-1" />
        <span>Soil Report</span>
      </button>

      {/* Soil Report Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white p-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800">Soil Quality Report</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-8">
                  <Loader2 className="w-8 h-8 text-amber-500 animate-spin mb-4" />
                  <p className="text-gray-600">Loading soil data...</p>
                </div>
              ) : error ? (
                <div className="bg-red-50 border border-red-100 rounded-lg p-4">
                  <h3 className="font-medium text-red-800 flex items-center mb-2">
                    <AlertTriangle className="w-5 h-5 mr-2" />
                    Error Loading Data
                  </h3>
                  <p className="text-red-700">{error}</p>
                  <button
                    onClick={fetchSoilData}
                    className="mt-3 px-4 py-2 bg-red-100 hover:bg-red-200 text-red-800 rounded-lg transition"
                  >
                    Retry
                  </button>
                </div>
              ) : soilData ? (
                <>
                  <div className="flex justify-between items-start mb-6">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Soil Analysis
                    </h3>
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getRatingColor(
                        soilData.qualityRating
                      )}`}
                    >
                      {soilData.qualityRating} Quality
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Moisture */}
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                      <div className="flex items-center mb-2">
                        <Droplet className="w-5 h-5 text-blue-500 mr-2" />
                        <h3 className="font-medium text-gray-700">Moisture</h3>
                      </div>
                      <div className="flex items-end justify-between">
                        <p className="text-2xl font-bold text-gray-800">
                          {soilData.moisture.value}
                          <span className="text-sm font-normal text-gray-500 ml-1">
                            {soilData.moisture.unit}
                          </span>
                        </p>
                        <p className="text-sm text-gray-500">
                          {soilData.moisture.value < 3
                            ? "Low"
                            : soilData.moisture.value < 6
                            ? "Moderate"
                            : "High"}
                        </p>
                      </div>
                    </div>

                    {/* pH Level */}
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                      <div className="flex items-center mb-2">
                        <Gauge className="w-5 h-5 text-purple-500 mr-2" />
                        <h3 className="font-medium text-gray-700">pH Level</h3>
                      </div>
                      <div className="flex items-end justify-between">
                        <p className="text-2xl font-bold text-gray-800">
                          {soilData.ph.value}
                          <span className="text-sm font-normal text-gray-500 ml-1">
                            {soilData.ph.unit}
                          </span>
                        </p>
                        <p className="text-sm text-gray-500">
                          {soilData.ph.value < 6.5
                            ? "Acidic"
                            : soilData.ph.value > 7.5
                            ? "Alkaline"
                            : "Neutral"}
                        </p>
                      </div>
                    </div>

                    {/* Clay Content */}
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                      <div className="flex items-center mb-2">
                        <Layers className="w-5 h-5 text-amber-500 mr-2" />
                        <h3 className="font-medium text-gray-700">Clay Content</h3>
                      </div>
                      <div className="flex items-end justify-between">
                        <p className="text-2xl font-bold text-gray-800">
                          {soilData.clayContent.value}
                          <span className="text-sm font-normal text-gray-500 ml-1">
                            {soilData.clayContent.unit}
                          </span>
                        </p>
                        <p className="text-sm text-gray-500">
                          {soilData.clayContent.value < 200
                            ? "Low"
                            : soilData.clayContent.value < 400
                            ? "Moderate"
                            : "High"}
                        </p>
                      </div>
                    </div>

                    {/* Organic Carbon */}
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                      <div className="flex items-center mb-2">
                        <Leaf className="w-5 h-5 text-green-500 mr-2" />
                        <h3 className="font-medium text-gray-700">Organic Carbon</h3>
                      </div>
                      <div className="flex items-end justify-between">
                        <p className="text-2xl font-bold text-gray-800">
                          {soilData.organicCarbon.value}
                          <span className="text-sm font-normal text-gray-500 ml-1">
                            {soilData.organicCarbon.unit}
                          </span>
                        </p>
                        <p className="text-sm text-gray-500">
                          {soilData.organicCarbon.value < 100
                            ? "Low"
                            : soilData.organicCarbon.value < 200
                            ? "Moderate"
                            : "High"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Recommendations */}
                  <div className="mt-6 bg-amber-50 border border-amber-100 rounded-lg p-4">
                    <h3 className="font-medium text-amber-800 flex items-center mb-2">
                      <FlaskConical className="w-4 h-4 mr-2" />
                      Recommendations
                    </h3>
                    <ul className="list-disc list-inside text-sm text-amber-800 space-y-1">
                      {soilData.ph.value > 7.5 && (
                        <li>Consider adding sulfur to lower pH</li>
                      )}
                      {soilData.ph.value < 6 && (
                        <li>Consider adding lime to raise pH</li>
                      )}
                      {soilData.moisture.value < 3 && (
                        <li>Irrigation recommended to increase moisture</li>
                      )}
                      {soilData.organicCarbon.value < 150 && (
                        <li>Add organic compost to improve carbon content</li>
                      )}
                      {soilData.qualityRating === "Poor" && (
                        <li>Soil amendment strongly recommended</li>
                      )}
                    </ul>
                  </div>

                  {/* Location Info */}
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-100">
                    <h3 className="font-medium text-gray-700 mb-2">
                      Location Details
                    </h3>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Latitude:</span> {latitude}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Longitude:</span> {longitude}
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                      Last updated: {new Date().toLocaleString()}
                    </p>
                  </div>
                </>
              ) : null}
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-white p-4 border-t border-gray-200 flex justify-end">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-gray-800 transition"
              >
                Close
              </button>
              {!loading && (
                <button
                  onClick={fetchSoilData}
                  className="px-4 py-2 bg-amber-100 hover:bg-amber-200 text-amber-800 rounded-lg transition ml-2"
                >
                  Refresh Data
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SoilQualityButton;