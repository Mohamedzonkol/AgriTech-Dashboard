"use client";

import { Zap, BatteryFull, BatteryCharging, PlugZap, Leaf, ArrowDown, ArrowUp } from "lucide-react";
import React, { useState, useEffect } from "react";

const EnergyMonitoringCard = ({ generation }: { generation: number }) => {
  const [batteryLevel, setBatteryLevel] = useState(78);
  const [gridConsumption, setGridConsumption] = useState(12);
  const [isGenerating, setIsGenerating] = useState(false);
  const [time, setTime] = useState(new Date());

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
      // Simulate small fluctuations in values
      setBatteryLevel(prev => Math.min(100, Math.max(0, prev + (Math.random() > 0.5 ? 1 : -1))));
      setGridConsumption(prev => Math.max(0, prev + (Math.random() > 0.5 ? 0.5 : -0.5)));
      setIsGenerating(new Date().getHours() > 6 && new Date().getHours() < 18);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const efficiency = 92 - (gridConsumption / generation * 10);
  const solarPercentage = Math.min(100, (generation / 250) * 100);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 col-span-1 border border-gray-100 hover:shadow-md transition-shadow transition-transform hover:scale-105 duration-300">
      <div className="flex justify-between items-start mb-6">
        <h2 className="text-xl font-bold text-gray-800 flex items-center">
          <Zap className="w-5 h-5 mr-2 text-yellow-500" />
          Energy Monitoring
        </h2>
        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
          {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>

      {/* Main Generation Card */}
      <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg p-4 mb-6 border border-yellow-200 transition-transform hover:scale-105 duration-300">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center">
            <Zap className={`w-5 h-5 mr-2 ${isGenerating ? 'text-yellow-500 animate-pulse' : 'text-gray-400'}`} />
            <span className="font-medium">Solar Generation</span>
          </div>
          <span className="text-lg font-bold text-gray-800">{generation.toFixed(1)} kWh</span>
        </div>
        
        <div className="relative h-3 bg-yellow-200 rounded-full mb-2 overflow-hidden">
          <div 
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full transition-all duration-1000"
            style={{ width: `${solarPercentage}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-xs text-gray-600">
          <span>0 kWh</span>
          <span>250 kWh</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 transition-transform hover:scale-105 duration-300">
        {/* Battery Status */}
        <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 transition-transform hover:scale-105 duration-300">
          <div className="flex items-center mb-2">
            {batteryLevel > 80 ? (
              <BatteryFull className="w-4 h-4 mr-2 text-green-500" />
            ) : (
              <BatteryCharging className="w-4 h-4 mr-2 text-amber-500" />
            )}
            <span className="text-sm font-medium">Battery</span>
          </div>
          <div className="flex items-end justify-between">
            <span className="text-xl font-bold">{batteryLevel}%</span>
            <div className="w-16 h-2 bg-gray-200 rounded-full">
              <div 
                className={`h-2 rounded-full ${
                  batteryLevel > 80 ? 'bg-green-500' : 
                  batteryLevel > 30 ? 'bg-amber-500' : 'bg-red-500'
                }`}
                style={{ width: `${batteryLevel}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Grid Consumption */}
        <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 transition-transform hover:scale-105 duration-300">
          <div className="flex items-center mb-2">
            <PlugZap className="w-4 h-4 mr-2 text-blue-500" />
            <span className="text-sm font-medium">Grid Usage</span>
          </div>
          <div className="flex items-end justify-between">
            <span className="text-xl font-bold">{gridConsumption.toFixed(1)} kWh</span>
            <ArrowDown className="w-5 h-5 text-blue-500" />
          </div>
        </div>

        {/* Energy Efficiency */}
        <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 transition-transform hover:scale-105 duration-300">
          <div className="flex items-center mb-2">
            <Leaf className="w-4 h-4 mr-2 text-green-500" />
            <span className="text-sm font-medium">Efficiency</span>
          </div>
          <div className="flex items-end justify-between">
            <span className={`text-xl font-bold ${
              efficiency > 90 ? 'text-green-600' : 
              efficiency > 75 ? 'text-amber-600' : 'text-red-600'
            }`}>
              {efficiency.toFixed(0)}%
            </span>
            <div className="text-xs bg-green-100 text-green-800 px-1.5 py-0.5 rounded">
              {efficiency > 90 ? 'Excellent' : efficiency > 75 ? 'Good' : 'Low'}
            </div>
          </div>
        </div>

        {/* Energy Flow */}
        <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 transition-transform hover:scale-105 duration-300">
          <div className="flex items-center mb-2">
            <ArrowUp className="w-4 h-4 mr-2 text-purple-500" />
            <span className="text-sm font-medium">Energy Flow</span>
          </div>
          <div className="flex items-end justify-between">
            <span className="text-sm">
              {generation > gridConsumption * 3 ? 'Mostly Solar' : 'Mixed Sources'}
            </span>
            <div className="flex space-x-1">
              <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Daily Summary */}
      <div className="mt-6 pt-4 border-t border-gray-200 transition-transform hover:scale-105 duration-300">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Daily Summary</h3>
        <div className="flex justify-between text-sm">
          <div className="text-center">
            <div className="text-gray-500 ">Produced</div>
            <div className="font-bold text-yellow-600">{generation.toFixed(1)} kWh</div>
          </div>
          <div className="text-center">
            <div className="text-gray-500">Consumed</div>
            <div className="font-bold text-blue-600">{(generation * 0.7).toFixed(1)} kWh</div>
          </div>
          <div className="text-center">
            <div className="text-gray-500">Saved</div>
            <div className="font-bold text-green-600">{(generation * 0.3).toFixed(1)} kWh</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnergyMonitoringCard;