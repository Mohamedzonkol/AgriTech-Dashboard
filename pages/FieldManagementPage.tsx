"use client";

import { Plus } from "lucide-react";
import FieldActivityChart from "../components/fields/FieldActivityChart";
import FieldList from "../components/fields/FieldList";
import { useFarmDataContext } from "@/contexts/FarmDataContext";
import ClientOnlyWrapper from "../components/common/ClientOnlyWrapper";

const FieldManagementPage = () => {
  return (
    <ClientOnlyWrapper>
      <FieldManagementContent />
    </ClientOnlyWrapper>
  );
};

const FieldManagementContent = () => {
  const { isInitialized, fieldData, setFieldData } = useFarmDataContext();

  if (!isInitialized || !fieldData) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading field data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Field Management</h2>
        <button
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          onClick={() => {
            // Add field creation logic
          }}
        >
          <Plus size={18} />
          Add Field
        </button>
      </div>
      <FieldList fields={fieldData} onUpdateFields={setFieldData} />
      <div className="bg-gray-50 p-4 rounded-lg mt-6">
        <FieldActivityChart fields={fieldData} />
      </div>
    </div>
  );
};

export default FieldManagementPage;
