"use client";
import { AlertTriangle } from "lucide-react";
import { ALERT_SEVERITY_STYLES } from "../../utils/constants";
import type { Alert } from "../../utils/types";
import { useFarmDataContext } from "@/contexts/FarmDataContext";
import React from "react";

const AlertCard = ({
  alerts,
  unreadCount,
}: {
  alerts: Alert[];
  unreadCount: number;
}) => {
  const { markAlertAsRead } = useFarmDataContext();

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Alerts</h2>
        <div className="flex items-center">
          <AlertTriangle className="text-red-500" />
          {unreadCount > 0 && (
            <span className="ml-1 text-sm font-medium text-red-500">
              {unreadCount} new
            </span>
          )}
        </div>
      </div>
      <div className="space-y-3 max-h-64 overflow-y-auto">
        {alerts.slice(0, 5).map((alert) => (
          <div
            key={alert.id}
            className={`p-3 rounded-lg border-l-4 ${
              ALERT_SEVERITY_STYLES[alert.severity]
            } ${!alert.read ? "ring-1 ring-inset ring-gray-300" : ""}`}
            onClick={() => markAlertAsRead(alert.id)}
          >
            <div className="flex justify-between">
              <span className="font-medium">{alert.type}</span>
              <span className="text-xs text-gray-500">{alert.time}</span>
            </div>
            <p className="text-sm mt-1">{alert.message}</p>
            {!alert.read && (
              <div className="text-right">
                <span className="inline-block w-2 h-2 rounded-full bg-red-500"></span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
export default AlertCard;
