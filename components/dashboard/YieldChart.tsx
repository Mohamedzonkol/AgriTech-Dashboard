"use client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
} from "recharts";
import { CHART_COLORS } from "../../utils/constants";
import type { CropYieldData } from "../../utils/types";
import React from "react";

export const YieldChart = ({ data }: { data: CropYieldData[] }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 col-span-1 md:col-span-2">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">
          Crop Yield Progression (2023)
        </h2>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis
            yAxisId="left"
            label={{
              value: "Yield (tons/ha)",
              angle: -90,
              position: "insideLeft",
            }}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            label={{
              value: "Rainfall (mm)",
              angle: 90,
              position: "insideRight",
            }}
          />
          <Tooltip />
          <Legend />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="yield"
            name="Actual Yield"
            stroke={CHART_COLORS[1]}
            strokeWidth={3}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="target"
            name="Target Yield"
            stroke={CHART_COLORS[3]}
            strokeWidth={2}
            strokeDasharray="5 5"
          />
          <Area
            yAxisId="right"
            type="monotone"
            dataKey="rainfall"
            name="Rainfall"
            stroke={CHART_COLORS[0]}
            fill={CHART_COLORS[0]}
            fillOpacity={0.2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
