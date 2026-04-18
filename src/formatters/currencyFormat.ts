import { toNepaliDigits } from "./devanagari.js";
import { isValidNumber, throwInvalidInput, formatWithIndianGrouping } from "../utils.js";
import type { CurrencyFormatOptions } from "../types.js";

/**
 * Formats a number with specified decimal places
 */
function formatWithDecimals(value: number, decimals: number): string {
  return value.toFixed(decimals);
}

/**
 * Converts to Devanagari digits if requested
 */
function applyDevanagariIfNeeded(value: string, useDevanagari: boolean): string {
  return useDevanagari ? toNepaliDigits(value) : value;
}

/**
 * Combines currency symbol with formatted value, handling spacing
 */
function combineCurrencyAndValue(symbol: string, value: string): string {
  const separator = symbol.endsWith(" ") ? "" : " ";
  return `${symbol}${separator}${value}`;
}

/**
 * Formats a number as Nepali currency string
 *
 * @param value - The number to format
 * @param options - Formatting options
 * @returns The formatted currency string
 *
 * @example
 * ```ts
 * formatNepaliCurrency(4750) // "रु. 4,750.00"
 * formatNepaliCurrency(4750, { devanagari: true }) // "रु. ४,७५०.००"
 * formatNepaliCurrency(4750, { currencySymbol: "NPR " }) // "NPR 4,750.00"
 * ```
 */
export function formatNepaliCurrency(
  value: number,
  options: CurrencyFormatOptions = {}
): string {
  if (!isValidNumber(value)) {
    throwInvalidInput(value);
  }

  const {
    devanagari = false,
    currencySymbol = "रु.",
    maximumFractionDigits = 2,
  } = options;

  const fixedValue = formatWithDecimals(value, maximumFractionDigits);
  const groupedValue = formatWithIndianGrouping(fixedValue);
  const displayValue = applyDevanagariIfNeeded(groupedValue, devanagari);

  return combineCurrencyAndValue(currencySymbol, displayValue);
}
