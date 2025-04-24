
import React from "react";
import EmergencyAlertModal from "./EmergencyAlertModal ";
import ScheduleTaskModal from "./ScheduleTaskModal ";
import StartIrrigationModal from "./StartIrrigationModal ";
import MachineryStatusModal from "./MachineryStatusModal";
import CropAnalysisModal from "./CropAnalysisModal";
import SoilQualityButton from "./SoilQualityButton";
import SmartIrrigationPanel from "./WaterRl";
//for testing purposes

const latitude = 30.802498;
const longitude = 26.820553;
///in a future version, this will be replaced with the actual latitude and longitude of the farm


const QuickActions = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 col-span-1  ">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
      <div className="grid grid-cols-2 gap-4">
        <MachineryStatusModal />
        <CropAnalysisModal />
        <SoilQualityButton latitude={latitude} longitude={longitude} />
        <SmartIrrigationPanel />
        <StartIrrigationModal />
        <EmergencyAlertModal />
        <ScheduleTaskModal />
    
      </div>
    </div>
  );
};
export default QuickActions;
