"use client";
import { useState } from "react";
import { Plus } from "lucide-react";
import FieldCard from "./FieldCard";
import type { Field } from "../../utils/types";
import { useFieldData } from "../../hooks/useFieldData";
import FieldForm from "./FieldForm";
import DeleteConfirmation from "./DeleteConfirmation";
import SkeletonLoader from "./SkeletonLoader";
import ErrorMessage from "./ErrorMessage";

const FieldList = () => {
  const { fields, loading, error, addField, updateField, deleteField } =
    useFieldData();
  const [isEditing, setIsEditing] = useState<Field | null>(null);
  const [fieldToDelete, setFieldToDelete] = useState<Field | null>(null);

  const handleSave = async (field: Field) => {
    try {
      if (fields.some((f) => f.id === field.id)) {
        await updateField(field);
      } else {
        await addField(field);
      }
      setIsEditing(null);
    } catch (err) {
      console.error("Failed to save field:", err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteField(id);
      setFieldToDelete(null);
    } catch (err) {
      console.error("Failed to delete field:", err);
    }
  };

  const generateNewField = (): Field => ({
    id: `FLD-${Date.now()}`,
    name: `New Field ${fields.length + 1}`,
    size: 10,
    crop: "",
    plantingDate: "",
    harvestDate: "",
    irrigation: "",
    status: "Fallow",
  });

  if (loading) return <SkeletonLoader count={3} />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="space-y-6">
      <header className="flex flex-col md:flex-row md:justify-between md:items-center gap-6">
        <h2 className="text-2xl font-bold text-gray-900">Fields Management</h2>
        <div className="flex items-center gap-6">
          <span className="text-blue-600 text-sm md:text-base font-semibold">
            {fields.length} {fields.length === 1 ? "Field" : "Fields"}
          </span>

          <button
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            onClick={() => setIsEditing(generateNewField())}
            aria-label="Add new field"
          >
            <Plus className="w-4 h-4" />
            Add Field
          </button>
        </div>
      </header>

      {fields.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500 mb-4">No fields found</p>
          <button
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg inline-flex items-center gap-2"
            onClick={() => setIsEditing(generateNewField())}
          >
            <Plus className="w-4 h-4" />
            Create Your First Field
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {fields.map((field) => (
            <FieldCard
              key={field.id}
              field={field}
              onEdit={setIsEditing}
              onDelete={(id) =>
                setFieldToDelete(fields.find((f) => f.id === id) || null)
              }
            />
          ))}
        </div>
      )}

      {/* Edit/Add Modal */}
      {isEditing && (
        <FieldForm
          field={isEditing}
          onSave={handleSave}
          onCancel={() => setIsEditing(null)}
          isEditing={fields.some((f) => f.id === isEditing.id)}
        />
      )}

      {/* Delete Confirmation Modal */}
      {fieldToDelete && (
        <DeleteConfirmation
          fieldName={fieldToDelete.name}
          onConfirm={() => handleDelete(fieldToDelete.id)}
          onCancel={() => setFieldToDelete(null)}
        />
      )}
    </div>
  );
};

export default FieldList;
