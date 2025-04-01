import { Field } from "../types";

// const API_URL = "http://localhost:5070/api/Dashbored";
const API_URL = "https://crop-pilot-api.azurewebsites.net/api/Dashbored";

export const fetchFieldsAPI = async () => {
  const response = await fetch(`${API_URL}/Fields`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  if (!data.succeeded) {
    throw new Error(data.message || "Failed to fetch fields");
  }
  return data.data.map((apiField: any) => ({
    id: `FLD-${apiField.fieldId}`,
    name: apiField.fieldName,
    size: apiField.fieldSize,
    crop: apiField.cropName,
    plantingDate: apiField.plantingDate.split("T")[0],
    harvestDate: apiField.harvestDate.split("T")[0],
    irrigation: apiField.irrigation,
    status: apiField.status,
  }));
};

export const addFieldAPI = async (newField: Omit<Field, "id">) => {
  const response = await fetch(`${API_URL}/CreateField`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: newField.name,
      size: newField.size,
      crop: newField.crop,
      plantingDate: `${newField.plantingDate}T00:00:00`,
      harvestDate: `${newField.harvestDate}T00:00:00`,
      irrigation: newField.irrigation,
      status: newField.status,
    }),
  });
  console.log(response);
  if (!response.ok) {
    throw new Error(
      `HTTP error! status: ${response.status} and ${response.statusText}`
    );
  }
  return response.json();
};

export const updateFieldAPI = async (updatedField: Field) => {
  const fieldId = parseInt(updatedField.id.replace("FLD-", ""), 10);

  const response = await fetch(`${API_URL}/EditField`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: fieldId,
      name: updatedField.name,
      size: updatedField.size,
      crop: updatedField.crop,
      plantingDate: updatedField.plantingDate,
      harvestDate: updatedField.harvestDate,
      irrigation: updatedField.irrigation,
      status: updatedField.status,
    }),
  });

  console.log("Update Response:", response);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const contentType = response.headers.get("Content-Type") || "";
  if (contentType.includes("application/json")) {
    return response.json();
  }

  return { message: "Field updated successfully" }; // Fallback message
};

export const deleteFieldAPI = async (id: string) => {
  const fieldId = parseInt(id.replace("FLD-", ""));
  const response = await fetch(`${API_URL}/DeleteField${fieldId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};
