"use client";
import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export const ResourceUtilization = () => {
  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <h3 className="font-semibold mb-4">Resource Utilization</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={[
            { name: "Water", used: 65, allocated: 100 },
            { name: "Fertilizer", used: 45, allocated: 80 },
            { name: "Labor", used: 75, allocated: 90 },
            { name: "Fuel", used: 55, allocated: 70 },
            { name: "Energy", used: 85, allocated: 100 },
          ]}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="used" fill="#8884d8" name="Used" />
          <Bar
            dataKey="allocated"
            fill="#82ca9d"
            name="Allocated"
            opacity={0.5}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
