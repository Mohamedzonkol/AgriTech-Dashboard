"use client";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { CHART_COLORS } from "../../utils/constants";
import React from "react";

const data = [
  { name: "Water", value: 35 },
  { name: "Fertilizer", value: 25 },
  { name: "Fuel", value: 20 },
  { name: "Labor", value: 20 },
];

export const ResourceUsage = () => {
  return (
    <div className="border rounded-xl p-4">
      <h3 className="font-semibold mb-4">Resource Usage</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) =>
                `${name} ${(percent * 100).toFixed(0)}%`
              }
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={CHART_COLORS[index % CHART_COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 text-sm text-gray-600">
        <div className="flex justify-between py-1">
          <span>Water Consumption:</span>
          <span className="font-medium">1,250,000 L</span>
        </div>
        <div className="flex justify-between py-1">
          <span>Fertilizer Used:</span>
          <span className="font-medium">3,450 kg</span>
        </div>
      </div>
    </div>
  );
};
