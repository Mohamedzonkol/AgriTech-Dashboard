"use client";
import React from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { month: "Jan", yield: 40, rainfall: 50, temp: 12 },
  { month: "Feb", yield: 45, rainfall: 45, temp: 14 },
  { month: "Mar", yield: 50, rainfall: 60, temp: 16 },
  { month: "Apr", yield: 55, rainfall: 75, temp: 18 },
  { month: "May", yield: 65, rainfall: 80, temp: 22 },
  { month: "Jun", yield: 70, rainfall: 70, temp: 26 },
  { month: "Jul", yield: 75, rainfall: 65, temp: 28 },
  { month: "Aug", yield: 80, rainfall: 60, temp: 27 },
  { month: "Sep", yield: 75, rainfall: 55, temp: 24 },
  { month: "Oct", yield: 70, rainfall: 50, temp: 20 },
  { month: "Nov", yield: 60, rainfall: 45, temp: 16 },
  { month: "Dec", yield: 50, rainfall: 40, temp: 13 },
];

export const YearlyPerformanceChart = () => {
  return (
    <div className="bg-gray-50 p-4 rounded-lg mb-8">
      <h3 className="font-semibold mb-4">Yearly Performance</h3>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis yAxisId="left" orientation="left" stroke="#4CAF50" />
          <YAxis yAxisId="right" orientation="right" stroke="#2196F3" />
          <Tooltip />
          <Legend />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="yield"
            stroke="#4CAF50"
            name="Yield (tons/ha)"
            strokeWidth={2}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="rainfall"
            stroke="#2196F3"
            name="Rainfall (mm)"
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="temp"
            stroke="#FF9800"
            name="Avg Temp (°C)"
            strokeDasharray="5 5"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
