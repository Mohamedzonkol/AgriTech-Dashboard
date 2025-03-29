"use client";
import { useState } from "react";
import EquipmentList from "../components/equipment/EquipmentList";
import EquipmentUtilizationChart from "../components/equipment/EquipmentUtilizationChart";
import EquipmentStatusChart from "../components/equipment/EquipmentStatusChart"
import type { Equipment } from "../utils/types";
import React from "react";
import { Settings, RotateCw } from "lucide-react";
import { useEquipmentData } from "@/hooks/useEquipmentData";

const EquipmentPage = () => {
  const { 
    equipments, 
    loading, 
    error, 
    addEquipment, 
    updateEquipment, 
    deleteEquipment, 
    updateEquipmentStatus,
    refetch 
  } = useEquipmentData();

  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await refetch();
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Equipment Management</h1>
        <button 
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg flex items-center transition-colors disabled:opacity-50"
        >
          {isRefreshing ? (
            <RotateCw className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <RotateCw className="mr-2 h-4 w-4" />
          )}
          {isRefreshing ? "Refreshing..." : "Refresh Data"}
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Total Equipment</h2>
          <p className="text-4xl font-bold text-blue-600">
            {isRefreshing ? "--" : equipments.length}
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Active Equipment</h2>
          <p className="text-4xl font-bold text-green-600">
            {isRefreshing ? "--" : equipments.filter((eq) => eq.status === "Active").length}
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">In Maintenance</h2>
          <p className="text-4xl font-bold text-yellow-600">
            {isRefreshing ? "--" : equipments.filter((eq) => eq.status === "Maintenance").length}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <EquipmentUtilizationChart  equipment={isRefreshing ? [] : equipments} 
          isLoading={isRefreshing} />
  <EquipmentStatusChart  equipment={isRefreshing ? [] : equipments} 
          isLoading={isRefreshing} />

</div>

      <EquipmentList />
    </div>
  );
};
export default EquipmentPage;