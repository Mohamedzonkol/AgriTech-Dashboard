export const CHART_COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#A28DFF",
];

// Navigation tabs
export const NAV_TABS = [
  { id: "dashboard", label: "Dashboard" },
  { id: "analytics", label: "Analytics" },
  { id: "fields", label: "Field Management" },
  { id: "equipment", label: "Equipment" },
  { id: "reports", label: "Reports" },
];

// Alert severity styles
export const ALERT_SEVERITY_STYLES = {
  high: "border-red-500 bg-red-50",
  medium: "border-yellow-500 bg-yellow-50",
  low: "border-blue-500 bg-blue-50",
};

// Equipment status styles
export const EQUIPMENT_STATUS_STYLES = {
  Active: "text-green-600",
  Maintenance: "text-red-600",
  Idle: "text-gray-600",
};

// Field status styles
export const FIELD_STATUS_STYLES = {
  Growing: "bg-green-100 text-green-800",
  Harvested: "bg-blue-100 text-blue-800",
  Planted: "bg-yellow-100 text-yellow-800",
  Fallow: "bg-gray-100 text-gray-800",
};
