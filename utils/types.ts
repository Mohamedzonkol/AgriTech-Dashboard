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


export enum EmergencyType {
  EquipmentFailure,
  MedicalEmergency,
  Fire,
  SevereWeather,
  Pest,
  Irrigation,
  Soil,
  Other
}
export enum SeverityType {
  High = "High",
  Medium = "Medium",
  Low = "Low",
  Critical = "Critical"
}
// EmergencyAlert Interface
export interface EmergencyAlert {
  id?: string;
  type: EmergencyType;
  message: string;
  severity: SeverityType;
  latitude: number;
  longitude: number;
  locationDescription: string;
  createdAt: Date;
  read?: boolean;
  time?: string;
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
  status: "Growing" | "Harvested" | "Planted" | "Fallow" | "Preparing";
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
