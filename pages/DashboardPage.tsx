"use client";
import { useFarmDataContext } from "@/contexts/FarmDataContext";
import FarmStatusCard from "../components/dashboard/FarmStatusCard";
import WeatherCard from "../components/dashboard/WeatherCard";
import AlertCard from "../components/dashboard/AlertCard";
import YieldChart from "../components/dashboard/YieldChart";
import SoilMoistureChart from "../components/dashboard/SoilMoistureChart";
import EquipmentStatus from "../components/dashboard/EquipmentStatus";
import WeatherForecast from "../components/dashboard/WeatherForecast";
import QuickActions from "../components/dashboard/QuickActions";
import EnergyMonitoringCard from "../components/dashboard/EnergyMonitoring";
import ClientOnlyWrapper from "../components/common/ClientOnlyWrapper";
import React from "react";

const DashboardPage = () => {
  return (
    <ClientOnlyWrapper>
      <DashboardContent />
    </ClientOnlyWrapper>
  );
};

const DashboardContent = () => {
  const {
    isInitialized,
    currentWeather,
    weatherForecast,
    farmStatus,
    alerts,
    cropYieldData,
    soilMoistureData,
    equipmentData,
    unreadAlerts,
  } = useFarmDataContext();

  if (!isInitialized) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading farm data...</p>
        </div>
      </div>
    );
  }

  // Additional safety checks for required data
  if (!farmStatus || !currentWeather || !equipmentData) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-red-500">
          Essential data failed to load. Please refresh the page.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <WeatherCard weather={currentWeather} />
      <FarmStatusCard status={farmStatus} />
      <AlertCard alerts={alerts} unreadCount={unreadAlerts} />
      <YieldChart data={cropYieldData} />
      <SoilMoistureChart data={soilMoistureData} />
      <EquipmentStatus equipment={equipmentData} />
      <WeatherForecast forecast={weatherForecast} />
      <QuickActions />
      <EnergyMonitoringCard generation={farmStatus.solarGeneration} />
    </div>
  );
};

export default DashboardPage;
