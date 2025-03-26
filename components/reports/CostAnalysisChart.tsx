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
  { category: "Labor", cost: 12500, budget: 15000 },
  { category: "Equipment", cost: 18500, budget: 20000 },
  { category: "Seeds", cost: 8500, budget: 10000 },
  { category: "Fertilizer", cost: 7500, budget: 8000 },
  { category: "Fuel", cost: 6500, budget: 7000 },
  { category: "Water", cost: 4500, budget: 5000 },
];

export const CostAnalysisChart = () => {
  return (
    <div>
      <h3 className="font-semibold mb-4">Cost Analysis</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="cost" name="Actual Cost" fill={CHART_COLORS[0]} />
            <Bar
              dataKey="budget"
              name="Budget"
              fill={CHART_COLORS[1]}
              opacity={0.5}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
