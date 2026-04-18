import { toNepaliWords } from "../converters/numberToWords.js";
import { toNepaliAmount } from "../converters/amountToWords.js";

/**
 * Replaces standalone numbers in text with Nepali words
 * Non-numeric text remains unchanged
 *
 * @param input - The text to transform
 * @returns The text with numbers converted to Nepali words
 *
 * @example
 * ```ts
 * toNepaliText("Pay 4750 now")
 * // "Pay चार हजार सात सय पचास now"
 *
 * toNepaliText("asjdajsd 98989as dasd s")
 * // "asjdajsd 98989as dasd s" (no standalone number)
 *
 * toNepaliText("Amount 500 and fee 25")
 * // "Amount पाँच सय and fee पच्चीस"
 * ```
 */
export function toNepaliText(input: string): string {
  if (typeof input !== "string" || !input.trim()) {
    return input;
  }

  // Match standalone numbers (not part of alphanumeric sequences)
  // Uses word boundaries to avoid matching numbers embedded in words
  return input.replace(/-?\b\d+(\.\d+)?\b/g, (match) => {
    const num = Number(match);

    if (!Number.isFinite(num)) {
      return match;
    }

    if (match.includes(".")) {
      return toNepaliAmount(num);
    }

    return toNepaliWords(num);
  });
}

