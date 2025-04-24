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
      <button
        onClick={() => setIsOpen(true)}
        className="relative bg-gradient-to-br from-amber-500 col-span-2 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white py-3 px-6 rounded-xl flex flex-col items-center transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/20 hover:-translate-y-0.5"
      >
        <div className="absolute -top-2 -right-2 bg-white text-amber-600 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shadow-sm">
          Api
        </div>
        <Layers className="w-6 h-6 mb-1" />
        <span className="font-medium">Soil Report</span>
      </button>

      {/* Soil Report Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto transition-all duration-300 transform">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white p-5 border-b border-gray-100 flex justify-between items-center rounded-t-2xl">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Soil Quality Report</h2>
                <p className="text-sm text-gray-500">AI-powered soil analysis</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200 p-1 rounded-full hover:bg-gray-100"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="relative">
                    <Layers className="w-10 h-10 text-amber-500 opacity-30" />
                    <Loader2 className="w-6 h-6 text-amber-500 animate-spin absolute inset-0 m-auto" />
                  </div>
                  <p className="text-gray-500 mt-4">Analyzing soil data...</p>
                </div>
              ) : error ? (
                <div className="bg-red-50 border border-red-100 rounded-xl p-5 animate-fade-in">
                  <h3 className="font-medium text-red-800 flex items-center mb-2">
                    <AlertTriangle className="w-5 h-5 mr-2" />
                    Error Loading Data
                  </h3>
                  <p className="text-red-700">{error}</p>
                  <button
                    onClick={fetchSoilData}
                    className="mt-3 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-800 rounded-lg transition flex items-center"
                  >
                    <Loader2 className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : 'hidden'}`} />
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
                    <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
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
                    <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
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
                    <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
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
                    <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
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
                  <div className="mt-6 bg-amber-50 border border-amber-100 rounded-xl p-5">
                    <h3 className="font-medium text-amber-800 flex items-center mb-3">
                      <FlaskConical className="w-5 h-5 mr-2" />
                      AI Recommendations
                    </h3>
                    <ul className="space-y-2">
                      {soilData.ph.value > 7.5 && (
                        <li className="flex items-start">
                          <span className="flex-shrink-0 bg-amber-100 text-amber-800 rounded-full p-1 mr-2">
                            <Gauge className="w-3 h-3" />
                          </span>
                          <span>Consider adding sulfur to lower pH</span>
                        </li>
                      )}
                      {soilData.ph.value < 6 && (
                        <li className="flex items-start">
                          <span className="flex-shrink-0 bg-amber-100 text-amber-800 rounded-full p-1 mr-2">
                            <Gauge className="w-3 h-3" />
                          </span>
                          <span>Consider adding lime to raise pH</span>
                        </li>
                      )}
                      {soilData.moisture.value < 3 && (
                        <li className="flex items-start">
                          <span className="flex-shrink-0 bg-amber-100 text-amber-800 rounded-full p-1 mr-2">
                            <Droplet className="w-3 h-3" />
                          </span>
                          <span>Irrigation recommended to increase moisture</span>
                        </li>
                      )}
                      {soilData.organicCarbon.value < 150 && (
                        <li className="flex items-start">
                          <span className="flex-shrink-0 bg-amber-100 text-amber-800 rounded-full p-1 mr-2">
                            <Leaf className="w-3 h-3" />
                          </span>
                          <span>Add organic compost to improve carbon content</span>
                        </li>
                      )}
                      {soilData.qualityRating === "Poor" && (
                        <li className="flex items-start">
                          <span className="flex-shrink-0 bg-amber-100 text-amber-800 rounded-full p-1 mr-2">
                            <AlertTriangle className="w-3 h-3" />
                          </span>
                          <span>Soil amendment strongly recommended</span>
                        </li>
                      )}
                    </ul>
                  </div>

                  {/* Location Info */}
                  <div className="mt-6 p-5 bg-gray-50 rounded-xl border border-gray-100">
                    <h3 className="font-medium text-gray-700 mb-3">
                      Location Details
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-xs text-gray-500">Latitude</p>
                        <p className="font-medium">{latitude}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Longitude</p>
                        <p className="font-medium">{longitude}</p>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-3">
                      Last updated: {new Date().toLocaleString()}
                    </p>
                  </div>
                </>
              ) : null}
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-white p-5 border-t border-gray-100 rounded-b-2xl flex justify-end space-x-3">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-800 transition"
              >
                Close
              </button>
              {!loading && (
                <button
                  onClick={fetchSoilData}
                  className="px-4 py-2 bg-amber-100 hover:bg-amber-200 text-amber-800 rounded-lg transition flex items-center"
                >
                  <Loader2 className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : 'hidden'}`} />
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