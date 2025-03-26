"use client";
import { faker } from "@faker-js/faker";
import { useState, useEffect } from "react";
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
  const [soilMoistureData, setSoilMoistureData] = useState<SoilMoistureData[]>(
    generateSoilMoistureData()
  );
  const [alerts, setAlerts] = useState<Alert[]>(generateAlerts());
  const [fieldData, setFieldData] = useState<Field[]>(generateFieldData());
  const [unreadAlerts, setUnreadAlerts] = useState(
    alerts.filter((alert) => !alert.read).length
  );

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSoilMoistureData((prev) => {
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
        ];
        const newAlert = {
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
        setUnreadAlerts((prev) => prev + 1);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const markAlertAsRead = (alertId: string) => {
    setAlerts((prev) =>
      prev.map((alert) =>
        alert.id === alertId ? { ...alert, read: true } : alert
      )
    );
    setUnreadAlerts((prev) => prev - 1);
  };

  const markAllAlertsAsRead = () => {
    setAlerts((prev) => prev.map((alert) => ({ ...alert, read: true })));
    setUnreadAlerts(0);
  };

  return {
    farmStatus,
    cropYieldData,
    soilMoistureData,
    alerts,
    fieldData,
    unreadAlerts,
    markAlertAsRead,
    markAllAlertsAsRead,
    setFieldData,
  };
};
