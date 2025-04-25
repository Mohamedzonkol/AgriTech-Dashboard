import { EmergencyAlert } from "../types";

export const fetchAllAlerts = async () => {
    try {
        const response = await fetch(
            // "https://crop-pilot-api.azurewebsites.net/api/Dashbored/GetAlerts"
            "http://localhost:5070/api/Dashbored/GetAlerts");

        if (!response.ok) {
            throw new Error("Failed to fetch Alert data");
        }

        const data = await response.json();
        console.log(data.data);
        return data.data.map((apiAlert: any) => ({
            id: apiAlert.alertId,
            type: apiAlert.alertType,
            message: apiAlert.message,
            severity: apiAlert.severity,
            latitude: apiAlert.latitude,
            longitude: apiAlert.longitude,
            locationDescription: apiAlert.locationDescription,
            time: apiAlert.createdAt,
            read: apiAlert.read || false
        }));

    } catch (error) {
        console.error("Error fetching Alert data:", error);
        throw error;
    }
};

export const createAlert = async (alertData: EmergencyAlert) => {
    try {
        const location = alertData.locationDescription || "Unknown Location";

        // Make the POST request to the API
        const response = await fetch("http://localhost:5070/api/Dashbored/CreateAlert", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                emergencyType: alertData.type,
                message: alertData.message,
                severity: alertData.severity,
                latitude: alertData.latitude,
                longitude: alertData.longitude,
                locationDescription: location,
                createdAt: new Date().toISOString(),
            }),
        });

        if (!response.ok) {
            throw new Error(`Failed to create Alert: ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
};