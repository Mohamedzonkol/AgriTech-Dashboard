"use client";
import { faker } from "@faker-js/faker";
import { useState, useEffect, useCallback } from "react";
import {
  generateCropYieldData,
  generateSoilMoistureData,
  generateAlerts,
  generateFieldData,
} from "../utils/dataGenerators";
import type {
  CropYieldData,
  SoilMoistureData,
  Alert,
  Field,
  FarmStatus,
} from "../utils/types";

export const useFarmData = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [farmStatus, setFarmStatus] = useState<FarmStatus>({
    activeMachines: 3,
    cropHealth: "Good",
    irrigationStatus: "Active",
    soilQuality: "Optimal",
    pestRisk: "Low",
    waterReservoir: faker.number.int({ min: 30, max: 100 }),
    solarGeneration: faker.number.int({ min: 50, max: 200 }),

  });
  const [cropYieldData, setCropYieldData] = useState<CropYieldData[]>(
    generateCropYieldData()
  );
  // const [soilMoistureData, setSoilMoistureData] = useState<SoilMoistureData[]>(
  //   generateSoilMoistureData()
  // );
  const [alerts, setAlerts] = useState<Alert[]>(generateAlerts());
  const [fieldData, setFieldData] = useState<Field[]>(generateFieldData());
  const [unreadAlerts, setUnreadAlerts] = useState(
    alerts.filter((alert) => !alert.read).length
  );

  const refreshFarmData = useCallback(async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      setCropYieldData(generateCropYieldData());
      // setSoilMoistureData(generateSoilMoistureData());
      setFieldData(generateFieldData());
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to refresh farm data'));
    } finally {
      setLoading(false);
    }
  }, []);

  // Update unread alerts whenever alerts change
  useEffect(() => {
    setUnreadAlerts(alerts.filter((alert) => !alert.read).length);
  }, [alerts]);

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      ((prev) => {
        const newData = [...prev];
        const randomIndex = Math.floor(Math.random() * newData.length);
        newData[randomIndex].moisture = Math.max(
          20,
          Math.min(
            90,
            newData[randomIndex].moisture + (Math.random() > 0.5 ? 5 : -5)
          )
        );
        return newData;
      });

      // Occasionally add a new alert
      if (Math.random() > 0.9) {
        const newAlertTypes = [
          "Irrigation",
          "Pest",
          "Equipment",
          "Weather",
          "Soil",
        ] as const;
        const newAlert: Alert = {
          id: crypto.randomUUID(),
          type: newAlertTypes[Math.floor(Math.random() * newAlertTypes.length)],
          message: `New alert detected in Field ${String.fromCharCode(
            65 + Math.floor(Math.random() * 8)
          )}`,
          severity: ["high", "medium", "low"][Math.floor(Math.random() * 3)] as
            | "high"
            | "medium"
            | "low",
          time: new Date().toLocaleTimeString(),
          read: false,
        };
        setAlerts((prev) => [newAlert, ...prev]);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const markAlertAsRead = useCallback((alertId: string) => {
    setAlerts((prev) =>
      prev.map((alert) =>
        alert.id === alertId ? { ...alert, read: true } : alert
      )
    );
  }, []);

  const markAllAlertsAsRead = useCallback(() => {
    setAlerts((prev) => prev.map((alert) => ({ ...alert, read: true })));
  }, []);

  return {
    loading,
    error,
    farmStatus,
    cropYieldData,
    alerts,
    fieldData,
    unreadAlerts,
    markAlertAsRead,
    markAllAlertsAsRead,
    setFieldData,
    refreshFarmData,

  };
};