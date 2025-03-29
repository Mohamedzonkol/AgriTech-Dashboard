"use client";
import { useState, useEffect, useCallback } from "react";
import { Equipment } from "../utils/types";
import { 
  fetchEquipmentsAPI, 
  addEquipmentAPI, 
  updateEquipmentAPI, 
  deleteEquipmentAPI, 
  updateEquipmentStatusAPI 
} from "../utils/api/EquipmentService";

export const useEquipmentData = () => {
  const [equipments, setEquipments] = useState<Equipment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const handleError = (err: unknown, defaultMessage: string) => {
    const message = err instanceof Error ? err.message : defaultMessage;
    setError(message);
    console.error(message, err);
    return Promise.reject(err);
  };

  const fetchEquipments = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchEquipmentsAPI();
      setEquipments(data);
    } catch (err) {
      handleError(err, "Failed to fetch equipments");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEquipments();
  }, [fetchEquipments]);

  const addEquipment = useCallback(async (equipment: Equipment): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      await addEquipmentAPI(equipment);
      await fetchEquipments();
    } catch (err) {
      handleError(err, "Failed to add equipment");
    } finally {
      setLoading(false);
    }
  }, [fetchEquipments]);

  const updateEquipment = useCallback(async (equipment: Equipment): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      await updateEquipmentAPI(equipment);
      await fetchEquipments();
    } catch (err) {
      handleError(err, "Failed to update equipment");
    } finally {
      setLoading(false);
    }
  }, [fetchEquipments]);

  const deleteEquipment = useCallback(async (id: string): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      await deleteEquipmentAPI(id);
      await fetchEquipments();
    } catch (err) {
      handleError(err, "Failed to delete equipment");
    } finally {
      setLoading(false);
    }
  }, [fetchEquipments]);

  const updateEquipmentStatus = useCallback(async (id: string, status: "Active" | "Maintenance" | "Idle" | "Error"): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      await updateEquipmentStatusAPI(id, status);
      await fetchEquipments();
    } catch (err) {
      handleError(err, "Failed to update equipment status");
    } finally {
      setLoading(false);
    }
  }, [fetchEquipments]);

  return {
    equipments,
    loading,
    error,
    addEquipment,
    updateEquipment,
    deleteEquipment,
    updateEquipmentStatus,
    refetch: fetchEquipments
  };
};
