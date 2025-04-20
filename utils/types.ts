export interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  condition: string;
  location: string;
  lastUpdated: string;
  uvIndex: number;
  pressure: number;
}

export interface WeatherForecast {
  date: string;
  condition: string;
  high: number;
  low: number;
  precipitation: number;
  wind: number;
  day: string;
  humidity: number;
  pressure: number;
  icon: string;
}

// Farm status types
export interface FarmStatus {
  activeMachines: number;
  cropHealth: string;
  irrigationStatus: string;
  soilQuality: string;
  pestRisk: string;
  waterReservoir: number;
  solarGeneration: number;

}

// Alert types
export interface Alert {
  id: string;
  type: string;
  message: string;
  severity: "high" | "medium" | "low";
  time: string;
  read: boolean;
}

// Equipment types
export interface Equipment {
  id: string;
  name: string;
  status: "Active" | "Maintenance" | "Idle" | "Error";
  lastMaintenance: string;
  hoursUsed: number;
  battery: number;
  connectivity: "Online" | "Offline";
  
}

// Field types
export interface Field {
  id: string;
  name: string;
  size: number;
  crop: string;
  plantingDate: string;
  harvestDate: string;
  irrigation: string;
  status: "Growing" | "Harvested" | "Planted" | "Fallow"| "Preparing";
}

// Chart data types
export interface CropYieldData {
  name: string;
  yield: number;
  target: number;
  rainfall: number;
}

export interface SoilMoistureData {
  id: string;
  name: string;
  moisture: number;
  optimal: number;
  ph: number;
}
