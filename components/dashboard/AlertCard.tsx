"use client";
import { AlertTriangle, ChevronRight } from "lucide-react";
import { ALERT_SEVERITY_STYLES } from "../../utils/constants";
import type { Alert } from "../../utils/types";
import { useFarmDataContext } from "@/contexts/FarmDataContext";
import { motion, AnimatePresence } from "framer-motion";

const AlertCard = ({ alerts, unreadCount }: { alerts: Alert[]; unreadCount: number }) => {
  const { markAlertAsRead } = useFarmDataContext();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
      className="bg-white rounded-2xl shadow-lg p-6 space-y-4 border border-gray-100 hover:shadow-xl"
    >
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-red-50 rounded-xl">
            <AlertTriangle className="w-5 h-5 text-red-500" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">Alerts</h2>
        </div>
        
        {unreadCount > 0 && (
          <motion.span 
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="px-2.5 py-1 bg-red-500 text-white text-xs font-semibold rounded-full"
          >
            {unreadCount} new
          </motion.span>
        )}
      </div>

      <div className="space-y-3 max-h-72 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        <AnimatePresence>
          {alerts.slice(0, 5).map((alert) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className={`relative p-4 rounded-xl border-l-4 ${ALERT_SEVERITY_STYLES[alert.severity]} ${
                !alert.read 
                  ? "bg-gray-50 hover:bg-gray-100 cursor-pointer ring-1 ring-inset ring-gray-200" 
                  : "bg-white"
              }`}
              onClick={() => !alert.read && markAlertAsRead(alert.id)}
              whileHover={{ x: 2 }}
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-gray-800">{alert.type}</span>
                    {!alert.read && (
                      <motion.span 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="inline-block w-2 h-2 rounded-full bg-red-500"
                      />
                    )}
                  </div>
                  <p className="text-sm mt-1 text-gray-600">{alert.message}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-400">{alert.time}</span>
                  {!alert.read && (
                    <ChevronRight className="w-4 h-4 text-gray-400 transition-transform group-hover:translate-x-1" />
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {alerts.length > 5 && (
        <div className="pt-2 text-center">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-sm text-gray-500 hover:text-gray-700 font-medium"
          >
            View all alerts ({alerts.length})
          </motion.button>
        </div>
      )}
    </motion.div>
  );
};

export default AlertCard;