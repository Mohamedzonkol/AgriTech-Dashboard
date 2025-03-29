"use client";
import { Eye } from "lucide-react";
import Link from "next/link";

interface ViewEquipmentButtonProps {
  className?: string;
}

export const ViewEquipmentButton = ({ className }: ViewEquipmentButtonProps) => {
  return (
    <Link href="/equipment" passHref>
      <button
        className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg 
                   bg-white border border-gray-200 text-gray-700 shadow-xs
                   hover:bg-gray-50 hover:border-gray-300 transition-all
                   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500
                   active:bg-gray-100 ${className}`}
      >
        <Eye className="w-4 h-4 text-indigo-600" />
        View All
      </button>
    </Link>
  );
};