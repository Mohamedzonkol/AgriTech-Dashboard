"use client";
import { useState, useEffect } from "react";
import {
  generateWeatherForecast,
  generateInitialWeather,
} from "../utils/weatherUtils";
import type { WeatherData, WeatherForecast } from "../utils/types";

export const useWeatherData = () => {
  const [currentWeather, setCurrentWeather] = useState<WeatherData>(
    generateInitialWeather()
  );
  const [weatherForecast, setWeatherForecast] = useState<WeatherForecast[]>(
    generateWeatherForecast()
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWeather((prev) => ({
        ...prev,
        temperature: prev.temperature + (Math.random() > 0.5 ? 1 : -1),
        humidity: Math.max(
          30,
          Math.min(90, prev.humidity + (Math.random() > 0.5 ? 2 : -2))
        ),
        windSpeed: Math.max(
          5,
          Math.min(30, prev.windSpeed + (Math.random() > 0.5 ? 1 : -1))
        ),
        lastUpdated: new Date().toLocaleTimeString(),
      }));

      // Update forecast every hour (simulated)
      if (Math.random() > 0.95) {
        setWeatherForecast(generateWeatherForecast());
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return { currentWeather, weatherForecast };
};
