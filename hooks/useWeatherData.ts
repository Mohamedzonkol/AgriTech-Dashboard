"use client";
import { useState, useEffect } from "react";
import { fetchCurrentWeather, fetchWeatherForecast } from "../utils/api/weatherService";
import type { WeatherData, WeatherForecast } from "../utils/types";

interface WeatherHookResult {
  currentWeather: WeatherData | null;
  weatherForecast: WeatherForecast[];
  loading: {
    current: boolean;
    forecast: boolean;
  };
  error: {
    current: string | null;
    forecast: string | null;
  };
  refresh: () => Promise<void>;
}

export const useWeatherData = (city: string = "Cairo"): WeatherHookResult => {
  const [data, setData] = useState<{
    current: WeatherData | null;
    forecast: WeatherForecast[];
  }>({ 
    current: null, 
    forecast: [] 
  });
  
  const [loading, setLoading] = useState({
    current: true,
    forecast: true
  });
  
  const [error, setError] = useState({
    current: null as string | null,
    forecast: null as string | null
  });

  const fetchData = async () => {
    try {
      setLoading({ current: true, forecast: true });
      setError({ current: null, forecast: null });

      const [current, forecast] = await Promise.allSettled([
        fetchCurrentWeather(city),
        fetchWeatherForecast(city)
      ]);

      if (current.status === "fulfilled") {
        setData(prev => ({ ...prev, current: current.value }));
      } else {
        setError(prev => ({ ...prev, current: current.reason.message }));
      }

      if (forecast.status === "fulfilled") {
        const forecastData = Array.isArray(forecast.value) ? forecast.value : [forecast.value];
        setData(prev => ({ ...prev, forecast: forecastData }));
      } else {
        setError(prev => ({ ...prev, forecast: forecast.reason.message }));
      }
    } catch (err) {
      setError({ current: "Unexpected error", forecast: "Unexpected error" });
    } finally {
      setLoading({ current: false, forecast: false });
    }
  };

  useEffect(() => {
    fetchData();
  }, [city]);

  useEffect(() => {
    const interval = setInterval(fetchData, 300000);
    return () => clearInterval(interval);
  }, [city]);

  return {
    currentWeather: data.current,
    weatherForecast: data.forecast,
    loading,
    error,
    refresh: fetchData
  };
};