import { Equipment } from "../types";

const API_URL = "http://localhost:5070/api/Dashbored";

export const fetchEquipmentsAPI = async () => {
  const response = await fetch(`${API_URL}/Equipments`);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();

  if (!data.succeeded) {
    throw new Error(data.message || "Failed to fetch equipments");
  }

  return data.data.map((apiEquipment: any) => ({
    id: apiEquipment.equipmentId,
    name: apiEquipment.equipmentName,
    type: apiEquipment.equipmentType,
    status: apiEquipment.status,
    lastMaintenance: apiEquipment.lastMaintenance.split("T")[0],
    hoursUsed: apiEquipment.hoursUsed,
    battery: apiEquipment.battery,
    connectivity: apiEquipment.connectivity,
  }));
};

export const addEquipmentAPI = async (newEquipment: Equipment) => {
  const response = await fetch(`${API_URL}/CreateEquipment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      equipmentId: newEquipment.id,
      name: newEquipment.name,
      status: newEquipment.status,
      lastMaintenance: newEquipment.lastMaintenance,
      hoursUsed: newEquipment.hoursUsed,
      battery: newEquipment.battery,
      connectivity: newEquipment.connectivity,
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();

  if (!data.succeeded) {
    throw new Error(data.message || "Failed to add equipment");
  }

  return data;
};

export const updateEquipmentAPI = async (updatedEquipment: Equipment) => {
  const response = await fetch(`${API_URL}/EditEquipment`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      equipmentId: updatedEquipment.id,
      name: updatedEquipment.name,
      status: updatedEquipment.status,
      lastMaintenance: updatedEquipment.lastMaintenance,
      hoursUsed: updatedEquipment.hoursUsed,
      battery: updatedEquipment.battery,
      connectivity: updatedEquipment.connectivity,
    }),
  });

  console.log("Update Response:", response);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();

  if (!data.succeeded) {
    throw new Error(data.message || "Failed to update equipment");
  }

  return data;
};

export const updateEquipmentStatusAPI = async (
  equipmentId: string,
  status: "Active" | "Maintenance" | "Idle" | "Error"
) => {
  const response = await fetch(`${API_URL}/UpdateEquipmentStatus`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ equipmentId, status }),
  });

  console.log("Update Status Response:", response);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();

  if (!data.succeeded) {
    throw new Error(data.message || "Failed to update equipment status");
  }

  return data;
};

export const deleteEquipmentAPI = async (id: string) => {
  const response = await fetch(`${API_URL}/DeleteEquipment${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();

  if (!data.succeeded) {
    throw new Error(data.message || "Failed to delete equipment");
  }

  return data;
};
