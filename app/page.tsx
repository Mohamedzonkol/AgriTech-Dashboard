"use client";
import React, { useState } from "react";
import Header from "../components/common/Header/Header";
import NavTabs from "../components/common/Header/NavTabs";
import { Providers } from "./Providers";
import DashboardPage from "../pages/DashboardPage";
import AnalyticsPage from "../pages/AnalyticsPage";
import FieldManagementPage from "../pages/FieldManagementPage";
import ReportsPage from "../pages/ReportsPage";
import EquipmentPage from "@/pages/EquipmentPage";

export default function Home() {
  const [selectedTab, setSelectedTab] = useState("dashboard");

  const renderPage = () => {
    switch (selectedTab) {
      case "dashboard":
        return <DashboardPage />;
      case "analytics":
        return <AnalyticsPage />;
      case "fields":
        return <FieldManagementPage />;
      case "equipment":
        return <EquipmentPage />;
      case "reports":
        return <ReportsPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <Providers>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <NavTabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
          {renderPage()}
        </div>
      </div>
    </Providers>
  );
}
