import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges Tailwind CSS class names conditionally.
 * 
 * @param inputs - Array of class names, objects, or conditionals
 * @returns Merged class string
 */
export function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}
