"use client";
import { Plus } from "lucide-react";
import { EquipmentCard } from "./EquipmentCard";
import type { Equipment } from "../../utils/types";
import React from "react";

export const EquipmentList = ({
  equipment,
  onStatusChange,
}: {
  equipment: Equipment[];
  onStatusChange: (
    id: string,
    status: "Active" | "Maintenance" | "Idle"
  ) => void;
}) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold">Equipment ({equipment.length})</h3>
        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          Add Equipment
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {equipment.map((item) => (
          <EquipmentCard
            key={item.id}
            equipment={item}
            onStatusChange={onStatusChange}
          />
        ))}
      </div>
    </div>
  );
};
