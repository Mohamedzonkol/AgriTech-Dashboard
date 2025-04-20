const API_URL = "https://crop-pilot-api.azurewebsites.net/api/Dashbored";
// const API_URL = "http://localhost:5070/api/Dashbored";
export const fetchSoilMoistureDataAPI = async () => {
    try {
        const response = await fetch(`${API_URL}/SoilMoisture`);

        if (!response.ok) {
            throw new Error("Failed to fetch soil moisture data");
        }

        const data = await response.json();
        if (!data.succeeded) {
            throw new Error(data.message || "Failed to fetch equipments");
        }
        return data.data.map((apiSoilMoisture: any) => ({
            id: apiSoilMoisture.id.toString(),
            name: apiSoilMoisture.fieldName,
            moisture: apiSoilMoisture.moisture,
            optimal: apiSoilMoisture.optimal,
            ph: apiSoilMoisture.ph
        }));
    } catch (error) {
        console.error("Error fetching soil moisture data:", error);
        return [];
    }
}