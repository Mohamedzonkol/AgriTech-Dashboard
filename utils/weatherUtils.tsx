"use client";
import React from "react";
import {
  Sun,
  Cloud,
  CloudRain,
  CloudSun,
  CloudLightning,
  CloudDrizzle,
  Snowflake,
} from "lucide-react";
import { faker } from "@faker-js/faker";
// Get appropriate weather icon based on condition
export const getWeatherIcon = (condition: string) => {
  switch (condition.toLowerCase()) {
    case "sunny":
      return <Sun className="w-8 h-8 text-yellow-500" />;
    case "cloudy":
      return <Cloud className="w-8 h-8 text-gray-400" />;
    case "rainy":
      return <CloudRain className="w-8 h-8 text-blue-400" />;
    case "partly cloudy":
      return <CloudSun className="w-8 h-8 text-gray-400" />;
    case "thunderstorm":
      return <CloudLightning className="w-8 h-8 text-purple-500" />;
    case "foggy":
      return <CloudDrizzle className="w-8 h-8 text-gray-300" />;
    case "snow":
      return <Snowflake className="w-8 h-8 text-blue-200" />;
    default:
      return <Sun className="w-8 h-8 text-yellow-500" />;
  }
};
// Generate mock weather forecast
export const generateWeatherForecast = () => {
  return Array.from({ length: 5 }, (_, i) => {
    const conditions = [
      "Sunny",
      "Cloudy",
      "Rainy",
      "Partly Cloudy",
      "Thunderstorm",
      "Foggy",
      "Snow",
    ];
    const condition = conditions[Math.floor(Math.random() * conditions.length)];
    return {
      date: faker.date
        .soon({ days: 5 })
        .toLocaleDateString("en-US", { weekday: "short" }),
      condition,
      high: faker.number.int({ min: 18, max: 32 }),
      low: faker.number.int({ min: 10, max: 20 }),
      precipitation:
        condition === "Rainy" || condition === "Thunderstorm"
          ? faker.number.int({ min: 5, max: 30 })
          : condition === "Snow"
          ? faker.number.int({ min: 2, max: 15 })
          : 0,
      wind: faker.number.int({ min: 5, max: 30 }),
    };
  });
};
// Generate initial weather data
export const generateInitialWeather = () => ({
  temperature: 24,
  humidity: 65,
  windSpeed: 12,
  condition: "Partly Cloudy",
  location: "Argi Farm",
  lastUpdated: new Date().toLocaleTimeString(),
  uvIndex: Math.floor(Math.random() * 10) + 1,
  pressure: Math.floor(Math.random() * 60) + 980,
});
