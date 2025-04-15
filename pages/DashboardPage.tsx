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
    isLoading,
  } = useFarmDataContext();

  // Show loading state only for initial load
  if (!isInitialized && isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-gray-600">Loading farm data...</p>
      </div>
    );
  }
  equipmentData;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {/* Left Column */}
      <WeatherCard
        weather={currentWeather}
        loading={isLoading && !currentWeather}
      />

      <FarmStatusCard />

      <AlertCard
        alerts={alerts}
        unreadCount={unreadAlerts}
        // loading={isLoading && !alerts}
      />

      {/* Middle Column */}
      <YieldChart
        data={cropYieldData}
        // loading={isLoading && !cropYieldData}
      />

      <SoilMoistureChart
        data={soilMoistureData}
        // loading={isLoading && !soilMoistureData}
      />

      <EquipmentStatus
        equipment={equipmentData?.slice(0, 4)}
        loading={isLoading && !equipmentData}
      />

      {/* Right Column */}
      <WeatherForecast
        forecast={weatherForecast?.slice(0, 5)}
        loading={isLoading && !weatherForecast}
      />

      <QuickActions />

      <EnergyMonitoringCard
        generation={farmStatus?.solarGeneration}
        // loading={isLoading && !farmStatus}
      />
    </div>
  );
};

export default DashboardPage;
