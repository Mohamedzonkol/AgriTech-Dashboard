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
} from "recharts";
import { CHART_COLORS } from "../../utils/constants";
import React from "react";

const data = [
  { month: "Jan", wheat: 40, corn: 30, soy: 20 },
  { month: "Feb", wheat: 45, corn: 35, soy: 25 },
  { month: "Mar", wheat: 50, corn: 40, soy: 30 },
  { month: "Apr", wheat: 55, corn: 45, soy: 35 },
  { month: "May", wheat: 65, corn: 50, soy: 40 },
  { month: "Jun", wheat: 70, corn: 55, soy: 45 },
  { month: "Jul", wheat: 75, corn: 60, soy: 50 },
  { month: "Aug", wheat: 80, corn: 65, soy: 55 },
  { month: "Sep", wheat: 75, corn: 60, soy: 50 },
  { month: "Oct", wheat: 70, corn: 55, soy: 45 },
  { month: "Nov", wheat: 60, corn: 45, soy: 35 },
  { month: "Dec", wheat: 50, corn: 35, soy: 25 },
];

const MonthlyProductionChart = () => {
  return (
    <div>
      <h3 className="font-semibold mb-4">Monthly Production</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="wheat"
              name="Wheat"
              stroke={CHART_COLORS[0]}
            />
            <Line
              type="monotone"
              dataKey="corn"
              name="Corn"
              stroke={CHART_COLORS[1]}
            />
            <Line
              type="monotone"
              dataKey="soy"
              name="Soy"
              stroke={CHART_COLORS[2]}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
export default MonthlyProductionChart;
