import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges conditional CSS classes and resolves Tailwind CSS class conflicts.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Formats a phone number for standardized display.
 */
export function formatPhoneNumber(phone: string): string {
  return phone.trim();
}
