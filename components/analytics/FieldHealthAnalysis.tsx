"use client";
import React from "react";
import {
  Legend,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const data = [
  {
    subject: "Moisture",
    A: 86,
    B: 65,
    fullMark: 100,
  },
  {
    subject: "pH Level",
    A: 72,
    B: 58,
    fullMark: 100,
  },
  {
    subject: "Nutrients",
    A: 88,
    B: 70,
    fullMark: 100,
  },
  {
    subject: "Crop Health",
    A: 90,
    B: 75,
    fullMark: 100,
  },
  {
    subject: "Weed Pressure",
    A: 65,
    B: 80,
    fullMark: 100,
  },
  {
    subject: "Pest Risk",
    A: 70,
    B: 85,
    fullMark: 100,
  },
];

const FieldHealthAnalysis = () => {
  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <h3 className="font-semibold mb-4">Field Health Analysis</h3>
      <ResponsiveContainer width="100%" height={300}>
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis angle={30} domain={[0, 100]} />
          <Radar
            name="Field A"
            dataKey="A"
            stroke="#4CAF50"
            fill="#4CAF50"
            fillOpacity={0.6}
          />
          <Radar
            name="Field B"
            dataKey="B"
            stroke="#2196F3"
            fill="#2196F3"
            fillOpacity={0.6}
          />
          <Legend />
          <Tooltip />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};
export default FieldHealthAnalysis;
