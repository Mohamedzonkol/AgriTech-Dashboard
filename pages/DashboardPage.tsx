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
import React, { useMemo } from "react";

// Error State Component
interface ErrorStateProps {
  onRetry: () => void;
}

const ErrorState: React.FC<ErrorStateProps> = ({ onRetry }) => (
  <div
    className="flex flex-col items-center justify-center min-h-[60vh] text-center"
    role="alert"
    aria-live="assertive"
  >
    {/* Error Icon */}
    <div
      className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"
      aria-hidden="true"
    ></div>

    {/* Error Message */}
    <p className="text-gray-600 mb-4" id="error-message">
      Error loading farm data. Please try again.
    </p>

    {/* Retry Button */}
    <button
      onClick={onRetry}
      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      aria-labelledby="error-message"
    >
      Retry
    </button>
  </div>
);

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

  // Memoized data slices to prevent unnecessary re-renders
  const memoizedEquipmentData = useMemo(() => equipmentData?.slice(0, 4), [equipmentData]);
  const memoizedWeatherForecasttData = useMemo(() => weatherForecast?.slice(0, 4), [weatherForecast]);

  if (!isInitialized) {
    return <LoadingSkeleton />;
  }

  // Validate required data
  if (!farmStatus || !currentWeather || !equipmentData) {
    return <ErrorState onRetry={() => window.location.reload()} />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {/* Left Column */}
      <WeatherCard weather={currentWeather} />
      <FarmStatusCard status={farmStatus} />
      <AlertCard alerts={alerts} unreadCount={unreadAlerts} />

      {/* Middle Column */}
      <YieldChart data={cropYieldData} />
      <SoilMoistureChart data={soilMoistureData} />
      <EquipmentStatus equipment={memoizedEquipmentData} />

      {/* Right Column */}
      <WeatherForecast forecast={weatherForecast} />
      <QuickActions />
      <EnergyMonitoringCard generation={farmStatus.solarGeneration} />
    </div>
  );
};
export default DashboardPage;
// Loading Skeleton Component
const LoadingSkeleton = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="text-center">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-gray-600">Loading farm data...</p>
    </div>
  </div>
);