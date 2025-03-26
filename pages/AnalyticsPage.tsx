"use client";
import React from "react";
import { CropDistributionChart } from "../components/analytics/CropDistributionChart";
import { FieldHealthAnalysis } from "../components/analytics/FieldHealthAnalysis";
import { ResourceUtilization } from "../components/analytics/ResourceUtilizationChart";
import { YearlyPerformanceChart } from "../components/analytics/YearlyPerformanceChart";

export const AnalyticsPage = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Farm Analytics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <CropDistributionChart />
        <ResourceUtilization />
      </div>
      <div className="bg-gray-50 p-4 rounded-lg mb-8">
        <YearlyPerformanceChart />
      </div>
      <div className="bg-gray-50 p-4 rounded-lg">
        <FieldHealthAnalysis />
      </div>
    </div>
  );
};
