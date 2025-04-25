"use client";
import { Bell } from "lucide-react";
import { useFarmDataContext } from "@/contexts/FarmDataContext";
import { useState } from "react";
import React from "react";

const NotificationDropdown = () => {
  const { alerts, unreadAlerts, markAllAlertsAsRead, markAlertAsRead } =
    useFarmDataContext();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        className="p-2 text-gray-500 hover:text-gray-700 relative"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Bell className="h-6 w-6" />
        {unreadAlerts > 0 && (
          <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg z-10 border">
          <div className="p-3 border-b flex justify-between items-center">
            <h3 className="font-medium">Notifications</h3>
            <button
              className="text-xs text-blue-500"
              onClick={markAllAlertsAsRead}
            >
              Mark all as read
            </button>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {alerts.slice(0, 5).map((alert) => (
              <div
                key={alert.id}
                className={`p-3 border-b ${!alert.read ? "bg-blue-50" : "bg-white"
                  }`}
                onClick={() => alert.id && markAlertAsRead(alert.id)}
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
          <div className="p-3 text-center border-t">
            <button className="text-sm text-blue-500">
              View all notifications
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default NotificationDropdown;
