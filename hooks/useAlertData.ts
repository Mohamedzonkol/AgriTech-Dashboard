"use client";
import { useState, useEffect, useCallback } from "react";
import { EmergencyAlert } from "../utils/types";
import {
    fetchAllAlerts,
    createAlert,
} from "../utils/api/AlertsServices";


export const useAlertData = () => {
    const [alerts, setAlerts] = useState<EmergencyAlert[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const handleError = (err: unknown, defaultMessage: string) => {
        const message = err instanceof Error ? err.message : defaultMessage;
        setError(message);
        console.error(message, err);
        return Promise.reject(err);
    };

    const fetchAlerts = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchAllAlerts();
            setAlerts(data);
        } catch (err) {
            handleError(err, "Failed to fetch alerts");
        } finally {
            setLoading(false);
        }
    }, []);
    useEffect(() => {
        fetchAlerts();
    }, [fetchAlerts]);
    const addAlert = useCallback(async (alert: EmergencyAlert): Promise<void> => {
        setLoading(true);
        setError(null);
        try {
            await createAlert(alert);
            await fetchAlerts();
        } catch (err) {
            handleError(err, "Failed to add alert");
        } finally {
            setLoading(false);
        }
    }, [fetchAlerts]);

    const markAlertAsRead = useCallback((alertId: string): void => {
        setAlerts(prevAlerts =>
            prevAlerts.map(alert =>
                alert.id === alertId ? { ...alert, read: true } : alert
            )
        );
    }, []);

    return {
        alerts,
        loading,
        error,
        fetchAlerts,
        addAlert,
        refreshAlerts: fetchAlerts,
        markAlertAsRead,
        unreadCount: alerts.filter(alert => !alert.read).length,
    };
}