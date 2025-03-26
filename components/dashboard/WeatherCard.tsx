"use client";
import { Thermometer, Droplet, Wind, SunDim, MapPin } from "lucide-react";
import { getWeatherIcon } from "../../utils/weatherUtils";
import type { WeatherData } from "../../utils/types";
import React from "react";

export const WeatherCard = ({ weather }: { weather: WeatherData }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col col-span-1">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Current Weather</h2>
        <div className="flex items-center">
          <MapPin className="text-blue-500 mr-1" />
          <span className="text-sm">{weather.location}</span>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center">
            {getWeatherIcon(weather.condition)}
            <span className="ml-2 text-lg">{weather.condition}</span>
          </div>
          <div className="flex items-center mt-4">
            <Thermometer className="mr-2 text-orange-500" />
            <span className="text-3xl font-bold">{weather.temperature}°C</span>
          </div>
          <div className="flex items-center mt-2">
            <Droplet className="mr-2 text-blue-400" />
            <span>{weather.humidity}% Humidity</span>
          </div>
          <div className="flex items-center mt-2">
            <Wind className="mr-2 text-gray-400" />
            <span>{weather.windSpeed} km/h Wind</span>
          </div>
          <div className="flex items-center mt-2">
            <SunDim className="mr-2 text-yellow-400" />
            <span>UV Index: {weather.uvIndex}</span>
          </div>
          <div className="mt-2 text-sm text-gray-500">
            Pressure: {weather.pressure} hPa
          </div>
          <p className="text-xs text-gray-400 mt-2">
            Updated: {weather.lastUpdated}
          </p>
        </div>
      </div>
    </div>
  );
};
