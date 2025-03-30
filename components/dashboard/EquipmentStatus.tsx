"use client";
import { Wifi, WifiOff, Battery, AlertTriangle, Loader2, Plus } from "lucide-react";
import { EQUIPMENT_STATUS_STYLES } from "../../utils/constants";
import type { Equipment } from "../../utils/types";
import { ViewEquipmentButton } from "./viewEquipmentButtom";
import React from "react";

interface EquipmentStatusProps {
  equipment?: Equipment[];
  error?: string | null;
  loading?: boolean;
  className?: string;
}

const EquipmentStatus = ({
  equipment,
  error,
  loading = false,
  className = "",
}: EquipmentStatusProps) => {
  if (loading) {
    return (
      <div
        className={`bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-700/50 transition-all duration-300 ${className}`}
      >
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white/90">
            Equipment Status
          </h2>
          <div className="h-2 w-8 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
        </div>
        <div className="flex flex-col items-center justify-center py-10 space-y-4">
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full flex items-center justify-center">
              <Loader2 className="w-6 h-6 text-white animate-spin" />
            </div>
            <div className="absolute -inset-2 border-2 border-blue-400/30 rounded-full animate-ping" />
          </div>
          <div className="text-center space-y-1">
            <p className="text-gray-700 dark:text-gray-300 font-medium">
              Loading equipment
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400/80">
              Fetching latest status...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={`bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-red-100 dark:border-red-900/50 transition-all duration-300 ${className}`}
      >
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white/90">
            Equipment Status
          </h2>
          <div className="h-2 w-8 bg-gray-200 dark:bg-gray-700 rounded-full" />
        </div>
        <div className="flex flex-col items-center justify-center py-8 space-y-4">
          <div className="relative">
            <div className="w-14 h-14 bg-gradient-to-br from-red-100 to-red-50 dark:from-red-900/30 dark:to-red-800/20 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-7 h-7 text-red-500 dark:text-red-400" />
            </div>
            <div className="absolute -inset-2 border-2 border-red-200 dark:border-red-900/20 rounded-full" />
          </div>
          <div className="text-center space-y-2">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Connection Error
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs">
              {error}
            </p>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-5 py-2 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white rounded-full text-sm font-medium shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-[1.02]"
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  if (!equipment || equipment.length === 0) {
    return (
      <div
        className={`bg-white/80 dark:bg-gray-800 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-700/50 transition-all duration-300 ${className}`}
      >
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white/90">
            Equipment Status
          </h2>
          <div className="h-2 w-8 bg-gray-200 dark:bg-gray-700 rounded-full" />
        </div>
        <div className="flex flex-col items-center justify-center py-10 space-y-4">
          <div className="w-14 h-14 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
            <WifiOff className="w-6 h-6 text-gray-400 dark:text-gray-500" />
          </div>
          <div className="text-center space-y-1">
            <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">
              No Equipment Found
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Add equipment to get started
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 col-span-1">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Equipment Status</h2>
        <ViewEquipmentButton className="ml-auto" />
        </div>
      <div className=" space-y-3 ">
        {equipment.map((equip) => (
          <div key={equip.id} className="border rounded-lg p-3 transition-transform hover:scale-105 duration-300">
            <div className="flex justify-between transition-transform hover:scale-105 duration-300">
              <span className="font-larger font-bold">{equip.name}</span>
              <span
                className={`text-sm font-bold ${EQUIPMENT_STATUS_STYLES[equip.status]}`}
              >
                {equip.status}
              </span>
            </div>
            <div className="flex justify-between text-sm text-gray-500 mt-1  ">
              <span >ID: {equip.id}</span>
              <span>{equip.hoursUsed} hrs</span>
            </div>
            <div className="flex justify-between items-center mt-2">
              <div className="flex items-center">
                {equip.connectivity === "Online" ? (
                  <Wifi className="w-4 h-4 text-green-500 mr-1" />
                ) : (
                  <WifiOff className="w-4 h-4 text-red-500 mr-1" />
                )}
                <span className="text-xs">{equip.connectivity}</span>
              </div>
              <div className="flex items-center">
                <Battery
                  className={`w-4 h-4 mr-1 ${
                    equip.battery < 20
                      ? "text-red-500"
                      : equip.battery < 50
                      ? "text-yellow-500"
                      : "text-green-500"
                  }`}
                />
                <span className="text-xs">{equip.battery}%</span>
              </div>
            </div>
            <div className="text-xs text-gray-400 mt-1">
              Last maintenance: {equip.lastMaintenance}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default EquipmentStatus;
