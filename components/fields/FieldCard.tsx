"use client";
import React from "react";
import { Trash2, Edit } from "lucide-react";
import { FIELD_STATUS_STYLES } from "../../utils/constants";
import type { Field } from "../../utils/types";
import { formatDate } from "../../utils/helpers";

interface FieldCardProps {
  field: Field;
  onEdit: (field: Field) => void;
  onDelete: (id: string) => void;
}

const FieldCard: React.FC<FieldCardProps> = ({ field, onEdit, onDelete }) => {
  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(field.id);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onEdit(field);
    }
  };

  return (
      <article
      
        className="backdrop-blur-md bg-white/30 border rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all cursor-pointer bg-white transition-transform hover:scale-105 duration-300"
        onClick={() => onEdit(field)}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        aria-label={`Field details: ${field.name}. Press to edit.`}
        role="button"
      >

        {/* Header */}
        <div className="bg-green-100 px-5 py-4 border-b">
          <div className="flex justify-between items-center">
            <h3
              className="font-semibold text-lg text-gray-900 truncate"
              title={field.name}
              aria-label={`Field name: ${field.name}`}
            >
              {field.name}
            </h3>
            <span
              className={`px-3 py-1 text-xs font-medium rounded-full ${
                FIELD_STATUS_STYLES[field.status] || FIELD_STATUS_STYLES.default
              }`}
              aria-label={`Status: ${field.status}`}
            >
              {field.status}
            </span>
          </div>
          <p className="text-gray-600 text-sm mt-1" aria-label={`Size: ${field.size} hectares`}>
            {field.size} hectares
          </p>
        </div>
    
        {/* Field Details */}
        <div className="p-5 space-y-3">
          {[
            { label: "Crop", value: field.crop || "Not specified" },
            { label: "Planted", value: formatDate(field.plantingDate) || "Not planted" },
            { label: "Harvest", value: formatDate(field.harvestDate) || "Not scheduled" },
            { label: "Irrigation", value: field.irrigation || "Not specified" },
          ].map(({ label, value }, idx) => (
            <div key={idx} className="flex justify-between py-2 border-b last:border-none">
              <span className="text-gray-500">{label}</span>
              <span className="font-medium text-right text-gray-800">{value}</span>
            </div>
          ))}
        </div>
    
        {/* Footer Buttons */}
        <div className="bg-gray-50 px-5 py-3 border-t flex justify-between items-center">
          <button
            className="text-blue-600 hover:text-blue-800 flex items-center gap-2 text-sm font-medium transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(field);
            }}
            aria-label={`Edit ${field.name}`}
          >
            <Edit className="w-4 h-4" />
            Edit
          </button>
          <button
            className="text-red-600 hover:text-red-800 flex items-center gap-2 text-sm font-medium transition-colors"
            onClick={handleDeleteClick}
            aria-label={`Delete ${field.name}`}
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>
      </article>
  );
};

  


export default FieldCard;