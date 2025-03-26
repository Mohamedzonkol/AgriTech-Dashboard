"use client";

import { Plus } from "lucide-react";
import React from "react";
import { FieldActivityChart } from "../components/fields/FieldActivityChart";
import { FieldList } from "../components/fields/FieldList";
import { useFarmDataContext } from "../contexts/FarmDataContext";

export const FieldManagementPage = () => {
  const { fieldData, setFieldData } = useFarmDataContext();

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Field Management</h2>
      </div>
      <FieldList fields={fieldData} onUpdateFields={setFieldData} />
      <div className="bg-gray-50 p-4 rounded-lg mt-6">
        <FieldActivityChart fields={fieldData} />
      </div>
    </div>
  );
};
