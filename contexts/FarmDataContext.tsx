"use client";

import React, {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
  useMemo,
} from "react";
import { useFarmData } from "../hooks/useFarmData";
import { useWeatherData } from "../hooks/useWeatherData";
import { useEquipmentData } from "../hooks/useEquipmentData";
import { useFarmStatusData } from "../hooks/useFarmStatusData";
import { useSoilMoistureData } from "../hooks/UseSoilMoistureData";
import type {
  CropYieldData,
  SoilMoistureData,
  EmergencyAlert,
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
  alerts: EmergencyAlert[];
  fieldData: Field[];
  equipmentData: Equipment[];
  currentWeather: WeatherData | null;
  weatherForecast: WeatherForecast[];
  farmStatus: FarmStatus;
  unreadAlerts: number;
  markAlertAsRead: (id: string) => void;
  markAllAlertsAsRead: () => void;
  setFieldData: (fields: Field[]) => void;
  refreshData: () => Promise<void>;
  isLoading: boolean;
  error: Error | null;
};

const FarmDataContext = createContext<FarmDataContextType | null>(null);

export const FarmDataProvider = ({ children }: { children: ReactNode }) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const farmData = useFarmData();
  const weatherData = useWeatherData();
  const equipmentData = useEquipmentData();
  const farmStatusData = useFarmStatusData();
  const soilMoistureData = useSoilMoistureData();
  useEffect(() => {
    setIsInitialized(true);
  }, []);

  // Normalize all errors to Error objects
  const normalizedError = useMemo(() => {
    const errors = [
      farmData.error,
      weatherData.error,
      equipmentData.error,
      farmStatusData.error,
      soilMoistureData.error
    ].filter(Boolean);

    if (errors.length === 0) return null;

    // Convert all errors to Error instances if they aren't already
    const errorObjects = errors.map(err =>
      err instanceof Error ? err : new Error(String(err))
    );

    // Combine multiple errors into one
    return errorObjects.length === 1
      ? errorObjects[0]
      : new Error(errorObjects.map(e => e.message).join('; '));
  }, [farmData.error, weatherData.error, equipmentData.error, farmStatusData.error, soilMoistureData.error]);

  const contextValue = useMemo(() => ({
    isInitialized,
    cropYieldData: farmData.cropYieldData,
    soilMoistureData: soilMoistureData.soilData,
    alerts: farmData.alerts,
    fieldData: farmData.fieldData,
    equipmentData: equipmentData.equipments,
    currentWeather: weatherData.currentWeather,
    weatherForecast: weatherData.weatherForecast,
    farmStatus: farmData.farmStatus,
    unreadAlerts: farmData.unreadAlerts,
    markAlertAsRead: farmData.markAlertAsRead,
    markAllAlertsAsRead: farmData.markAllAlertsAsRead,
    setFieldData: farmData.setFieldData,
    refreshData: async () => {
      await Promise.all([
        farmData.refreshFarmData(),
        weatherData.refresh(),
        equipmentData.refetch(),
        soilMoistureData.fetchSoilMoistureData()

      ]);
    },
    isLoading: Boolean(
      farmData.loading ||
      weatherData.loading ||
      equipmentData.loading ||
      farmStatusData.loading ||
      soilMoistureData.loading
    ),
    error: normalizedError
  }), [
    isInitialized,
    farmData,
    weatherData,
    equipmentData,
    farmStatusData,
    soilMoistureData,
    normalizedError
  ]);

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