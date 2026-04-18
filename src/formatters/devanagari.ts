import { DEVANAGARI_DIGITS } from "../constants.js";

/**
 * Converts Arabic numerals to Devanagari numerals
 *
 * @param value - The string or number to convert
 * @returns The value with Devanagari digits
 *
 * @example
 * ```ts
 * toNepaliDigits("4750.50") // "४७५०.५०"
 * toNepaliDigits(4750.50) // "४७५०.५०"
 * toNepaliDigits("1,23,456.78") // "१,२३,४५६.७८"
 * ```
 */
export function toNepaliDigits(value: string | number): string {
  // For numbers with decimals, use toFixed to preserve trailing zeros
  const stringValue =
    typeof value === "number" && !Number.isInteger(value)
      ? value.toFixed(2)
      : String(value);
  let result = "";

  for (const char of stringValue) {
    if (DEVANAGARI_DIGITS[char]) {
      result += DEVANAGARI_DIGITS[char];
    } else {
      result += char;
    }
  }

  return result;
}

