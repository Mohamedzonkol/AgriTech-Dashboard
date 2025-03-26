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
import { CHART_COLORS } from "../../utils/constants";
import type { SoilMoistureData } from "../../utils/types";
import React from "react";

export const SoilMoistureChart = ({ data }: { data: SoilMoistureData[] }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 col-span-1 md:col-span-2">
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        Field Soil Moisture Levels
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis
            domain={[0, 100]}
            label={{
              value: "Moisture (%)",
              angle: -90,
              position: "insideLeft",
            }}
          />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="moisture"
            name="Current Moisture"
            fill={CHART_COLORS[0]}
          />
          <Bar
            dataKey="optimal"
            name="Optimal Level"
            fill={CHART_COLORS[1]}
            opacity={0.5}
          />
        </BarChart>
      </ResponsiveContainer>
      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
        {data.slice(0, 8).map((field) => (
          <div key={field.name} className="bg-gray-50 p-3 rounded-lg">
            <div className="flex justify-between">
              <span className="font-medium">{field.name}</span>
              <span
                className={`text-sm ${
                  field.moisture < 40
                    ? "text-red-500"
                    : field.moisture > 80
                    ? "text-yellow-500"
                    : "text-green-500"
                }`}
              >
                {field.moisture}%
              </span>
            </div>
            <div className="text-sm text-gray-500 mt-1">
              pH: {field.ph.toFixed(1)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
