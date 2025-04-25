"use client";
import { Droplet, Sliders, Check, X, Loader2, AlertTriangle, Gauge } from "lucide-react";
import React, { useState, useEffect } from "react";

interface WateringFeedback {
  action: number;
  decision: string;
  message: string;
  language: string;
}

interface CurrentValues {
  temperature: number;
  humidity: number;
  soilMoisture: number;
  growth: number;
  fertilizerLevel: number;
  sunlight: number;
}

const SmartIrrigationButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [feedback, setFeedback] = useState<WateringFeedback | null>(null);
  const [currentValues, setCurrentValues] = useState<CurrentValues | null>(null);
  const [modifiedValues, setModifiedValues] = useState<CurrentValues | null>(null);
  const [loading, setLoading] = useState({
    current: false,
    feedback: false
  });
  const [error, setError] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const baseUrl = "https://crop-pilot-api.azurewebsites.net/api/AIModel";
  const fetchCurrentValues = async () => {
    setLoading(prev => ({ ...prev, current: true }));
    setError(null);
    try {
      const response = await fetch(`${baseUrl}/GetCurrentValue`);
      if (!response.ok) throw new Error("Failed to fetch current values");
      const data = await response.json();
      if (!data.succeeded) throw new Error(data.message);

      setCurrentValues(data.data);
      setModifiedValues(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    } finally {
      setLoading(prev => ({ ...prev, current: false }));
    }
  };

  const getWateringFeedback = async () => {
    if (!modifiedValues) return;

    setLoading(prev => ({ ...prev, feedback: true }));
    setError(null);
    try {
      const response = await fetch(`${baseUrl}/wateringFeedback`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...modifiedValues
        }),
      });

      if (!response.ok) throw new Error("Failed to get watering feedback");
      const data = await response.json();
      if (!data.succeeded) throw new Error(data.message);

      setFeedback(data.data);
      setShowResult(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    } finally {
      setLoading(prev => ({ ...prev, feedback: false }));
    }
  };

  const handleValueChange = (field: keyof CurrentValues, value: number) => {
    if (!modifiedValues) return;
    setModifiedValues({
      ...modifiedValues,
      [field]: value
    });
  };

  const resetToCurrent = () => {
    if (currentValues) {
      setModifiedValues(currentValues);
      setShowResult(false);
      setFeedback(null);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchCurrentValues();
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
      setShowResult(false);
      setFeedback(null);
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  const getDecisionColor = (action: number) => {
    return action === 1
      ? "bg-blue-50 border border-blue-100 text-blue-800"
      : "bg-amber-50 border border-amber-100 text-amber-800";
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="relative bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 px-4 rounded-xl flex flex-col items-center transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 hover:-translate-y-0.5"

      >
        <div className="absolute -top-2 -right-2 bg-white text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shadow-sm">
          AI
        </div>
        <Droplet className="w-6 h-6 mb-1" />
        <span className="font-medium">Smart Irrigation</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto transition-all duration-300 transform">
            <div className="sticky top-0 bg-white p-5 border-b border-gray-100 flex justify-between items-center rounded-t-2xl">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Smart Irrigation Advisor</h2>
                <p className="text-sm text-gray-500">Get AI-powered watering recommendations</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200 p-1 rounded-full hover:bg-gray-100"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6">
              {loading.current && !currentValues ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="relative">
                    <Droplet className="w-10 h-10 text-blue-500 opacity-30" />
                    <Loader2 className="w-6 h-6 text-blue-500 animate-spin absolute inset-0 m-auto" />
                  </div>
                  <p className="text-gray-500 mt-4">Loading current sensor data...</p>
                </div>
              ) : error ? (
                <div className="bg-red-50 border border-red-100 rounded-xl p-5 animate-fade-in">
                  <h3 className="font-medium text-red-800 flex items-center mb-2">
                    <AlertTriangle className="w-5 h-5 mr-2" />
                    Error Loading Data
                  </h3>
                  <p className="text-red-700">{error}</p>
                  <button
                    onClick={fetchCurrentValues}
                    className="mt-3 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-800 rounded-lg transition flex items-center"
                  >
                    <Loader2 className={`w-4 h-4 mr-2 ${loading.current ? 'animate-spin' : 'hidden'}`} />
                    Retry
                  </button>
                </div>
              ) : modifiedValues ? (
                <>
                  {!showResult && (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                          <Sliders className="w-5 h-5 mr-2 text-blue-500" />
                          Adjust Parameters
                        </h3>
                        <button
                          onClick={resetToCurrent}
                          className="text-sm text-blue-600 hover:text-blue-800 transition-colors duration-200"

                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M3 10h4l3-3m0 0l3 3h4m-4 0v4a4 4 0 01-4 4H7a4 4 0 01-4-4v-4"
                            />
                          </svg>
                          Reset to current
                        </button>
                      </div>

                      <div className="space-y-5">
                        {[
                          { label: "Temperature", value: modifiedValues.temperature, unit: "°C", field: "temperature", min: 10, max: 50, step: 0.1 },
                          { label: "Humidity", value: modifiedValues.humidity, unit: "%", field: "humidity", min: 0, max: 100, step: 1 },
                          { label: "Soil Moisture", value: modifiedValues.soilMoisture * 100, unit: "%", field: "soilMoisture", min: 0, max: 100, step: 1, transform: (v: number) => v / 100 },
                          { label: "Growth", value: modifiedValues.growth * 100, unit: "%", field: "growth", min: 0, max: 100, step: 1, transform: (v: number) => v / 100 },
                          { label: "Fertilizer Level", value: modifiedValues.fertilizerLevel, unit: "", field: "fertilizerLevel", min: 0, max: 100, step: 1 },
                          { label: "Sunlight", value: modifiedValues.sunlight * 100, unit: "%", field: "sunlight", min: 0, max: 100, step: 1, transform: (v: number) => v / 100 },
                        ].map((param) => (
                          <div key={param.field} className="space-y-2">
                            <div className="flex justify-between">
                              <label className="text-sm font-medium text-gray-700">
                                {param.label}
                              </label>
                              <span className="text-sm font-medium text-gray-900">
                                {param.value.toFixed(param.step < 1 ? 1 : 0)}{param.unit}
                              </span>
                            </div>
                            <input
                              type="range"
                              min={param.min}
                              max={param.max}
                              step={param.step}
                              value={param.value}
                              onChange={(e) =>
                                handleValueChange(
                                  param.field as keyof CurrentValues,
                                  param.transform
                                    ? param.transform(parseFloat(e.target.value))
                                    : parseFloat(e.target.value)
                                )
                              }
                              className="w-full h-2 bg-gradient-to-r from-blue-100 to-blue-300 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-600"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {showResult && feedback && (
                    <div className="space-y-6 animate-fade-in">
                      <div className={`p-5 rounded-xl ${getDecisionColor(feedback.action)} transition-all duration-300`}>
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center">
                            <Gauge className="w-5 h-5 mr-2" />
                            <h3 className="font-semibold">Irrigation Recommendation</h3>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${feedback.action === 1
                            ? "bg-blue-100 text-blue-800"
                            : "bg-amber-100 text-amber-800"
                            }`}>
                            {feedback.decision}
                          </span>
                        </div>
                        <p className="text-gray-700">{feedback.message}</p>
                      </div>

                      <div className="bg-gray-50 p-5 rounded-xl border border-gray-100">
                        <h4 className="font-medium text-gray-700 mb-3">Parameters Used</h4>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-white p-3 rounded-lg border border-gray-100">
                            <p className="text-xs text-gray-500">Temperature</p>
                            <p className="font-medium">{modifiedValues.temperature}°C</p>
                          </div>
                          <div className="bg-white p-3 rounded-lg border border-gray-100">
                            <p className="text-xs text-gray-500">Humidity</p>
                            <p className="font-medium">{modifiedValues.humidity}%</p>
                          </div>
                          <div className="bg-white p-3 rounded-lg border border-gray-100">
                            <p className="text-xs text-gray-500">Soil Moisture</p>
                            <p className="font-medium">{(modifiedValues.soilMoisture * 100).toFixed(1)}%</p>
                          </div>
                          <div className="bg-white p-3 rounded-lg border border-gray-100">
                            <p className="text-xs text-gray-500">Growth</p>
                            <p className="font-medium">{(modifiedValues.growth * 100).toFixed(1)}%</p>
                          </div>
                          <div className="bg-white p-3 rounded-lg border border-gray-100">
                            <p className="text-xs text-gray-500">Fertilizer</p>
                            <p className="font-medium">{modifiedValues.fertilizerLevel}</p>
                          </div>
                          <div className="bg-white p-3 rounded-lg border border-gray-100">
                            <p className="text-xs text-gray-500">Sunlight</p>
                            <p className="font-medium">{(modifiedValues.sunlight * 100).toFixed(1)}%</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              ) : null}
            </div>

            <div className="sticky bottom-0 bg-white p-5 border-t border-gray-100 rounded-b-2xl flex justify-end space-x-3">
              {!showResult ? (
                <button
                  onClick={getWateringFeedback}
                  disabled={loading.feedback}
                  className="px-5 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl transition-all duration-300 disabled:opacity-50 flex items-center justify-center min-w-[180px] hover:shadow-lg hover:shadow-blue-500/20"
                >
                  {loading.feedback ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Check className="w-5 h-5 mr-2" />
                      Get Recommendation
                    </>
                  )}
                </button>
              ) : (
                <button
                  onClick={() => setShowResult(false)}
                  className="px-5 py-3 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white rounded-xl transition-all duration-300 flex items-center hover:shadow-lg hover:shadow-gray-500/20"
                >
                  <Sliders className="w-5 h-5 mr-2" />
                  Adjust Parameters
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SmartIrrigationButton;