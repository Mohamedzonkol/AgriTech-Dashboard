"use client";
import { AlertTriangle, ChevronRight, X } from "lucide-react";
import { ALERT_SEVERITY_STYLES } from "../../utils/constants";
import type { EmergencyAlert } from "../../utils/types";
import { useAlertData } from "@/hooks/useAlertData";
import { motion, AnimatePresence } from "framer-motion";
import { EmergencyType, SeverityType } from "../../utils/types";
import { useCallback, useState } from "react";
import MapComponent from "../ui/map";
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';



const AlertCard = () => {
  const { alerts, unreadCount, loading, error, markAlertAsRead } = useAlertData();
  const [selectedAlert, setSelectedAlert] = useState<EmergencyAlert | null>(null);
  const [showAllAlerts, setShowAllAlerts] = useState(false);

  const formatEmergencyType = useCallback((type: EmergencyType): string => {
    if (!type) return "Unknown";
    return type
      .toString()
      .split(/(?=[A-Z])/)
      .join(' ');
  }, []);

  const handleAlertClick = useCallback((alert: EmergencyAlert) => {
    if (!alert.read && alert.id) {
      markAlertAsRead(alert.id);
    }
    setSelectedAlert(alert);
  }, [markAlertAsRead]);
  const mapContainerStyle = {
    width: '100%',
    height: '100%',
    borderRadius: '0.5rem',
  };

  const center = {
    lat: selectedAlert?.latitude || 0,
    lng: selectedAlert?.longitude || 0,
  };
  const displayedAlerts = showAllAlerts ? alerts : alerts.slice(0, 5);
  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 animate-pulse space-y-4">
        <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-6 bg-gray-100 rounded mb-4 last:mb-0"></div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative bg-gradient-to-tr from-red-50 to-white border border-red-200 rounded-2xl shadow-xl p-6 transition-transform duration-300 hover:scale-105">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 bg-red-100 text-red-600 rounded-full">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-red-600">Error loading alerts</h3>
            <p className="mt-1 text-sm text-red-500">{error}</p>
          </div>
        </div>
      </div>
    );
  }




  return (
    <div className="relative">
      {/* Main Alert Card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
        className="bg-white rounded-2xl shadow-lg p-6 space-y-4 border border-gray-100 hover:shadow-xl backdrop-blur-sm bg-opacity-90"
      >
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-br from-red-100 to-red-50 rounded-xl shadow-inner">
              <AlertTriangle className="w-5 h-5 text-red-500" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Emergency Alerts</h2>
              <p className="text-xs text-gray-500">Real-time incident notifications</p>
            </div>
          </div>

          {unreadCount > 0 && (
            <motion.span
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="px-2.5 py-1 bg-gradient-to-r from-red-500 to-red-400 text-white text-xs font-semibold rounded-full shadow-sm"
            >
              {unreadCount} unread
            </motion.span>
          )}
        </div>

        <div className="space-y-3 max-h-72 overflow-y-auto pr-2 custom-scrollbar">
          {alerts.length === 0 ? (
            <div className="text-center py-6">
              <div className="inline-flex flex-col items-center text-gray-400">
                <AlertTriangle className="w-8 h-8 mb-2 opacity-60" />
                <span>No active alerts</span>
                <span className="text-xs mt-1">You're all caught up</span>
              </div>
            </div>
          ) : (
            <AnimatePresence>
              {displayedAlerts.map((alert) => {
                const alertDate = alert.createdAt ? new Date(alert.createdAt) : new Date();
                const coordinates = alert.latitude !== undefined && alert.longitude !== undefined
                  ? `${alert.latitude.toFixed(4)}, ${alert.longitude.toFixed(4)}`
                  : "Unknown location";

                return (
                  <motion.div
                    key={alert.id || `${alertDate.getTime()}`}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                    className={`relative p-4 rounded-xl border-l-4 ${ALERT_SEVERITY_STYLES[
                      (alert.severity?.toLowerCase() || 'medium') as keyof typeof ALERT_SEVERITY_STYLES
                    ]
                      } ${!alert.read
                        ? "bg-gradient-to-r from-gray-50 to-white cursor-pointer ring-1 ring-inset ring-gray-200/50 hover:ring-gray-300"
                        : "bg-white"
                      } transition-all duration-200 ease-in-out`}
                    onClick={() => handleAlertClick(alert)}
                    whileHover={{ x: 2 }}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-gray-800 truncate">
                            {formatEmergencyType(alert.type)}
                          </span>
                          {!alert.read && (
                            <motion.span
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="flex-shrink-0 inline-block w-2 h-2 rounded-full bg-red-500 animate-pulse"
                            />
                          )}
                        </div>
                        <p className="text-sm mt-1 text-gray-600 break-words line-clamp-2">
                          {alert.message || "No message provided"}
                        </p>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {alert.locationDescription && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                              {alert.locationDescription}
                            </span>
                          )}
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            {coordinates}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end ml-2 space-y-0.5">
                        <span className="text-xs font-medium text-gray-500 whitespace-nowrap">
                          {alertDate.toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                        <span className="text-xs text-gray-400 whitespace-nowrap">
                          {alertDate.toLocaleDateString()}
                        </span>
                        {!alert.read && (
                          <ChevronRight className="w-4 h-4 text-gray-400 mt-1 transition-transform group-hover:translate-x-1" />
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          )}
        </div>

        {alerts.length > 5 && (
          <div className="pt-2 text-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-sm font-medium px-4 py-2 rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-600 hover:text-gray-800 transition-colors"
              onClick={() => setShowAllAlerts(!showAllAlerts)}
            >
              {showAllAlerts ? "Show less" : `View all alerts (${alerts.length})`}
              <ChevronRight className={`w-4 h-4 inline ml-1 transition-transform ${showAllAlerts ? 'rotate-90' : ''}`} />
            </motion.button>
          </div>
        )}
      </motion.div>

      {/* Alert Detail Modal */}
      <AnimatePresence>
        {selectedAlert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedAlert(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-200"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center space-x-2">
                      <div className={`p-2 rounded-lg ${ALERT_SEVERITY_STYLES[
                        (selectedAlert.severity?.toLowerCase() || 'medium') as keyof typeof ALERT_SEVERITY_STYLES
                      ].split(' ')[0]
                        }`}>
                        <AlertTriangle className="text-yellow-500 w-5 h-5" />
                      </div>
                      <h3 className="text-2xl font-bold text-sky-900">
                        {formatEmergencyType(selectedAlert.type)}
                      </h3>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      {new Date(selectedAlert.createdAt || new Date()).toLocaleString()}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedAlert(null)}
                    className="p-1 rounded-full hover:bg-sky-100 transition-colors"
                  >
                    <X className="w-5 h-5 text-sky-600" />
                  </button>
                </div>

                <div className="space-y-5">
                  <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                    <h4 className="font-bold text-blue-800 mb-3">Alert Details</h4>
                    <p className="text-gray-700">{selectedAlert.message || "No message provided"}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
                      <h4 className="font-bold text-indigo-800 mb-3">Location Information</h4>
                      <div className="space-y-3">
                        <div>
                          <p className="text-xs font-medium text-indigo-500 mb-1">Description</p>
                          <p className="text-sm text-gray-700">
                            {selectedAlert.locationDescription || "Not specified"}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-indigo-500 mb-1">Coordinates</p>
                          <p className="text-sm text-gray-700">
                            {selectedAlert.latitude !== undefined && selectedAlert.longitude !== undefined
                              ? `${selectedAlert.latitude.toFixed(4)}, ${selectedAlert.longitude.toFixed(4)}`
                              : "Unknown"}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-violet-50 p-4 rounded-lg border border-violet-200">
                      <h4 className="font-bold text-violet-800 mb-3">Alert Metadata</h4>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <p className="text-xs font-medium text-violet-500 mb-1">Severity</p>
                          <p className="text-sm font-medium text-red-700">
                            {selectedAlert.severity || "Not specified"}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-violet-500 mb-1">Status</p>
                          <p className={`text-sm font-medium ${selectedAlert.read ? "text-green-600" : "text-amber-600"}`}>
                            {selectedAlert.read ? "Read" : "Unread"}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-violet-500 mb-1">Type</p>
                          <p className="text-sm font-medium text-amber-700">
                            {formatEmergencyType(selectedAlert.type)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* {selectedAlert.latitude && selectedAlert.longitude && (
                    <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
                      <h4 className="font-bold text-emerald-800 mb-3">Map Location</h4>
                      <MapComponent lat={selectedAlert.latitude} lng={selectedAlert.longitude} />
                      <p className="text-emerald-500 text-xs mt-2 text-center">
                        Coordinates: {selectedAlert.latitude.toFixed(4)}, {selectedAlert.longitude.toFixed(4)}
                      </p>
                    </div>
                  )} */}
                  {selectedAlert.latitude && selectedAlert.longitude && (
                    <div className="bg-emerald-50 p-4 rounded-lg border border-gray-200">
                      <h4 className="font-bold text-gray-800 mb-3">Map Location</h4>
                      <div className="mt-2 aspect-video rounded-lg overflow-hidden border border-gray-200">
                        <LoadScript googleMapsApiKey="AIzaSyC4E9UYqYHLo79OB3HDsEASYp8XAnmn8LM">
                          <GoogleMap
                            mapContainerStyle={mapContainerStyle}
                            center={center}
                            zoom={14}
                          >
                            <Marker position={center} />
                          </GoogleMap>
                        </LoadScript>
                      </div>
                      <p className="text-emerald-500 text-xs mt-2 text-center">
                        Coordinates: {selectedAlert.latitude.toFixed(4)}, {selectedAlert.longitude.toFixed(4)}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(243, 244, 246, 0.5);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(209, 213, 219, 0.7);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(156, 163, 175, 0.8);
        }
      `}</style>
    </div>
  );
};

export default AlertCard;