"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  AlertTriangle,
  Loader2,
  Droplets,
  RefreshCw,
} from "lucide-react";
import { CHART_COLORS } from "../../utils/constants";
import type { SoilMoistureData } from "../../utils/types";
import React, { useState } from "react";
import { useSoilMoistureData } from "@/hooks/UseSoilMoistureData";

interface SoilMoistureStatusProps {
  soilMoisture?: SoilMoistureData[];
  error?: string | null;
  loading?: boolean;
  className?: string;
  onRefresh?: () => void;
}

const SoilMoistureChart = ({
  soilMoisture: initialSoilMoisture = [],
  error: propError,
  loading: propLoading,
  className = "",
  onRefresh,
}: SoilMoistureStatusProps) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { soilData, loading: hookLoading, error: hookError, refetch } = useSoilMoistureData();
  
  // Use props if provided, otherwise use hook data
  const soilMoisture = initialSoilMoisture.length > 0 ? initialSoilMoisture : soilData;
  const error = propError || hookError;
  const loading = propLoading || hookLoading || isRefreshing;

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      if (onRefresh) {
        await onRefresh();
      } else {
        await refetch();
      }
    } finally {
      setIsRefreshing(false);
    }
  };

  if (loading) {
    return (
      <div className={`bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm p-6 col-span-2 ${className}`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white/90">
            Soil Moisture Status
          </h2>
          <div className="h-8 w-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
            <Loader2 className="w-4 h-4 text-gray-500 dark:text-gray-400 animate-spin" />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center py-12 space-y-4">
          <div className="relative">
            <div className="w-16 h-16 bg-gradient-to-tr from-green-500 to-emerald-400 rounded-full flex items-center justify-center shadow-lg">
              <Loader2 className="w-6 h-6 text-white animate-spin" />
            </div>
            <div className="absolute -inset-1.5 border-2 border-green-400/30 rounded-full animate-pulse" />
          </div>
          <div className="text-center space-y-2">
            <p className="text-gray-700 dark:text-gray-300 font-bold">
              Loading soil data
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400/80">
              Gathering readings from sensors...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`bg-white dark:bg-gray-900 rounded-xl border border-red-100 dark:border-red-900/50 shadow-sm p-6 col-span-2${className}`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white/90">
            Soil Moisture Status
          </h2>
          <button 
            onClick={handleRefresh}
            disabled={loading}
            className="h-8 w-8 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 flex items-center justify-center transition-colors"
            aria-label="Refresh data"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 text-gray-500 dark:text-gray-400 animate-spin" />
            ) : (
              <RefreshCw className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            )}
          </button>
        </div>
        <div className="flex flex-col items-center justify-center py-10 space-y-4">
          <div className="relative">
            <div className="w-16 h-16 bg-gradient-to-br from-red-100 to-rose-100 dark:from-red-900/30 dark:to-rose-900/20 rounded-full flex items-center justify-center shadow-lg">
              <AlertTriangle className="w-7 h-7 text-red-500 dark:text-red-400" />
            </div>
            <div className="absolute -inset-1.5 border-2 border-red-200 dark:border-red-900/30 rounded-full" />
          </div>
          <div className="text-center space-y-2">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              Failed to load data
            </h3>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 max-w-xs">
              {error}
            </p>
            <button
              onClick={handleRefresh}
              disabled={loading}
              className="mt-3 px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-lg text-sm font-bold text-gray-700 dark:text-gray-300 transition-colors flex items-center space-x-2"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <RefreshCw className="w-4 h-4" />
              )}
              <span>{loading ? "Refreshing..." : "Try again"}</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!soilMoisture || soilMoisture.length === 0) {
    return (
      <div className={`bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm p-6 col-span-2 ${className}`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white/90">
            Soil Moisture Status
          </h2>
          <button 
            onClick={handleRefresh}
            disabled={loading}
            className="h-8 w-8 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 flex items-center justify-center transition-colors"
            aria-label="Refresh data"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 text-gray-500 dark:text-gray-400 animate-spin" />
            ) : (
              <RefreshCw className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            )}
          </button>
        </div>
  
        <div className="flex flex-col items-center justify-center py-12 space-y-4">
          <div className="relative">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center shadow-inner">
              <Droplets className="w-6 h-6 text-gray-400 dark:text-gray-500" />
            </div>
            <div className="absolute -inset-1.5 border-2 border-gray-200 dark:border-gray-700/30 rounded-full" />
          </div>
  
          <div className="text-center space-y-2">
            <h3 className="text-lg font-bold text-gray-700 dark:text-gray-300">
              No data available
            </h3>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Sensor readings have not been received yet.
            </p>
          </div>
  
         
          <div className="flex justify-center">
            <button
              onClick={handleRefresh}
              disabled={loading}
              className="mt-3 px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-lg text-sm font-bold text-gray-700 dark:text-gray-300 transition-colors flex items-center space-x-2"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <RefreshCw className="w-4 h-4" />
              )}
              <span>{loading ? "Refreshing..." : "Refresh"}</span>
            </button>
          </div>
        </div>
      </div>
    );
  }
  

  return (
    <div className={`bg-white rounded-xl shadow-lg p-6 col-span-2 ${className} `}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-900 ">
          Field Soil Moisture Levels
        </h2>
        <button 
          onClick={handleRefresh}
          className={`h-8 w-8 rounded-full ${loading ? 'bg-gray-100 dark:bg-gray-800' : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700'} flex items-center justify-center transition-colors`}
          disabled={loading}
          aria-label="Refresh data"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 text-gray-500 dark:text-gray-400 animate-spin col-span-2" />
          ) : (
            <RefreshCw className="w-4 h-4 text-gray-500 dark:text-gray-400 col-span-2" />
          )}
        </button>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={soilMoisture}>
          <CartesianGrid strokeDasharray="3 3" stroke="#eee" strokeOpacity={0.3} />
          <XAxis 
            dataKey="name" 
            stroke="#888" 
            tick={{ fill: '#666', fontSize: 12 }}
          />
          <YAxis
            domain={[0, 100]}
            stroke="#888"
            tick={{ fill: '#666', fontSize: 12 }}
            label={{
              value: "Moisture (%)",
              angle: -90,
              position: "insideLeft",
              fill: '#666',
              fontSize: 12,
            }}
          />
          <Tooltip 
            contentStyle={{
              background: 'rgba(255, 255, 255, 0.95)',
              borderColor: '#eee',
              borderRadius: '0.5rem',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            }}
          />
          <Legend />
          <Bar
            dataKey="moisture"
            name="Current Moisture"
            fill={CHART_COLORS[0]}
            radius={[4, 4, 0, 0]}
          />
          <Bar
            dataKey="optimal"
            name="Optimal Level"
            fill={CHART_COLORS[1]}
            opacity={0.7}
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3 ">
        {soilMoisture.slice(0, 8).map((field) => (
          <div 
            key={field.id} 
            className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg border border-gray-100 dark:border-gray-700/50 hover:shadow-sm transition-shadow transition-transform hover:scale-105 duration-300"
          >
            <div className="flex justify-between items-center ">
              <span className="font-bold text-gray-600 dark:text-gray-300 text-sm">
                {field.name}
              </span>
              <span
                className={`text-xs font-bold px-2 py-1 rounded-full ${
                  field.moisture < 40
                    ? "bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400"
                    : field.moisture > 80
                    ? "bg-yellow-50 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400"
                    : "bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400"
                }`}
              >
                {field.moisture}%
              </span>
            </div>
            <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mt-1.5">
              pH: {field.ph.toFixed(2)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SoilMoistureChart;