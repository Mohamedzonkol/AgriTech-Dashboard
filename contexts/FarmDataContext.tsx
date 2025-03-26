"use client";

import React, {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
} from "react";
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
  isInitialized: boolean;
  cropYieldData: CropYieldData[];
  soilMoistureData: SoilMoistureData[];
  alerts: Alert[];
  fieldData: Field[];
  equipmentData: Equipment[];
  currentWeather: WeatherData;
  weatherForecast: WeatherForecast[];
  farmStatus: FarmStatus;
  unreadAlerts: number;
  markAlertAsRead: (id: string) => void;
  markAllAlertsAsRead: () => void;
  updateEquipmentStatus: (
    id: string,
    status: "Active" | "Maintenance" | "Idle"
  ) => void;
  setFieldData: (fields: Field[]) => void;
};

const FarmDataContext = createContext<FarmDataContextType | null>(null);

export const FarmDataProvider = ({ children }: { children: ReactNode }) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const farmData = useFarmData();
  const weatherData = useWeatherData();
  const equipmentData = useEquipmentData();

  useEffect(() => {
    setIsInitialized(true);
  }, []);

  const contextValue = {
    isInitialized,
    ...farmData,
    ...weatherData,
    ...equipmentData,
  };

  return (
    <FarmDataContext.Provider value={contextValue}>
      {children}
    </FarmDataContext.Provider>
  );
};

export const useFarmDataContext = () => {
  const context = useContext(FarmDataContext);
  if (!context) {
    throw new Error(
      "useFarmDataContext must be used within a FarmDataProvider"
    );
  }
  return context;
};
