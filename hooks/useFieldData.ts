"use client";

import { useState, useEffect, useCallback } from "react";
import type { Field } from "../utils/types";
import {
  fetchFieldsAPI,
  addFieldAPI,
  updateFieldAPI,
  deleteFieldAPI,
} from "../utils/api/FieldServices";

interface UseFieldDataReturn {
  fields: Field[];
  loading: boolean;
  error: string | null;
  fetchFields: () => Promise<void>;
  addField: (newField: Omit<Field, "id">) => Promise<Field>;
  updateField: (updatedField: Field) => Promise<Field>;
  deleteField: (id: string) => Promise<void>;
}

export const useFieldData = (): UseFieldDataReturn => {
  const [fields, setFields] = useState<Field[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleError = (err: unknown, defaultMessage: string) => {
    const message = err instanceof Error ? err.message : defaultMessage;
    setError(message);
    console.error(message, err);
    throw err;
  };

  const fetchFields = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchFieldsAPI();
      if (!Array.isArray(data)) {
        throw new Error("Invalid data format received from server");
      }
      setFields(data);
    } catch (err) {
      handleError(err, "Failed to fetch fields");
    } finally {
      setLoading(false);
    }
  }, []);

  const addField = useCallback(async (newField: Omit<Field, "id">) => {
    setLoading(true);
    setError(null);
    
    try {
      const created = await addFieldAPI(newField);
      await fetchFields();
      return created;
    } catch (err) {
      console.error("Error adding field:", err);
      return handleError(err, "Failed to add field");
    } finally {
      setLoading(false);
    }
  }, [fetchFields]);
  

  const updateField = useCallback(async (updatedField: Field) => {
    setLoading(true);
    setError(null);
  
    try {
      const updated = await updateFieldAPI(updatedField);
      await fetchFields();
      return updated;
    } catch (err) {
      console.error("Error updating field:", err);
      return handleError(err, "Failed to update field");
    } finally {
      setLoading(false);
    }
  }, [fetchFields]);
  

  const deleteField = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await deleteFieldAPI(id);
      await fetchFields();
    } catch (err) {
      handleError(err, "Failed to delete field");
    } finally {
      setLoading(false);
    }
  }, [fetchFields]);

  useEffect(() => {
    fetchFields();
  }, [fetchFields]);

  return {
    fields,
    loading,
    error,
    fetchFields,
    addField,
    updateField,
    deleteField,
  };
};