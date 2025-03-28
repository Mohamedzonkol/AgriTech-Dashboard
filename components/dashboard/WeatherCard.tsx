"use client";
import { Thermometer, Droplet, Wind, SunDim, MapPin, AlertTriangle, Loader2 } from "lucide-react";
import { getWeatherIcon } from "../../utils/weatherUtils";
import type { WeatherData } from "../../utils/types";
import React from "react";

interface WeatherCardProps {
  weather: WeatherData | null;
  loading?: boolean;
  error?: string | null;
  className?: string;
}

const WeatherCard = ({ weather, loading = false, error = null, className = "" }: WeatherCardProps) => {
  if (loading) {
    return (
      <div className={`backdrop-blur-md bg-white/30 border border-gray-200 rounded-xl shadow-lg p-6 flex flex-col col-span-1 ${className}`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Current Weather</h2>
        <div className="flex items-center animate-pulse">
          <MapPin className="text-blue-500 mr-1" />
          <div className="h-4 w-20 bg-gray-300 rounded"></div>
        </div>
      </div>
      <div className="space-y-4">
        <div className="flex items-center">
          <div className="h-12 w-12 bg-gray-300 rounded-full"></div>
          <div className="ml-3 h-5 w-24 bg-gray-300 rounded"></div>
        </div>
        <div className="flex items-center">
          <Thermometer className="mr-2 text-orange-500" />
          <div className="h-8 w-20 bg-gray-300 rounded"></div>
        </div>
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex items-center">
            <div className="h-5 w-5 bg-gray-300 rounded-full mr-2"></div>
            <div className="h-4 w-32 bg-gray-300 rounded"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

  if (error) {
    return (
      <div className={`backdrop-blur-md bg-white/30 border border-red-300 rounded-xl shadow-lg p-6 flex flex-col col-span-1 ${className}`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Current Weather</h2>
      </div>
      <div className="flex flex-col items-center justify-center py-8 text-red-500">
        <AlertTriangle className="w-10 h-10 mb-2" />
        <p className="text-lg font-medium">Failed to load weather data</p>
        <p className="text-sm text-gray-600 mt-2">{error}</p>
      </div>
    </div>
  );
}

  if (!weather) {
    return (
      <div className={`backdrop-blur-md bg-white/30 border border-gray-200 rounded-xl shadow-lg p-6 flex flex-col col-span-1 ${className}`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Current Weather</h2>
        </div>
        <div className="flex flex-col items-center justify-center py-8 text-gray-600">
          <p>No weather data available</p>
        </div>
      </div>
    );
  }

  const lastUpdated = new Date(weather.lastUpdated);
  const isToday = lastUpdated.toDateString() === new Date().toDateString();

  return (
    <div className={`backdrop-blur-md bg-white/30 border border-gray-200 rounded-xl shadow-lg p-6 flex flex-col col-span-1 transition-transform hover:scale-105 duration-300 ${className}`}>
        <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Current Weather</h2>
        <div className="flex items-center text-gray-600">
          <MapPin className="text-blue-500 mr-1" />
          <span className="text-sm font-medium">{weather.location}</span>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <div className="text-6xl">{getWeatherIcon(weather.condition)}</div>
        <p className="text-lg font-semibold mt-2">{weather.condition}</p>
        <div className="mt-4 flex items-center space-x-2">
          <Thermometer className="text-orange-500" />
          <span className="text-3xl font-bold">{Math.round(weather.temperature)}°C</span>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-4 text-gray-700">
        <div className="flex items-center space-x-2">
          <Droplet className="text-blue-400" />
          <span>{weather.humidity}% Humidity</span>
        </div>
        <div className="flex items-center space-x-2">
          <Wind className="text-gray-500" />
          <span>{Math.round(weather.windSpeed)} km/h Wind</span>
        </div>
        <div className="flex items-center space-x-2">
          <SunDim className="text-yellow-400" />
          <span>UV Index: {weather.uvIndex}</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-gray-500">Pressure:</span>
          <span>{weather.pressure} hPa</span>
        </div>
      </div>
      <p className="text-xs text-gray-500 mt-4 text-center">
        Updated: {isToday ? lastUpdated.toLocaleTimeString() : lastUpdated.toLocaleString()}
      </p>
    </div>
  );
};

export default WeatherCard;
