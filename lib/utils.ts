import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combines and optimizes multiple class values into a single class string.
 *
 * @param inputs - One or more clsx-compatible values (strings, arrays, objects, etc.) to be combined
 * @returns A single class string with Tailwind CSS class conflicts resolved
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format a numeric value as a localized currency string.
 *
 * @param value - The numeric amount to format
 * @param currency - The ISO 4217 currency code to use (e.g., "USD"). Defaults to `"USD"`
 * @param locale - The BCP 47 locale string to use for formatting (e.g., "en-US"). Defaults to `"en-US"`
 * @returns The formatted currency string including currency symbol and locale-specific separators
 */
export function formatCurrency(value: number, currency: string = "USD", locale: string = "en-US") {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(value);
}