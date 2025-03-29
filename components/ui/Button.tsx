import { cn } from "@/utils/cn";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
}

export const Button: React.FC<ButtonProps> = ({ variant = "primary", className, ...props }) => {
  const baseStyles = "px-4 py-2 rounded-lg text-white font-medium transition";
  const variants = {
    primary: "bg-green-600 hover:bg-green-700",
    secondary: "bg-gray-500 hover:bg-gray-600",
    danger: "bg-red-600 hover:bg-red-700",
  };

  return (
    <button className={cn(baseStyles, variants[variant], className)} {...props} />
  );
};
