const API_URL = "https://crop-pilot-api.azurewebsites.net/api/Dashbored";

// const API_URL = "http://localhost:5070/api/Dashbored";
 export const fetchFarmStatusApi = async () => {
    try {
      const response = await fetch(`${API_URL}/FarmStatus`);
  
      if (!response.ok) {
        throw new Error("Failed to fetch farm status");
      }
  
      const data = await response.json();
  
      return {
        activeMachines: data.data.activeMachines,
        cropHealth: data.data.cropHealth,
        irrigationStatus: data.data.irrigationStatus,
        soilQuality: data.data.soilQuality,
        pestRisk: data.data.pestRisk,
        waterReservoir: data.data.waterReservoir,
        solarGeneration: 50, 
      };
    } catch (error) {
      console.error("Error fetching farm status:", error);
      return {
        activeMachines: 0,
        cropHealth: "Unknown",
        irrigationStatus: "Unknown",
        soilQuality: "Unknown",
        pestRisk: "Unknown",
        waterReservoir: 0,
        solarGeneration: 0,
      };
    }
  };
  

