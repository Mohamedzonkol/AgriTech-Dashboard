"use client";
import { useState } from "react";
import { EquipmentList } from "../components/equipment/EquipmentList";
import { EquipmentUtilizationChart } from "../components/equipment/EquipmentUtilizationChart";
import type { Equipment } from "../utils/types";
import React from "react";
import { Settings } from "lucide-react";

export const EquipmentPage = () => {
  // Initial mock data for equipment
  const [equipment, setEquipment] = useState<Equipment[]>([
    {
      id: "EQ-001",
      name: "Excavator X-200",
      status: "Active",
      hoursUsed: 245,
      battery: 78,
      connectivity: "Online",
      lastMaintenance: "",
    },
    {
      id: "EQ-002",
      name: "Bulldozer B-450",
      status: "Idle",
      hoursUsed: 120,
      battery: 45,
      connectivity: "Online",
      lastMaintenance: "",
    },
    {
      id: "EQ-003",
      name: "Crane C-1000",
      status: "Maintenance",
      hoursUsed: 532,
      battery: 12,
      connectivity: "Offline",
      lastMaintenance: "",
    },
    {
      id: "EQ-004",
      name: "Forklift F-350",
      status: "Active",
      hoursUsed: 189,
      battery: 92,
      connectivity: "Online",
      lastMaintenance: "",
    },
    {
      id: "EQ-005",
      name: "Concrete Mixer M-200",
      status: "Idle",
      hoursUsed: 76,
      battery: 63,
      connectivity: "Offline",
      lastMaintenance: "",
    },
    {
      id: "EQ-006",
      name: "Dump Truck D-800",
      status: "Active",
      hoursUsed: 321,
      battery: 34,
      connectivity: "Online",
      lastMaintenance: "",
    },
  ]);

  const handleStatusChange = (
    id: string,
    status: "Active" | "Maintenance" | "Idle"
  ) => {
    setEquipment(
      equipment.map((eq) => (eq.id === id ? { ...eq, status } : eq))
    );
  };

  const handleAddEquipment = () => {
    const newId = `EQ-${(equipment.length + 1).toString().padStart(3, "0")}`;
    setEquipment([
      ...equipment,
      {
        id: newId,
        name: `New Equipment ${newId}`,
        status: "Idle",
        hoursUsed: 0,
        battery: 100,
        connectivity: "Offline",
        lastMaintenance: "",
      },
    ]);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Equipment Management</h1>
        <button className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg flex items-center">
          <Settings className="w-4 h-4 mr-2" />
          Settings
        </button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Total Equipment</h2>
          <p className="text-4xl font-bold text-blue-600">{equipment.length}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Active Equipment</h2>
          <p className="text-4xl font-bold text-green-600">
            {equipment.filter((eq) => eq.status === "Active").length}
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">In Maintenance</h2>
          <p className="text-4xl font-bold text-yellow-600">
            {equipment.filter((eq) => eq.status === "Maintenance").length}
          </p>
        </div>
      </div>

      <div className="mb-8">
        <EquipmentUtilizationChart equipment={equipment} />
      </div>

      <EquipmentList
        equipment={equipment}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
};
