import { numberToNepaliWords } from "./numberToWords.js";
import { CURRENCY_WORDS } from "../constants.js";
import { isValidNumber, roundToDecimals, throwInvalidInput, applyChequeStyle } from "../utils.js";
import type { AmountWordOptions } from "../types.js";

/**
 * Converts a monetary amount to Nepali currency words
 *
 * @param value - The amount to convert
 * @param options - Conversion options
 * @returns The amount in Nepali currency words
 *
 * @example
 * ```ts
 * amountToNepaliWords(4750) // "चार हजार सात सय पचास रुपैयाँ मात्र"
 * amountToNepaliWords(4750.50) // "चार हजार सात सय पचास रुपैयाँ पचास पैसा मात्र"
 * amountToNepaliWords(4750.50, { appendOnly: false }) // "चार हजार सात सय पचास रुपैयाँ पचास पैसा"
 * ```
 */
export function amountToNepaliWords(
  value: number,
  options: AmountWordOptions = {}
): string {
  if (!isValidNumber(value)) {
    throwInvalidInput(value);
  }

  const {
    appendOnly = true,
    showPaisa = true,
    paisaSeparator = "space",
    zeroRupeeText = "शून्य",
    chequeStyle = false,
  } = options;

  // Round to 2 decimal places
  const roundedValue = roundToDecimals(Math.abs(value), 2);

  // Extract rupees and paisa
  const rupees = Math.floor(roundedValue);
  const paisaDecimal = roundedValue % 1;
  const paisa = Math.round(paisaDecimal * 100);

  // Build the result
  const parts: string[] = [];

  // Handle rupees
  if (rupees === 0) {
    parts.push(zeroRupeeText);
  } else {
    parts.push(numberToNepaliWords(rupees));
  }
  parts.push(CURRENCY_WORDS.RUPEES);

  // Handle paisa
  if (showPaisa && paisa > 0) {
    if (paisaSeparator === "and") {
      parts.push(CURRENCY_WORDS.AND);
    }
    parts.push(numberToNepaliWords(paisa), CURRENCY_WORDS.PAISA);
  }

  // Append "मात्र" if requested
  if (appendOnly) {
    parts.push(CURRENCY_WORDS.ONLY);
  }

  // Handle negative amounts
  let result = parts.join(" ").trim();
  if (value < 0) {
    result = `ऋणात्मक ${result}`;
  }

  // Apply cheque style formatting
  if (chequeStyle) {
    result = applyChequeStyle(result);
  }

  return result;
}
