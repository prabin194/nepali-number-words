import { NUMBER_WORDS, SCALE_NAMES, SCALE_VALUES } from "../constants.js";
import { isValidNumber, throwInvalidInput } from "../utils.js";
import type { NumberWordOptions } from "../types.js";

/**
 * Maximum supported number (खर्ब = 100,000,000,000)
 */
const MAX_SUPPORTED_NUMBER = 100000000000;

/**
 * Converts a number to Nepali words
 *
 * @param value - The number to convert
 * @param options - Conversion options
 * @returns The number in Nepali words
 *
 * @example
 * ```ts
 * toNepaliWords(4750) // "चार हजार सात सय पचास"
 * toNepaliWords(0) // "शून्य"
 * toNepaliWords(-100) // "ऋणात्मक एक सय"
 * ```
 */
export function toNepaliWords(
  value: number,
  options?: NumberWordOptions
): string {
  if (!isValidNumber(value)) {
    throwInvalidInput(value);
  }

  // Check if number exceeds maximum supported value
  if (Math.abs(value) > MAX_SUPPORTED_NUMBER) {
    throw new Error(
      `Number exceeds maximum supported value of ${MAX_SUPPORTED_NUMBER.toLocaleString()} (खर्ब). Received: ${value}`
    );
  }

  // Handle zero (including -0)
  if (value === 0 || Object.is(value, -0)) {
    return NUMBER_WORDS[0];
  }

  // Handle negative numbers
  if (value < 0) {
    return `ऋणात्मक ${toNepaliWords(Math.abs(value), options)}`;
  }

  // Convert to integer for processing (truncate decimals)
  const intValue = Math.floor(Math.abs(value));

  return convertIntegerToWords(intValue);
}

/**
 * Converts an integer to Nepali words
 */
function convertIntegerToWords(value: number): string {
  if (value === 0) {
    return "";
  }

  if (value < 100) {
    return NUMBER_WORDS[value];
  }

  // Process each scale from largest to smallest
  let remaining = value;
  const words: string[] = [];

  for (const scale of SCALE_VALUES) {
    if (remaining >= scale) {
      const quotient = Math.floor(remaining / scale);
      const remainder = remaining % scale;

      if (quotient > 0) {
        if (scale >= 100) {
          // For scales 100 and above, convert the quotient
          if (quotient >= 100) {
            words.push(convertIntegerToWords(quotient));
          } else {
            words.push(NUMBER_WORDS[quotient]);
          }
          words.push(SCALE_NAMES[scale]);
        } else {
          // For scales below 100 (shouldn't happen with current SCALE_VALUES)
          words.push(NUMBER_WORDS[quotient]);
        }
      }

      remaining = remainder;

      if (remaining === 0) {
        break;
      }
    }
  }

  // Handle remaining value below 100
  if (remaining > 0 && remaining < 100) {
    words.push(NUMBER_WORDS[remaining]);
  }

  return words.join(" ").trim();
}

