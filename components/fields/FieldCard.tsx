"use client";
import React from "react";
import { FIELD_STATUS_STYLES } from "../../utils/constants";
import type { Field } from "../../utils/types";

const FieldCard = ({
  field,
  onEdit,
  onDelete,
}: {
  field: Field;
  onEdit: (field: Field) => void;
  onDelete: (id: string) => void;
}) => {
  return (
    <div className="border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition">
      <div className="bg-green-50 p-4 border-b">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-lg text-gray-800">{field.name}</h3>
          <span
            className={`px-2 py-1 text-xs rounded-full ${
              FIELD_STATUS_STYLES[field.status]
            }`}
          >
            {field.status}
          </span>
        </div>
        <p className="text-gray-600 mt-1">{field.size} hectares</p>
      </div>
      <div className="p-4">
        <div className="flex justify-between py-2 border-b">
          <span className="text-gray-500">Crop</span>
          <span className="font-medium">{field.crop}</span>
        </div>
        <div className="flex justify-between py-2 border-b">
          <span className="text-gray-500">Planted</span>
          <span className="font-medium">{field.plantingDate}</span>
        </div>
        <div className="flex justify-between py-2">
          <span className="text-gray-500">Irrigation</span>
          <span className="font-medium">{field.irrigation}</span>
        </div>
      </div>
      <div className="bg-gray-50 px-4 py-3 border-t flex justify-between">
        <button
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          onClick={() => onEdit(field)}
        >
          Edit
        </button>
        <button
          className="text-red-600 hover:text-red-800 text-sm font-medium"
          onClick={() => onDelete(field.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};
export default FieldCard;
