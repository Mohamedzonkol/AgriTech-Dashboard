"use client";
import React from "react";
import { ProductionSummary } from "../components/reports/ProductionSummary";
import { ClipboardList, Database } from "lucide-react";
import { CostAnalysisChart } from "@/components/reports/CostAnalysisChart";
import { MonthlyProductionChart } from "@/components/reports/MonthlyProductionChart";
import { ResourceUsage } from "@/components/reports/ResourceUsage";

export const ReportsPage = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Reports</h2>
        <div className="flex space-x-2">
          <button className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg flex items-center">
            <Database className="w-4 h-4 mr-2" />
            Export Data
          </button>
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center">
            <ClipboardList className="w-4 h-4 mr-2" />
            Generate Report
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <ProductionSummary />
        <ResourceUsage />
      </div>
      <div className="bg-gray-50 p-4 rounded-lg mb-8">
        <MonthlyProductionChart />
      </div>
      <div className="bg-gray-50 p-4 rounded-lg">
        <CostAnalysisChart />
      </div>
    </div>
  );
};
