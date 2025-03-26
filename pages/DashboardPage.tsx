"use client";
import { useFarmDataContext } from "../contexts/FarmDataContext";

import { FarmStatusCard } from "../components/dashboard/FarmStatusCard";
import { WeatherCard } from "../components/dashboard/WeatherCard";
import { AlertCard } from "../components/dashboard/AlertCard";
import { YieldChart } from "../components/dashboard/YieldChart";
import { SoilMoistureChart } from "../components/dashboard/SoilMoistureChart";
import { EquipmentStatus } from "../components/dashboard/EquipmentStatus";
import { WeatherForecast } from "../components/dashboard/WeatherForecast";
import { QuickActions } from "../components/dashboard/QuickActions";
import { EnergyMonitoringCard } from "../components/dashboard/EnergyMonitoring";
import React from "react";
export const DashboardPage = () => {
  const {
    currentWeather,
    weatherForecast,
    farmStatus,
    alerts,
    cropYieldData,
    soilMoistureData,
    equipmentData,
    unreadAlerts,
  } = useFarmDataContext();

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
