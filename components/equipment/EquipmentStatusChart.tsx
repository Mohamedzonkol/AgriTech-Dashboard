"use client";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { CHART_COLORS } from "../../utils/constants";
import type { Equipment } from "../../utils/types";
import React from "react";

interface EquipmentQuickStatsChartProps {
  equipment: Equipment[];
  isLoading?: boolean;
}

const EquipmentStatusChart: React.FC<EquipmentQuickStatsChartProps> = ({ 
  equipment, 
  isLoading 
}) => {
  if (isLoading) {
    return (
      <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
        <div className="animate-pulse h-64 w-full rounded-lg bg-gray-100" />
      </div>
    );
  }

  if (equipment.length === 0) {
    return (
      <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm text-center flex flex-col items-center justify-center h-64">
        <svg className="w-12 h-12 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="text-gray-500">No equipment data available</p>
      </div>
    );
  }

  const safeAverage = (total: number, count: number) => (count > 0 ? total / count : 0);

  const data = [
    {
      subject: "Battery",
      value: safeAverage(equipment.reduce((sum, eq) => sum + (eq.battery || 0), 0), equipment.length),
      fullMark: 100,
    },
    {
      subject: "Uptime",
      value: (equipment.filter((eq) => eq.status === "Active").length / equipment.length) * 100 || 0,
      fullMark: 100,
    },
    {
      subject: "Online",
      value: (equipment.filter((eq) => eq.connectivity === "Online").length / equipment.length) * 100 || 0,
      fullMark: 100,
    },
  ];

  return (
    <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-gray-800">Equipment Health</h3>
        <div className="flex items-center space-x-2">
          <span className="inline-block w-3 h-3 rounded-full bg-indigo-500"></span>
          <span className="text-xs text-gray-500">Current</span>
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height={300}>
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid 
            stroke="#f0f0f0" 
            radialLines={false} 
          />
          <PolarAngleAxis 
            dataKey="subject" 
            tick={{ fill: '#64748b', fontSize: 12 }}
            axisLine={{ stroke: '#e2e8f0' }}
          />
          <PolarRadiusAxis 
            angle={30} 
            domain={[0, 100]} 
            tickCount={6}
            tick={{ fill: '#94a3b8', fontSize: 10 }}
            axisLine={{ stroke: '#e2e8f0' }}
          />
          <Radar
            name="Health"
            dataKey="value"
            stroke="#6366f1"
            fill="#6366f1"
            fillOpacity={0.3}
            strokeWidth={2}
          />
          <Tooltip 
            contentStyle={{
              borderRadius: '8px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              background: 'white',
            }}
            formatter={(value: number) => [
              `${value.toFixed(1)}%`, 
              data.find(item => item.value === value)?.subject
            ]}
          />
        </RadarChart>
      </ResponsiveContainer>
      
      <div className="mt-4 flex justify-between text-xs text-gray-500">
        <span>Last updated: {new Date().toLocaleTimeString()}</span>
        <span>{equipment.length} devices</span>
      </div>
    </div>
  );
};

export default EquipmentStatusChart;