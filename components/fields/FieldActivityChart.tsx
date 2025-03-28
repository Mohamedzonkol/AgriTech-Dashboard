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
  Label,
} from "recharts";
import { CHART_COLORS } from "../../utils/constants";
import { useFieldData } from "../../hooks/useFieldData";
import React from "react";
import ErrorMessage from "./ErrorMessage";
import SkeletonLoader from "./SkeletonLoader";

const FieldActivityChart = () => {
  const { fields, loading, error } = useFieldData();

  // Process data with error handling for dates
  const chartData = fields.map((field) => {
    const harvestDate = new Date(field.harvestDate);
    const isValidDate = !isNaN(harvestDate.getTime());
    
    return {
      id: field.id,
      name: field.name.length > 10 ? `${field.name.substring(0, 8)}...` : field.name,
      fullName: field.name,
      size: field.size,
      daysToHarvest: isValidDate 
        ? Math.max(0, Math.floor((harvestDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
        : null,
      status: field.status,
      crop: field.crop,
    };
  }).filter(item => item.daysToHarvest !== null); // Filter out invalid dates

  // Custom tooltip formatter
  const renderTooltipContent = (props: any) => {
    const { active, payload, label } = props;
    if (!active || !payload || !payload.length) return null;

    const fieldData = chartData.find(item => item.name === label) || 
                     { fullName: label, daysToHarvest: 'N/A', size: 'N/A', crop: 'Unknown', status: 'Unknown' as const };

    return (
      <div className="bg-white p-4 border rounded-lg shadow-lg">
        <p className="font-bold">{fieldData.fullName}</p>
        <p className="text-sm">
          <span className="inline-block w-24">Status:</span>
          <span>{fieldData.status || 'Unknown'}</span>
        </p>
        <p className="text-sm">
          <span className="inline-block w-24">Crop:</span>
          <span>{fieldData.crop || 'Unknown'}</span>
        </p>
        {payload.map((entry: any, index: number) => (
          <p key={`tooltip-${index}`} className="text-sm" style={{ color: entry.color }}>
            <span className="inline-block w-24">{entry.name}:</span>
            <span>{entry.value} {entry.name.includes('Size') ? 'ha' : 'days'}</span>
          </p>
        ))}
      </div>
    );
  };

  if (loading) return <SkeletonLoader count={3} />;
  if (error) return <ErrorMessage message={error} />;
  if (chartData.length === 0) return <div className="text-center py-8 text-gray-500">No field data available</div>;

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h3 className="text-lg font-semibold text-gray-800 mb-6">
        Field Activity Overview
      </h3>
      
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
          barSize={40}
          barGap={4}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="name" 
            angle={-45} 
            textAnchor="end" 
            height={70}
            tick={{ fontSize: 12 }}
          >
            <Label 
              value="Field Names" 
              offset={-5} 
              position="insideBottom" 
              className="text-sm"
            />
          </XAxis>
          <YAxis 
            yAxisId="left" 
            orientation="left" 
            stroke={CHART_COLORS[0]}
            label={{
              value: 'Size (ha)',
              angle: -90,
              position: 'insideLeft',
              style: { textAnchor: 'middle' },
              offset: 10
            }}
          />
          <YAxis 
            yAxisId="right" 
            orientation="right" 
            stroke={CHART_COLORS[1]}
            label={{
              value: 'Days to Harvest',
              angle: 90,
              position: 'insideRight',
              style: { textAnchor: 'middle' },
              offset: 10
            }}
          />
          <Tooltip content={renderTooltipContent} />
          <Legend 
            verticalAlign="top" 
            height={36}
            formatter={(value) => <span className="text-sm">{value}</span>}
          />
          <Bar
            yAxisId="left"
            dataKey="size"
            name="Field Size"
            fill={CHART_COLORS[0]}
            radius={[4, 4, 0, 0]}
          />
          <Bar
            yAxisId="right"
            dataKey="daysToHarvest"
            name="Harvest Countdown"
            fill={CHART_COLORS[1]}
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FieldActivityChart;