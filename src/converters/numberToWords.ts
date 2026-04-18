import { NUMBER_WORDS, SCALE_NAMES, SCALE_VALUES } from "../constants.js";
import { isValidNumber, throwInvalidInput, capitalize } from "../utils.js";
import type { NumberWordOptions } from "../types.js";

/**
 * Converts a number to Nepali words
 *
 * @param value - The number to convert
 * @param options - Conversion options
 * @returns The number in Nepali words
 *
 * @example
 * ```ts
 * numberToNepaliWords(4750) // "चार हजार सात सय पचास"
 * numberToNepaliWords(0) // "शून्य"
 * numberToNepaliWords(-100) // "ऋणात्मक एक सय"
 * ```
 */
export function numberToNepaliWords(
  value: number,
  options?: NumberWordOptions
): string {
  if (!isValidNumber(value)) {
    throwInvalidInput(value);
  }

  const { capitalizeFirst = false } = options || {};

  // Handle zero
  if (value === 0) {
    const result = NUMBER_WORDS[0];
    return capitalizeFirst ? capitalize(result) : result;
  }

  // Handle negative numbers
  if (value < 0) {
    const result = `ऋणात्मक ${numberToNepaliWords(Math.abs(value), options)}`;
    return capitalizeFirst ? capitalize(result) : result;
  }

  // Convert to integer for processing (truncate decimals)
  const intValue = Math.floor(Math.abs(value));

  const result = convertIntegerToWords(intValue);
  return capitalizeFirst ? capitalize(result) : result;
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
