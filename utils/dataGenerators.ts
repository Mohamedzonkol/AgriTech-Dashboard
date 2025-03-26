"use client";
import { faker } from "@faker-js/faker";

// Generate mock crop yield data
export const generateCropYieldData = () => {
  return Array.from({ length: 12 }, (_, i) => ({
    name: new Date(2023, i).toLocaleString("default", { month: "short" }),
    yield: faker.number.int({ min: 30, max: 80 }),
    target: 65,
    rainfall: faker.number.int({ min: 20, max: 100 }),
  }));
};

// Generate mock soil moisture data
export const generateSoilMoistureData = () => {
  return Array.from({ length: 8 }, (_, i) => ({
    name: `Field ${String.fromCharCode(65 + i)}`,
    moisture: faker.number.int({ min: 30, max: 90 }),
    optimal: 60,
    ph: faker.number.float({ min: 5.5, max: 7.5, fractionDigits: 1 }),
  }));
};

// Generate mock equipment data
export const generateEquipmentData = () => {
  const statuses = ["Active", "Maintenance", "Idle"];
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

// Generate mock alerts
export const generateAlerts = () => {
  const alertTypes = [
    { type: "Irrigation", severity: "high" as const },
    { type: "Pest", severity: "medium" as const },
    { type: "Equipment", severity: "low" as const },
    { type: "Weather", severity: "high" as const },
    { type: "Soil", severity: "medium" as const },
  ];
  return Array.from({ length: 5 }, (_, i) => ({
    id: faker.string.uuid(),
    type: alertTypes[i % alertTypes.length].type,
    message: [
      `Low moisture detected in Field ${String.fromCharCode(65 + i)}`,
      `Pest activity reported in ${
        ["Wheat", "Corn", "Soy", "Barley"][i % 4]
      } field`,
      `${
        ["Tractor", "Harvester", "Irrigator", "Seeder"][i % 4]
      } requires maintenance`,
      `Storm warning for ${
        ["tomorrow", "the weekend", "next week", "tonight"][i % 4]
      }`,
      `High pH level detected in Field ${String.fromCharCode(65 + i)}`,
    ][i % 5],
    severity: alertTypes[i % alertTypes.length].severity,
    time: faker.date.recent({ days: 2 }).toLocaleTimeString(),
    read: i > 2,
  }));
};

// Generate mock field data
export const generateFieldData = () => {
  const crops = ["Wheat", "Corn", "Soy", "Barley", "Oats", "Canola"];
  return Array.from({ length: 8 }, (_, i) => ({
    id: `FLD-${1000 + i}`,
    name: `Field ${String.fromCharCode(65 + i)}`,
    size: faker.number.int({ min: 10, max: 50 }),
    crop: crops[Math.floor(Math.random() * crops.length)],
    plantingDate: faker.date.recent({ days: 60 }).toISOString().split("T")[0],
    harvestDate: faker.date.soon({ days: 90 }).toISOString().split("T")[0],
    irrigation: ["Drip", "Sprinkler", "Flood", "Pivot"][
      Math.floor(Math.random() * 4)
    ],
    status: ["Growing", "Harvested", "Planted", "Fallow"][
      Math.floor(Math.random() * 4)
    ] as "Growing" | "Harvested" | "Planted" | "Fallow",
  }));
};
