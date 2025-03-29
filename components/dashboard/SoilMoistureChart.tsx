// "use client";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";
// import { CHART_COLORS } from "../../utils/constants";
// import { useFieldData } from "../../hooks/useFieldData";
// import React from "react";
// import { Droplet, Thermometer, AlertTriangle, Loader2, RefreshCw } from "lucide-react";

// const SoilMoistureChart = () => {
//   const { fields, loading, error, fetchFields } = useFieldData();

//   Transform field data for the chart
//   const chartData = React.useMemo(() => {
//     return fields.map(field => ({
//       name: field.name || 'Unknown Field',
//       // moisture: field.moistureLevel || 0,
//       // optimal: field.optimalMoisture || 60, // Default optimal level
//       moisture : 30,
//       optimal : 60
//       ph: field.phValue || 6.5,
//       temperature: field.soilTemperature,
//       lastUpdated: field.lastReading
//     }));
//   }, [fields]);

//   const refreshData = () => {
//     React.startTransition(() => {
//       fetchFields();
//     });
//   };

//   if (loading && !fields.length) {
//     return (
//       <div className="bg-white rounded-xl shadow-lg p-6 col-span-1 md:col-span-2">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-bold text-gray-800">
//             Field Soil Conditions
//           </h2>
//           <Loader2 className="w-5 h-5 animate-spin text-gray-500" />
//         </div>
//         <div className="h-[300px] flex flex-col items-center justify-center gap-4">
//           <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
//           <p className="text-gray-600">Loading field data...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="bg-white rounded-xl shadow-lg p-6 col-span-1 md:col-span-2">
//         <h2 className="text-xl font-bold text-gray-800 mb-4">
//           Field Soil Conditions
//         </h2>
//         <div className="h-[300px] flex flex-col items-center justify-center gap-4 text-red-500">
//           <AlertTriangle className="w-8 h-8" />
//           <p>{error}</p>
//           <button
//             onClick={refreshData}
//             className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors flex items-center gap-2"
//           >
//             <RefreshCw className="w-4 h-4" />
//             Retry
//           </button>
//         </div>
//       </div>
//     );
//   }

//   if (!fields.length) {
//     return (
//       <div className="bg-white rounded-xl shadow-lg p-6 col-span-1 md:col-span-2">
//         <h2 className="text-xl font-bold text-gray-800 mb-4">
//           Field Soil Conditions
//         </h2>
//         <div className="h-[300px] flex flex-col items-center justify-center gap-4 text-gray-500">
//           <Droplet className="w-8 h-8" />
//           <p>No field data available</p>
//           <button
//             onClick={refreshData}
//             className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
//           >
//             <RefreshCw className="w-4 h-4" />
//             Refresh
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-white rounded-xl shadow-lg p-6 col-span-1 md:col-span-2">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-xl font-bold text-gray-800">
//           Field Soil Conditions
//         </h2>
//         <button
//           onClick={refreshData}
//           disabled={loading}
//           className="text-sm text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1"
//         >
//           {loading ? (
//             <Loader2 className="w-4 h-4 animate-spin" />
//           ) : (
//             <RefreshCw className="w-4 h-4" />
//           )}
//           Refresh
//         </button>
//       </div>

//       <ResponsiveContainer width="100%" height={300}>
//         <BarChart data={chartData}>
//           <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
//           <XAxis 
//             dataKey="name" 
//             tick={{ fontSize: 12 }}
//             interval={0}
//             angle={-45}
//             textAnchor="end"
//             height={60}
//           />
//           <YAxis
//             domain={[0, 100]}
//             label={{
//               value: "Moisture (%)",
//               angle: -90,
//               position: "insideLeft",
//               style: { textAnchor: 'middle' }
//             }}
//           />
//           <Tooltip 
//             contentStyle={{ 
//               backgroundColor: '#fff',
//               border: '1px solid #e5e7eb',
//               borderRadius: '0.5rem'
//             }}
//           />
//           <Legend />
//           <Bar
//             dataKey="moisture"
//             name="Current Moisture"
//             fill={CHART_COLORS[0]}
//             radius={[4, 4, 0, 0]}
//           />
//           <Bar
//             dataKey="optimal"
//             name="Optimal Level"
//             fill={CHART_COLORS[1]}
//             opacity={0.5}
//             radius={[4, 4, 0, 0]}
//           />
//         </BarChart>
//       </ResponsiveContainer>

//       <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//         {chartData.map((field) => (
//           <div key={field.name} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
//             <div className="flex justify-between items-start">
//               <h3 className="font-medium text-gray-800">{field.name}</h3>
//               <span
//                 className={`text-sm px-2 py-1 rounded-full ${
//                   field.moisture < field.optimal * 0.7
//                     ? "bg-red-100 text-red-800"
//                     : field.moisture > field.optimal * 1.3
//                     ? "bg-yellow-100 text-yellow-800"
//                     : "bg-green-100 text-green-800"
//                 }`}
//               >
//                 {field.moisture}%
//               </span>
//             </div>
            
//             <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
//               <div className="flex items-center gap-1 text-gray-600">
//                 <Droplet className="w-4 h-4 text-blue-500" />
//                 <span>Optimal: {field.optimal}%</span>
//               </div>
//               <div className="flex items-center gap-1 text-gray-600">
//                 <Thermometer className="w-4 h-4 text-orange-500" />
//                 <span>Temp: {field.temperature ? `${field.temperature}°C` : 'N/A'}</span>
//               </div>
//               <div className="col-span-2 text-xs text-gray-500">
//                 Updated: {field.lastUpdated ? 
//                   new Date(field.lastUpdated).toLocaleString() : 
//                   'Unknown'}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default SoilMoistureChart;
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
} from "recharts";
import { CHART_COLORS } from "../../utils/constants";
import type { SoilMoistureData } from "../../utils/types";
import React from "react";

const SoilMoistureChart = ({ data }: { data: SoilMoistureData[] }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 col-span-1 md:col-span-2">
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        Field Soil Moisture Levels
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis
            domain={[0, 100]}
            label={{
              value: "Moisture (%)",
              angle: -90,
              position: "insideLeft",
            }}
          />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="moisture"
            name="Current Moisture"
            fill={CHART_COLORS[0]}
          />
          <Bar
            dataKey="optimal"
            name="Optimal Level"
            fill={CHART_COLORS[1]}
            opacity={0.5}
          />
        </BarChart>
      </ResponsiveContainer>
      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
        {data.slice(0, 8).map((field) => (
          <div key={field.name} className="bg-gray-50 p-3 rounded-lg">
            <div className="flex justify-between">
              <span className="font-medium">{field.name}</span>
              <span
                className={`text-sm ${
                  field.moisture < 40
                    ? "text-red-500"
                    : field.moisture > 80
                    ? "text-yellow-500"
                    : "text-green-500"
                }`}
              >
                {field.moisture}%
              </span>
            </div>
            <div className="text-sm text-gray-500 mt-1">
              pH: {field.ph.toFixed(1)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default SoilMoistureChart;