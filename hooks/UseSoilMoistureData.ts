"use client";
import { useState, useCallback, useEffect } from "react";
import { SoilMoistureData } from "../utils/types";
import { fetchSoilMoistureDataAPI } from "../utils/api/SoilMoistureService";

export const useSoilMoistureData = () => {
    const [soilData, setSoilData] = useState<SoilMoistureData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const handleError = (err: unknown, defaultMessage: string) => {
        const message = err instanceof Error ? err.message : defaultMessage;
        setError(message);
        console.error(message, err);
        return Promise.reject(err);
    };

    const fetchSoilMoistureData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchSoilMoistureDataAPI();
            setSoilData(data);
        } catch (err) {
            handleError(err, "Failed to fetch soil moisture data");
        } finally {
            setLoading(false);
        }
    }, []);

    // 🚀 Fetch data when hook is used (on mount)
    useEffect(() => {
        fetchSoilMoistureData();
    }, [fetchSoilMoistureData]);

    return {
        soilData,
        loading,
        error,
        fetchSoilMoistureData,
        refetch: fetchSoilMoistureData,
    };
};
