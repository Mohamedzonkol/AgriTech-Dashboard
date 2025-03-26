"use client";
import { faker } from "@faker-js/faker";
import { useState, useEffect } from "react";
import type { Equipment } from "../utils/types";

// Generate mock equipment data
export const generateEquipmentData = (): Equipment[] => {
  const statuses: Equipment["status"][] = ["Active", "Maintenance", "Idle"];
  return Array.from({ length: 5 }, (_, i) => ({
    id: `EQ-${1000 + i}`,
    name: ["Tractor", "Harvester", "Irrigator", "Seeder", "Sprayer"][i],
    status: statuses[Math.floor(Math.random() * statuses.length)],
    lastMaintenance: faker.date
      .recent({ days: 30 })
      .toISOString()
      .split("T")[0],
    hoursUsed: faker.number.int({ min: 50, max: 500 }),
    battery: faker.number.int({ min: 15, max: 100 }),
    connectivity: faker.datatype.boolean() ? "Online" : "Offline",
  }));
};

export const useEquipmentData = () => {
  const [equipmentData, setEquipmentData] = useState<Equipment[]>(
    generateEquipmentData()
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setEquipmentData((prev) => {
        const newData = [...prev];
        const randomIndex = Math.floor(Math.random() * newData.length);

        // Simulate battery drain or charge
        newData[randomIndex].battery = Math.max(
          0,
          Math.min(
            100,
            newData[randomIndex].battery + (Math.random() > 0.5 ? -2 : 5)
          )
        );

        // Randomly change connectivity
        if (Math.random() > 0.8) {
          newData[randomIndex].connectivity =
            newData[randomIndex].connectivity === "Online"
              ? "Offline"
              : "Online";
        }

        return newData;
      });
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const updateEquipmentStatus = (
    id: string,
    status: "Active" | "Maintenance" | "Idle"
  ) => {
    setEquipmentData((prev) =>
      prev.map((equip) => (equip.id === id ? { ...equip, status } : equip))
    );
  };

  return { equipmentData, updateEquipmentStatus };
};
