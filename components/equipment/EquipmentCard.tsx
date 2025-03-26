"use client";
import { Wifi, WifiOff, Battery, Settings } from "lucide-react";
import { EQUIPMENT_STATUS_STYLES } from "../../utils/constants";
import type { Equipment } from "../../utils/types";
import React from "react";

export const EquipmentCard = ({
  equipment,
  onStatusChange,
}: {
  equipment: Equipment;
  onStatusChange: (
    id: string,
    status: "Active" | "Maintenance" | "Idle"
  ) => void;
}) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
      <div className="bg-blue-50 p-4 border-b">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-lg text-gray-800">{equipment.name}</h3>
          <span
            className={`px-2 py-1 text-xs rounded-full ${
              EQUIPMENT_STATUS_STYLES[equipment.status]
            }`}
          >
            {equipment.status}
          </span>
        </div>
        <p className="text-gray-600 mt-1">ID: {equipment.id}</p>
      </div>
      <div className="p-4">
        <div className="flex justify-between py-2 border-b">
          <span className="text-gray-500">Hours Used</span>
          <span className="font-medium">{equipment.hoursUsed} hrs</span>
        </div>
        <div className="flex justify-between py-2 border-b">
          <span className="text-gray-500">Battery</span>
          <div className="flex items-center">
            <Battery
              className={`w-4 h-4 mr-1 ${
                equipment.battery < 20
                  ? "text-red-500"
                  : equipment.battery < 50
                  ? "text-yellow-500"
                  : "text-green-500"
              }`}
            />
            <span className="font-medium">{equipment.battery}%</span>
          </div>
        </div>
        <div className="flex justify-between py-2">
          <span className="text-gray-500">Connectivity</span>
          <div className="flex items-center">
            {equipment.connectivity === "Online" ? (
              <Wifi className="w-4 h-4 text-green-500 mr-1" />
            ) : (
              <WifiOff className="w-4 h-4 text-red-500 mr-1" />
            )}
            <span className="font-medium">{equipment.connectivity}</span>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-4 py-3 border-t flex justify-between">
        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
          <Settings className="w-4 h-4 inline mr-1" />
          Details
        </button>
        <select
          value={equipment.status}
          onChange={(e) => onStatusChange(equipment.id, e.target.value as any)}
          className="text-sm border rounded px-2 py-1"
        >
          <option value="Active">Active</option>
          <option value="Maintenance">Maintenance</option>
          <option value="Idle">Idle</option>
        </select>
      </div>
    </div>
  );
};
