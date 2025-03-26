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
import type { Field } from "../../utils/types";
import React from "react";

const FieldActivityChart = ({ fields }: { fields: Field[] }) => {
  const data = fields.map((field) => ({
    name: field.name,
    size: field.size,
    daysToHarvest: Math.floor(
      (new Date(field.harvestDate).getTime() - Date.now()) /
        (1000 * 60 * 60 * 24)
    ),
  }));

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="font-semibold mb-4">Field Activity Overview</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis yAxisId="left" orientation="left" stroke={CHART_COLORS[0]} />
          <YAxis yAxisId="right" orientation="right" stroke={CHART_COLORS[1]} />
          <Tooltip />
          <Legend />
          <Bar
            yAxisId="left"
            dataKey="size"
            name="Size (ha)"
            fill={CHART_COLORS[0]}
          />
          <Bar
            yAxisId="right"
            dataKey="daysToHarvest"
            name="Days to Harvest"
            fill={CHART_COLORS[1]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
export default FieldActivityChart;
