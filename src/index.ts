/**
 * Nepali Number & Currency Words Library
 *
 * A lightweight, framework-independent TypeScript library for converting
 * numbers and monetary amounts to Nepali words.
 */

export { toNepaliWords } from "./converters/numberToWords.js";
export { toNepaliAmount } from "./converters/amountToWords.js";
export { nepaliWordsToNumber } from "./converters/wordsToNumber.js";
export { toNepaliDigits } from "./formatters/devanagari.js";
export { formatNepaliCurrency } from "./formatters/currencyFormat.js";
export { toNepaliText } from "./transformers/textTransformer.js";

export type {
  NumberWordOptions,
  AmountWordOptions,
  CurrencyFormatOptions,
} from "./types.js";
