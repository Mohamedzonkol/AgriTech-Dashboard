"use client";

import { BarChart2, Leaf, FlaskConical, X, Droplet, Sun, CloudRain } from "lucide-react";
import React, { useEffect, useState } from "react";

const CropAnalysisModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCrop, setSelectedCrop] = useState("wheat");
  const [analysisData] = useState({
    growthStage: "Vegetative (V5)",
    healthScore: 82,
    pestRisk: "Moderate",
    yieldEstimate: "3.2 tons/acre",
    waterRequirement: "25 mm/week",
    nutrientStatus: {
      nitrogen: "Adequate",
      phosphorus: "Low",
      potassium: "Adequate"
    },
    weatherImpact: "Optimal"
  });
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
        className="relative bg-gradient-to-br from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white py-3 px-6 rounded-xl flex flex-col items-center transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/20 hover:-translate-y-0.5"
        >
        <BarChart2 className="w-6 h-6 mb-1" />
        <span>Crop Analysis</span>
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white p-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800 flex items-center">
                <BarChart2 className="w-5 h-5 mr-2" />
                Crop Analysis
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Crop</label>
                <select 
                  value={selectedCrop}
                  onChange={(e) => setSelectedCrop(e.target.value)}
                  className="w-full p-3 border rounded-lg bg-gray-50"
                >
                  <option value="wheat">Winter Wheat</option>
                  <option value="corn">Corn</option>
                  <option value="soybean">Soybean</option>
                  <option value="cotton">Cotton</option>
                </select>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {/* Growth Status */}
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center mb-3">
                    <Leaf className="w-5 h-5 mr-2 text-green-500" />
                    <h3 className="font-medium text-gray-700">Growth Status</h3>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-2xl font-bold">{analysisData.growthStage}</p>
                      <p className="text-sm text-gray-500">Current stage</p>
                    </div>
                    <div className="relative w-16 h-16">
                      <svg className="w-full h-full" viewBox="0 0 36 36">
                        <path
                          d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="#E5E7EB"
                          strokeWidth="3"
                        />
                        <path
                          d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="#10B981"
                          strokeWidth="3"
                          strokeDasharray={`${analysisData.healthScore}, 100`}
                        />
                      </svg>
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                        <span className="text-lg font-bold">{analysisData.healthScore}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Yield Estimate */}
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center mb-3">
                    <BarChart2 className="w-5 h-5 mr-2 text-amber-500" />
                    <h3 className="font-medium text-gray-700">Yield Estimate</h3>
                  </div>
                  <p className="text-3xl font-bold text-amber-600">{analysisData.yieldEstimate}</p>
                  <p className="text-sm text-gray-500 mt-1">Projected harvest yield</p>
                </div>
                
                {/* Water Requirements */}
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center mb-3">
                    <Droplet className="w-5 h-5 mr-2 text-blue-500" />
                    <h3 className="font-medium text-gray-700">Water Needs</h3>
                  </div>
                  <p className="text-2xl font-bold">{analysisData.waterRequirement}</p>
                  <p className="text-sm text-gray-500 mt-1">Current weekly requirement</p>
                </div>
                
                {/* Weather Impact */}
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center mb-3">
                    {analysisData.weatherImpact === "Optimal" ? (
                      <Sun className="w-5 h-5 mr-2 text-yellow-500" />
                    ) : (
                      <CloudRain className="w-5 h-5 mr-2 text-blue-500" />
                    )}
                    <h3 className="font-medium text-gray-700">Weather Impact</h3>
                  </div>
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
                    analysisData.weatherImpact === "Optimal" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                  }`}>
                    {analysisData.weatherImpact}
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Current conditions</p>
                </div>
              </div>
              
              {/* Nutrient Status */}
              <div className="mb-6">
                <h3 className="font-medium text-gray-700 mb-3 flex items-center">
                  <FlaskConical className="w-5 h-5 mr-2 text-purple-500" />
                  Nutrient Status
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  <div className={`p-3 rounded-lg ${
                    analysisData.nutrientStatus.nitrogen === "Low" ? "bg-red-50 border border-red-100" : "bg-green-50 border border-green-100"
                  }`}>
                    <p className="text-sm text-gray-500">Nitrogen (N)</p>
                    <p className="font-bold">{analysisData.nutrientStatus.nitrogen}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${
                    analysisData.nutrientStatus.phosphorus === "Low" ? "bg-red-50 border border-red-100" : "bg-green-50 border border-green-100"
                  }`}>
                    <p className="text-sm text-gray-500">Phosphorus (P)</p>
                    <p className="font-bold">{analysisData.nutrientStatus.phosphorus}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${
                    analysisData.nutrientStatus.potassium === "Low" ? "bg-red-50 border border-red-100" : "bg-green-50 border border-green-100"
                  }`}>
                    <p className="text-sm text-gray-500">Potassium (K)</p>
                    <p className="font-bold">{analysisData.nutrientStatus.potassium}</p>
                  </div>
                </div>
              </div>
              
              {/* Recommendations */}
              <div className="bg-amber-50 border border-amber-100 rounded-lg p-4">
                <h3 className="font-medium text-amber-800 mb-2">Recommendations</h3>
                <ul className="list-disc list-inside text-sm text-amber-800 space-y-1">
                  <li>Apply phosphorus-rich fertilizer to address deficiency</li>
                  <li>Schedule irrigation for Thursday morning</li>
                  <li>Monitor for aphids - risk level is moderate</li>
                  <li>Consider soil testing in 2 weeks</li>
                </ul>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-white p-4 border-t border-gray-200 flex justify-between items-center">
              <button className="text-sm text-gray-500 hover:text-gray-700">
                View Historical Data →
              </button>
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

export default CropAnalysisModal;