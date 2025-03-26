"use client";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { CHART_COLORS } from "../../utils/constants";
import type { Equipment } from "../../utils/types";
import React from "react";

const EquipmentUtilizationChart = ({
  equipment,
}: {
  equipment: Equipment[];
}) => {
  const data = [
    {
      subject: "Usage Hours",
      value:
        equipment.reduce((sum, eq) => sum + eq.hoursUsed, 0) / equipment.length,
      fullMark: 500,
    },
    {
      subject: "Battery Health",
      value:
        equipment.reduce((sum, eq) => sum + eq.battery, 0) / equipment.length,
      fullMark: 100,
    },
    {
      subject: "Uptime",
      value:
        (equipment.filter((eq) => eq.status === "Active").length /
          equipment.length) *
        100,
      fullMark: 100,
    },
    {
      subject: "Connectivity",
      value:
        (equipment.filter((eq) => eq.connectivity === "Online").length /
          equipment.length) *
        100,
      fullMark: 100,
    },
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="font-semibold mb-4">Equipment Utilization</h3>
      <ResponsiveContainer width="100%" height={300}>
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis angle={30} domain={[0, 100]} />
          <Radar
            name="Equipment"
            dataKey="value"
            stroke={CHART_COLORS[0]}
            fill={CHART_COLORS[0]}
            fillOpacity={0.6}
          />
          <Tooltip />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};
export default EquipmentUtilizationChart;
