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
import React from "react";

const data = [
  { name: "Wheat", yield: 72, target: 65 },
  { name: "Corn", yield: 58, target: 60 },
  { name: "Soy", yield: 45, target: 50 },
  { name: "Barley", yield: 38, target: 40 },
];

export const ProductionSummary = () => {
  return (
    <div className="border rounded-xl p-4">
      <h3 className="font-semibold mb-4">Production Summary</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="yield" name="Actual Yield" fill={CHART_COLORS[0]} />
            <Bar
              dataKey="target"
              name="Target Yield"
              fill={CHART_COLORS[1]}
              opacity={0.7}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="bg-green-50 p-3 rounded-lg">
          <div className="text-gray-500">Best Performing</div>
          <div className="font-bold text-lg">Wheat (72 tons)</div>
        </div>
        <div className="bg-blue-50 p-3 rounded-lg">
          <div className="text-gray-500">Total Production</div>
          <div className="font-bold text-lg">213 tons</div>
        </div>
      </div>
    </div>
  );
};
