import React from "react";
import { cn } from "@/utils/cn";
import { X } from "lucide-react";

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  preventCloseOnOutsideClick?: boolean;
}

export const Dialog: React.FC<DialogProps> = ({ 
  open, 
  onOpenChange, 
  children, 
  className,
  size = "md",
  preventCloseOnOutsideClick = false
}) => {
  if (!open) return null;

  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl"
  };

  const handleOutsideClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && !preventCloseOnOutsideClick) {
      onOpenChange(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4"
      onClick={handleOutsideClick}
    >
      <div 
        className={cn(
          "bg-white rounded-lg shadow-lg w-full relative animate-in fade-in-90 zoom-in-95",
          sizeClasses[size],
          className
        )}
      >
        {children}
      </div>
    </div>
  );
};

interface DialogHeaderProps {
  children: React.ReactNode;
  className?: string;
  withCloseButton?: boolean;
  onClose?: () => void;
}

export const DialogHeader: React.FC<DialogHeaderProps> = ({ 
  children, 
  className,
  withCloseButton = true,
  onClose
}) => (
  <div className={cn(
    "border-b p-4 flex justify-between items-center",
    className
  )}>
    {children}
    {withCloseButton && (
      <button 
        className="text-gray-500 hover:text-gray-700 transition-colors"
        onClick={onClose}
      >
        <X className="w-5 h-5" />
      </button>
    )}
  </div>
);

interface DialogContentProps {
  children: React.ReactNode;
  className?: string;
}

export const DialogContent: React.FC<DialogContentProps> = ({ 
  children, 
  className 
}) => (
  <div className={cn("p-4 overflow-y-auto max-h-[70vh]", className)}>
    {children}
  </div>
);

interface DialogTitleProps {
  children: React.ReactNode;
  className?: string;
}

export const DialogTitle: React.FC<DialogTitleProps> = ({ 
  children, 
  className 
}) => (
  <h2 className={cn("text-xl font-semibold", className)}>
    {children}
  </h2>
);

interface DialogDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

export const DialogDescription: React.FC<DialogDescriptionProps> = ({ 
  children, 
  className 
}) => (
  <p className={cn("text-sm text-gray-500 mt-1", className)}>
    {children}
  </p>
);

interface DialogFooterProps {
  children: React.ReactNode;
  className?: string;
}

export const DialogFooter: React.FC<DialogFooterProps> = ({ 
  children, 
  className 
}) => (
  <div className={cn(
    "border-t p-4 flex justify-end space-x-2",
    className
  )}>
    {children}
  </div>
);