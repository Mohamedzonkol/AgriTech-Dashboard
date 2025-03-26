"use client";
import React, { createContext, useContext, ReactNode } from "react";
import { useFarmData } from "../hooks/useFarmData";
import { useWeatherData } from "../hooks/useWeatherData";
import { useEquipmentData } from "../hooks/useEquipmentData";
import type {
  CropYieldData,
  SoilMoistureData,
  Alert,
  Field,
  Equipment,
  WeatherData,
  WeatherForecast,
  FarmStatus,
} from "../utils/types";

type FarmDataContextType = {
  cropYieldData: CropYieldData[];
  soilMoistureData: SoilMoistureData[];
  alerts: Alert[];
  fieldData: Field[];
  equipmentData: Equipment[];
  currentWeather: WeatherData;
  weatherForecast: WeatherForecast[];
  farmStatus: FarmStatus; // Add this line
  unreadAlerts: number;
  markAlertAsRead: (id: string) => void;
  markAllAlertsAsRead: () => void;
  updateEquipmentStatus: (
    id: string,
    status: "Active" | "Maintenance" | "Idle"
  ) => void;
  setFieldData: (fields: Field[]) => void;
};

const FarmDataContext = createContext<FarmDataContextType | undefined>(
  undefined
);

export const FarmDataProvider = ({ children }: { children: ReactNode }) => {
  const farmData = useFarmData();
  const weatherData = useWeatherData();
  const equipmentData = useEquipmentData();

  const contextValue = {
    ...farmData,
    ...weatherData,
    ...equipmentData,
    farmStatus: farmData.farmStatus, // Make sure this is included from your hook
  };

  return (
    <FarmDataContext.Provider value={contextValue}>
      {children}
    </FarmDataContext.Provider>
  );
};

export const useFarmDataContext = () => {
  const context = useContext(FarmDataContext);
  if (context === undefined) {
    throw new Error(
      "useFarmDataContext must be used within a FarmDataProvider"
    );
  }
  return context;
};
