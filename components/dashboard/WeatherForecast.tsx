"use client";
import { Sun, CloudRain, Cloud, CloudSnow, CloudSun, AlertTriangle, Droplet, Wind, Thermometer, Gauge } from "lucide-react";
import type { WeatherForecast } from "../../utils/types";

interface WeatherForecastProps {
  forecast: WeatherForecast[];
  error?: string | null;
  loading?: boolean;
  className?: string;
}

const WeatherForecast = ({ forecast, error, loading, className = "" }: WeatherForecastProps) => {
  const getWeatherIcon = (condition: string) => {
    const iconClasses = "w-6 h-6 md:w-8 md:h-8 transition-transform duration-300";
    
    switch (condition.toLowerCase()) {
      case 'clear': return <Sun className={`${iconClasses} text-yellow-400`} />;
      case 'rain': return <CloudRain className={`${iconClasses} text-blue-500`} />;
      case 'clouds': return <Cloud className={`${iconClasses} text-gray-400`} />;
      case 'snow': return <CloudSnow className={`${iconClasses} text-blue-300`} />;
      case 'partly-cloudy': return <CloudSun className={`${iconClasses} text-gray-300`} />;
      default: return <Cloud className={`${iconClasses} text-gray-300`} />;
    }
  };

  if (error) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center text-red-500">
        <AlertTriangle className="w-10 h-10 mx-auto mb-2" />
        <p className="font-semibold">Failed to load forecast</p>
        <p className="text-sm text-gray-500 mt-1">{error}</p>
      </div>
    );
  }

  if (!forecast || forecast.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">5-Day Forecast</h2>
        <p className="text-gray-500">No forecast data available</p>
      </div>
    );
  }

  // Calculate summary stats
  const avgTemp = Math.round(forecast.reduce((sum, day) => sum + (day.high + day.low) / 2, 0) / forecast.length);
  const totalRain = forecast.reduce((sum, day) => sum + (day.precipitation || 0), 0);
  const avgWind = Math.round(forecast.reduce((sum, day) => sum + day.wind, 0) / forecast.length);
  const avgHumidity = Math.round(forecast.reduce((sum, day) => sum + day.humidity, 0) / forecast.length);

  return (
    <div className={`backdrop-blur-md bg-white/30 dark:bg-gray-900 border border-gray-200 rounded-xl shadow-lg p-6 flex flex-col col-span-1 transition-transform hover:scale-105 duration-300 ${className}`}>
    {/* <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6"> */}
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">5-Day Forecast</h2>
      
      <div className="space-y-4">
        {forecast.map((day) => (
          <div key={day.date} className="flex items-center justify-between p-3 rounded-lg bg-gray-100 dark:bg-gray-800 hover:shadow-md transition-shadow">
            <span className="font-medium text-gray-700 dark:text-gray-300">
              {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
            </span>
            <div>{getWeatherIcon(day.condition)}</div>
            <div className="flex items-center space-x-3">
              <span className="text-gray-500 dark:text-gray-400 w-8 text-right">{Math.round(day.low)}°</span>
              <div className="flex-1 h-2 bg-gradient-to-r from-blue-400 to-red-400 rounded-full relative overflow-hidden">
                <div 
                  className="absolute h-2 bg-white dark:bg-gray-700 rounded-full transition-all"
                  style={{ left: `${(day.low / 40) * 100}%`, right: `${100 - ((day.high / 40) * 100)}%` }}
                />
              </div>
              <span className="font-medium w-8 text-gray-700 dark:text-gray-200">{Math.round(day.high)}°</span>
            </div>
            <div className="flex space-x-3">
              {day.precipitation > 0 && (
                <span className="text-blue-500 text-sm flex items-center">
                  <Droplet className="w-4 h-4 mr-1" />{day.precipitation}mm
                </span>
              )}
              <span className="text-gray-500 dark:text-gray-400 text-sm flex items-center">
                <Wind className="w-4 h-4 mr-1" />{Math.round(day.wind)}km/h
              </span>
            </div>
          </div>
        ))}
      </div>
      
      {/* Summary Stats */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
        <div className="flex items-center space-x-3 text-gray-500 dark:text-gray-300">
          <Thermometer className="w-5 h-5" />
          <span>Avg: {avgTemp}°C</span>
        </div>
        <div className="flex items-center space-x-3 text-gray-500 dark:text-gray-300">
          <Droplet className="w-5 h-5" />
          <span>Rain: {totalRain.toFixed(1)}mm</span>
        </div>
        <div className="flex items-center space-x-3 text-gray-500 dark:text-gray-300">
          <Wind className="w-5 h-5  " />
          <span>Wind: {avgWind}km/h</span>
        </div>
        <div className="flex items-center space-x-3 text-gray-500 dark:text-gray-300">
          <Gauge className="w-5 h-5" />
          <span>Humidity: {avgHumidity}%</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherForecast;
