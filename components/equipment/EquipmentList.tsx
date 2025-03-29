"use client";
import { Plus, Settings, Trash2, X } from "lucide-react";
import EquipmentCard from "./EquipmentCard";
import type { Equipment } from "../../utils/types";
import React, { useState } from "react";
import { useEquipmentData } from "../../hooks/useEquipmentData";
import SkeletonLoader from "../fields/SkeletonLoader";
import ErrorMessage from "../fields/ErrorMessage";

const EquipmentList = () => {
  const {
    equipments,
    loading,
    error,
    addEquipment,
    updateEquipmentStatus,
    deleteEquipment,
  } = useEquipmentData();

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);
  const [newEquipment, setNewEquipment] = useState({
    name: "",
    status: "Idle" as "Active" | "Maintenance" | "Idle" | "Error",
    lastMaintenance: new Date().toISOString().split("T")[0],
    hoursUsed: 0,
    battery: 100,
    connectivity: "Offline" as "Online" | "Offline",
  });

  const generateNextId = () => {
    const highestId = equipments
      .map((e) => parseInt(e.id.replace("EQ-", ""), 10))
      .filter((num) => !isNaN(num))
      .reduce((max, num) => Math.max(max, num), 0);
    return `EQ-${String(highestId + 1).padStart(3, "0")}`;
  };

  const handleAddEquipment = () => {
    const newId = generateNextId();
    addEquipment({
      id: newId,
      ...newEquipment,
    });
    setIsAddDialogOpen(false);
    setNewEquipment({
      name: "",
      status: "Idle",
      lastMaintenance: new Date().toISOString().split("T")[0],
      hoursUsed: 0,
      battery: 100,
      connectivity: "Offline",
    });
  };

  const handleDetailsClick = (equipment: Equipment) => {
    setSelectedEquipment(equipment);
    setIsDetailsDialogOpen(true);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mb-4"></div>
        <p className="text-gray-600">Loading equipment...</p>
      </div>
    );
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (equipments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <Settings className="w-16 h-16 text-gray-400 mb-4" />
        <p className="text-gray-600 text-lg">No equipment found.</p>
        <button
          onClick={() => setIsAddDialogOpen(true)}
          className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add Equipment</span>
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-gray-800">Equipment ({equipments.length})</h3>
        <button
          onClick={() => setIsAddDialogOpen(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add Equipment</span>
        </button>
      </div>

      {/* Equipment Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {equipments.map((item) => (
          <EquipmentCard
            key={item.id}
            equipment={item}
            onStatusChange={updateEquipmentStatus}
            onDetailsClick={() => handleDetailsClick(item)}
          />
        ))}
      </div>

      {/* Add Equipment Modal */}
      {isAddDialogOpen && (
        <Modal
          title="Add New Equipment"
          onClose={() => setIsAddDialogOpen(false)}
        >
          <form className="space-y-4">
            <InputField
              label="Equipment Name"
              type="text"
              value={newEquipment.name}
              onChange={(e) =>
                setNewEquipment({ ...newEquipment, name: e.target.value })
              }
            />
            <SelectField
              label="Status"
              options={[
                { value: "Idle", label: "Idle" },
                { value: "Active", label: "Active" },
                { value: "Maintenance", label: "Maintenance" },
                { value: "Error", label: "Error" },
              ]}
              value={newEquipment.status}
              onChange={(e) =>
                setNewEquipment({ ...newEquipment, status: e.target.value as "Active" | "Maintenance" | "Idle" | "Error" })
              }
            />
            <InputField
              label="Last Maintenance"
              type="date"
              value={newEquipment.lastMaintenance}
              onChange={(e) =>
                setNewEquipment({
                  ...newEquipment,
                  lastMaintenance: e.target.value,
                })
              }
            />
            <div className="grid grid-cols-2 gap-4">
              <InputField
                label="Hours Used"
                type="number"
                value={newEquipment.hoursUsed.toString()}
                onChange={(e) =>
                  setNewEquipment({
                    ...newEquipment,
                    hoursUsed: Number(e.target.value),
                  })
                }
              />
              <InputField
                label="Battery (%)"
                type="number"
                min="0"
                max="100"
                value={newEquipment.battery.toString()}
                onChange={(e) =>
                  setNewEquipment({
                    ...newEquipment,
                    battery: Number(e.target.value),
                  })
                }
              />
            </div>
            <SelectField
              label="Connectivity"
              options={[
                { value: "Online", label: "Online" },
                { value: "Offline", label: "Offline" },
              ]}
              value={newEquipment.connectivity}
              onChange={(e) =>
                setNewEquipment({
                  ...newEquipment,
                  connectivity: e.target.value as "Online" | "Offline",
                })
              }
            />
          </form>
          <div className="border-t mt-4 pt-4 flex justify-end gap-3">
            <button
              onClick={() => setIsAddDialogOpen(false)}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleAddEquipment}
              disabled={!newEquipment.name.trim()}
              className={`px-4 py-2 rounded-md text-white transition-colors ${
                !newEquipment.name.trim()
                  ? "bg-blue-300 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              Add Equipment
            </button>
          </div>
        </Modal>
      )}

      {/* Equipment Details Modal */}
      {isDetailsDialogOpen && selectedEquipment && (
        <Modal
          title="Equipment Details"
          onClose={() => setIsDetailsDialogOpen(false)}
        >
          <div className="grid grid-cols-2 gap-4 mb-6">
            <DetailItem label="Name" value={selectedEquipment.name} />
            <DetailItem label="ID" value={selectedEquipment.id} />
            <DetailItem
              label="Status"
              value={selectedEquipment.status.toLowerCase()}
            />
            <DetailItem
              label="Last Maintenance"
              value={selectedEquipment.lastMaintenance}
            />
            <DetailItem
              label="Hours Used"
              value={`${selectedEquipment.hoursUsed} hrs`}
            />
            <DetailItem
              label="Battery Level"
              value={`${selectedEquipment.battery}%`}
            />
            <DetailItem
              label="Connectivity"
              value={selectedEquipment.connectivity.toLowerCase()}
            />
          </div>
          <div className="border-t pt-4 flex justify-between">
            <button
              onClick={() => {
                deleteEquipment(selectedEquipment.id);
                setIsDetailsDialogOpen(false);
              }}
              className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              <span>Delete Equipment</span>
            </button>
            <button
              onClick={() => setIsDetailsDialogOpen(false)}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md transition-colors"
            >
              Close
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

// Reusable Modal Component
interface ModalProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ title, onClose, children }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div className="bg-white rounded-lg shadow-xl w-full max-w-md animate-fade-in">
      <div className="border-b p-4 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      <div className="p-6">{children}</div>
    </div>
  </div>
);

// Reusable Input Field Component
interface InputFieldProps {
  label: string;
  type: string;
  value: string;
  min?: string;
  max?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type,
  value,
  min,
  max,
  onChange,
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <input
      type={type}
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder={`Enter ${label.toLowerCase()}`}
      value={value}
      min={min}
      max={max}
      onChange={onChange}
    />
  </div>
);

// Reusable Select Field Component
interface SelectFieldProps {
  label: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  options,
  value,
  onChange,
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <select
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      value={value}
      onChange={onChange}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

// Reusable Detail Item Component
interface DetailItemProps {
  label: string;
  value: string;
}

const DetailItem: React.FC<DetailItemProps> = ({ label, value }) => (
  <div>
    <p className="text-sm text-gray-500 mb-1">{label}</p>
    <p className="font-medium text-gray-800">{value}</p>
  </div>
);

export default EquipmentList;