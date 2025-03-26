import { Alert } from "./types";

// Format date to readable string
export const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

// Format time to readable string
export const formatTime = (timeString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
  };
  return new Date(`2000-01-01T${timeString}`).toLocaleTimeString(
    undefined,
    options
  );
};

// Calculate percentage for progress bars
export const calculatePercentage = (value: number, max: number) => {
  return Math.min(100, (value / max) * 100);
};

// Get battery icon based on percentage
export const getBatteryIcon = (percentage: number) => {
  if (percentage < 20) return "text-red-500";
  if (percentage < 50) return "text-yellow-500";
  return "text-green-500";
};

// Filter alerts by read status
export const filterAlerts = (alerts: Alert[], showRead: boolean) => {
  return showRead ? alerts : alerts.filter((alert) => !alert.read);
};
