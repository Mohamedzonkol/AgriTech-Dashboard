"use client";

import { FarmStatus } from "@/utils";
import { Zap } from "lucide-react";
import React from "react";

const EnergyMonitoringCard = ({ generation }: { generation: number }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 col-span-1">
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        Energy Monitoring
      </h2>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Zap className="w-5 h-5 text-yellow-500 mr-2" />
          <span className="font-medium">Solar Generation</span>
        </div>
        <span className="text-lg font-bold">{generation} kWh</span>
      </div>
      <div className="h-4 bg-gray-200 rounded-full mb-6">
        <div
          className="h-4 bg-yellow-500 rounded-full"
          style={{
            width: `${Math.min(100, (generation / 250) * 100)}%`,
          }}
        ></div>
      </div>
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-sm text-gray-500">Battery Status</span>
          <span className="text-sm font-medium">78%</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-500">Grid Consumption</span>
          <span className="text-sm font-medium">12 kWh</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-500">Energy Efficiency</span>
          <span className="text-sm font-medium text-green-600">92%</span>
        </div>
      </div>
    </div>
  );
};
export default EnergyMonitoringCard;
