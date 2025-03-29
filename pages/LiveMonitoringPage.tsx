"use client";
import { useRef, useState, useEffect } from "react";
import {
  Monitor,
  RefreshCw,
  Minimize2,
  Expand,
  Settings,
  Maximize2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const LivePage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  //   const [showSettings, setShowSettings] = useState(false);

  // Toggle fullscreen mode
  const toggleFullscreen = async () => {
    if (!document.fullscreenElement) {
      await containerRef.current?.requestFullscreen();
    } else {
      await document.exitFullscreen();
    }
  };

  // Refresh iframe content
  const handleRefresh = () => {
    const iframe = containerRef.current?.querySelector("iframe");
    if (iframe) {
      setIsLoading(true);
      iframe.src = iframe.src;
    }
  };

  // Handle fullscreen changes
  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", handler);
    return () => document.removeEventListener("fullscreenchange", handler);
  }, []);

  // Handle iframe load
  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={`
        bg-gradient-to-br from-gray-50 to-white
        rounded-2xl shadow-xl overflow-hidden
        ${isFullscreen ? "fixed inset-0 !rounded-none bg-gray-900" : ""}
      `}
    >
      {/* Header with controls */}
      <AnimatePresence>
        {!isFullscreen && (
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            className="p-6 pb-0 flex justify-between items-center"
          >
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                Live Dashboard
              </h2>
              <p className="text-sm text-gray-500">Real-time monitoring</p>
            </div>
            <div className="flex space-x-3">
              {/* <button
                onClick={() => setShowSettings(!showSettings)}
                className="p-2 rounded-full hover:bg-gray-200 transition-colors"
                aria-label="Settings"
              >
                <Settings className="w-5 h-5 text-gray-600" />
              </button> */}
              <button
                onClick={handleRefresh}
                className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <RefreshCw
                  className={`w-5 h-5 ${isLoading ? "animate-spin" : ""}`}
                />
                <span>Refresh</span>
              </button>
              <button
                onClick={toggleFullscreen}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Maximize2 className="w-5 h-5" />
                <span>Fullscreen</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Settings panel */}
      {/* <AnimatePresence>
        {showSettings && !isFullscreen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="px-6 overflow-hidden"
          >
            <div className="py-4 border-t border-gray-200">
              <h3 className="font-medium mb-3">Dashboard Settings</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Refresh Rate
                  </label>
                  <select className="w-full p-2 border rounded-lg">
                    <option>5 seconds</option>
                    <option>15 seconds</option>
                    <option>30 seconds</option>
                    <option>Manual</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Theme
                  </label>
                  <select className="w-full p-2 border rounded-lg">
                    <option>Light</option>
                    <option>Dark</option>
                    <option>System</option>
                  </select>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence> */}

      {/* Loading indicator */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center bg-white/80 z-10"
          >
            <div className="animate-pulse flex flex-col items-center">
              <RefreshCw className="w-8 h-8 animate-spin text-blue-600" />
              <p className="mt-3 text-gray-600">Loading dashboard...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Iframe container */}
      <div className={`relative ${isFullscreen ? "h-screen" : "h-[75vh]"}`}>
        <iframe
          src="/apex-test.html"
          className="w-full h-full border-none"
          sandbox="allow-scripts allow-same-origin allow-fullscreen"
          title="Live Monitoring Dashboard"
          allow="fullscreen"
          onLoad={handleIframeLoad}
        />
      </div>

      {/* Fullscreen controls */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed top-4 right-4 flex space-x-3 z-50"
          >
            <button
              onClick={handleRefresh}
              className="p-3 rounded-full bg-gray-800/80 hover:bg-gray-700/90 backdrop-blur-sm text-white transition-colors"
              aria-label="Refresh"
            >
              <RefreshCw
                className={`w-5 h-5 ${isLoading ? "animate-spin" : ""}`}
              />
            </button>
            <button
              onClick={toggleFullscreen}
              className="p-3 rounded-full bg-gray-800/80 hover:bg-gray-700/90 backdrop-blur-sm text-white transition-colors"
              aria-label="Exit fullscreen"
            >
              <Minimize2 className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default LivePage;
