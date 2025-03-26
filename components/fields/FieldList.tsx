"use client";
import { useState } from "react";
import { FieldCard } from "./FieldCard";
import { Plus } from "lucide-react";
import type { Field } from "../../utils/types";
import React from "react";

export const FieldList = ({
  fields,
  onUpdateFields,
}: {
  fields: Field[];
  onUpdateFields: (fields: Field[]) => void;
}) => {
  const [isEditing, setIsEditing] = useState<Field | null>(null);

  const handleDelete = (id: string) => {
    onUpdateFields(fields.filter((field) => field.id !== id));
  };

  const handleEdit = (updatedField: Field) => {
    onUpdateFields(
      fields.map((field) =>
        field.id === updatedField.id ? updatedField : field
      )
    );
    setIsEditing(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold">Fields ({fields.length})</h3>
        <button
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center"
          onClick={() =>
            setIsEditing({
              id: `FLD-${Date.now()}`,
              name: `Field ${String.fromCharCode(65 + fields.length)}`,
              size: 10,
              crop: "Wheat",
              plantingDate: new Date().toISOString().split("T")[0],
              harvestDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)
                .toISOString()
                .split("T")[0],
              irrigation: "Drip",
              status: "Planted",
            })
          }
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Field
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {fields.map((field) => (
          <FieldCard
            key={field.id}
            field={field}
            onEdit={setIsEditing}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {/* Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">
              {fields.some((f) => f.id === isEditing.id)
                ? "Edit Field"
                : "Add Field"}
            </h3>
            {/* Form fields would go here */}
            <div className="flex justify-end space-x-2 mt-4">
              <button
                className="px-4 py-2 border rounded-lg"
                onClick={() => setIsEditing(null)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-green-600 text-white rounded-lg"
                onClick={() => handleEdit(isEditing)}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
