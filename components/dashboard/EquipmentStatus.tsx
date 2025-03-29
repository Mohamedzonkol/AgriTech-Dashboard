"use client";
import { Plus, Wifi, WifiOff, Battery, Link } from "lucide-react";
import { EQUIPMENT_STATUS_STYLES } from "../../utils/constants";
import type { Equipment } from "../../utils/types";
import React from "react";
import { ViewEquipmentButton } from "./viewEquipmentButtom";

const EquipmentStatus = ({ equipment }: { equipment: Equipment[] }) => {
  // const { updateEquipmentStatus } = useFarmDataContext();

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
