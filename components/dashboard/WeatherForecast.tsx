"use client";
import { getWeatherIcon } from "../../utils/weatherUtils";
import type { WeatherForecast as WeatherForecastType } from "../../utils/types";
import React from "react";
import { Wind } from "lucide-react";

export const WeatherForecast = ({
  forecast,
}: {
  forecast: WeatherForecastType[];
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 col-span-1">
      <h2 className="text-xl font-bold text-gray-800 mb-4">5-Day Forecast</h2>
      <div className="space-y-3">
        {forecast.map((day, index) => (
          <div
            key={index}
            className="flex items-center justify-between py-2 border-b"
          >
            <span className="font-medium w-16">{day.date}</span>
            <div className="flex items-center w-16">
              {getWeatherIcon(day.condition)}
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-500">{day.low}°</span>
              <div className="w-20 bg-gray-200 rounded-full h-1.5">
                <div
                  className="bg-blue-500 h-1.5 rounded-full"
                  style={{ width: `${((day.high - day.low) / 30) * 100}%` }}
                ></div>
              </div>
              <span>{day.high}°</span>
            </div>
            <div className="flex flex-col items-end">
              {day.precipitation > 0 && (
                <span className="text-blue-500 text-xs">
                  {day.precipitation}mm
                </span>
              )}
              <span className="text-xs text-gray-500 flex items-center">
                <Wind className="w-3 h-3 mr-1" />
                {day.wind} km/h
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
