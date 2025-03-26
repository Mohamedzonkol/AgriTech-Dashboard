"use client";
import { Tractor } from "lucide-react";
import type { FarmStatus } from "../../utils/types";
import React from "react";

export const FarmStatusCard = ({ status }: { status: FarmStatus }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Farm Status</h2>
        <Tractor className="text-green-600" />
      </div>
      <div className="space-y-3">
        <div className="flex justify-between items-center py-2 border-b">
          <span className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
            Active Machines
          </span>
          <span className="font-bold">{status.activeMachines}/5</span>
        </div>
        <div className="flex justify-between items-center py-2 border-b">
          <span>Crop Health</span>
          <span className="font-bold text-green-600">{status.cropHealth}</span>
        </div>
        <div className="flex justify-between items-center py-2 border-b">
          <span>Irrigation Status</span>
          <span className="font-bold text-blue-600">
            {status.irrigationStatus}
          </span>
        </div>
        <div className="flex justify-between items-center py-2 border-b">
          <span>Soil Quality</span>
          <span className="font-bold text-yellow-600">
            {status.soilQuality}
          </span>
        </div>
        <div className="flex justify-between items-center py-2 border-b">
          <span>Pest Risk</span>
          <span className="font-bold text-red-600">{status.pestRisk}</span>
        </div>
        <div className="flex justify-between items-center py-2">
          <span>Water Reservoir</span>
          <div className="w-20 bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full"
              style={{ width: `${status.waterReservoir}%` }}
            ></div>
          </div>
          <span className="font-bold">{status.waterReservoir}%</span>
        </div>
      </div>
    </div>
  );
};
