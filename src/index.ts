/**
 * Nepali Number & Currency Words Library
 *
 * A lightweight, framework-independent TypeScript library for converting
 * numbers and monetary amounts to Nepali words.
 */

export { numberToNepaliWords } from "./converters/numberToWords.js";
export { amountToNepaliWords } from "./converters/amountToWords.js";
export { nepaliWordsToNumber } from "./converters/wordsToNumber.js";
export { toDevanagariDigits } from "./formatters/devanagari.js";
export { formatNepaliCurrency } from "./formatters/currencyFormat.js";

export type {
  NumberWordOptions,
  AmountWordOptions,
  CurrencyFormatOptions,
} from "./types.js";
