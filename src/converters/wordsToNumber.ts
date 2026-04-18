import { NUMBER_WORDS } from "../constants.js";
import { throwInvalidInput } from "../utils.js";

/**
 * Negative prefix in Nepali
 */
const NEGATIVE_PREFIX = "ऋणात्मक";

/**
 * Currency-related words to remove during conversion
 */
const CURRENCY_WORDS_TO_REMOVE = ["रुपैयाँ", "पैसा", "मात्र", "र"];

/**
 * Reverse mapping from Nepali words to numbers
 * @experimental - This is an experimental feature with limited scope
 */
const WORD_TO_NUMBER_MAP: Record<string, number> = Object.entries(
  NUMBER_WORDS
).reduce((acc, [num, word]) => {
  acc[word] = parseInt(num, 10);
  return acc;
}, {} as Record<string, number>);

/**
 * Reverse mapping from scale names to their values
 * @experimental - This is an experimental feature with limited scope
 */
const SCALE_NAME_TO_VALUE: Record<string, number> = {
  सय: 100,
  हजार: 1000,
  लाख: 100000,
  करोड: 10000000,
  अर्ब: 1000000000,
  खर्ब: 100000000000,
};

/**
 * Removes currency-related words from the input
 */
function removeCurrencyWords(words: string): string {
  let cleaned = words;
  for (const word of CURRENCY_WORDS_TO_REMOVE) {
    cleaned = cleaned.replace(new RegExp(word, "g"), "");
  }
  return cleaned.trim();
}

/**
 * Checks if the input represents a negative number
 */
function isNegative(words: string): boolean {
  return words.startsWith(NEGATIVE_PREFIX);
}

/**
 * Extracts the positive portion from a negative number string
 */
function extractPositiveWords(words: string): string {
  return words.replace(NEGATIVE_PREFIX, "").trim();
}

/**
 * Processes a list of words and converts them to a number
 */
function processWordList(wordList: string[]): number {
  let total = 0;
  let current = 0;

  for (const word of wordList) {
    if (SCALE_NAME_TO_VALUE[word]) {
      const scale = SCALE_NAME_TO_VALUE[word];
      // If current is 0, this scale word has no multiplier - invalid input
      if (current === 0) {
        throw new Error(
          `Invalid Nepali number format: scale word "${word}" without preceding number`
        );
      }
      current = current * scale;
      total += current;
      current = 0;
    } else if (WORD_TO_NUMBER_MAP[word] !== undefined) {
      current += WORD_TO_NUMBER_MAP[word];
    } else {
      // Unknown word - throw error instead of silently ignoring
      throw new Error(
        `Unknown word in Nepali number: "${word}"`
      );
    }
  }

  return total + current;
}

/**
 * Converts Nepali words back to a number
 *
 * @experimental - This is an experimental feature with limited scope.
 * It currently supports basic conversions but may not handle all edge cases.
 *
 * @param words - The Nepali words to convert
 * @returns The numeric value
 *
 * @example
 * ```ts
 * nepaliWordsToNumber("शून्य") // 0
 * nepaliWordsToNumber("एक") // 1
 * nepaliWordsToNumber("पचास") // 50
 * nepaliWordsToNumber("एक सय") // 100
 * ```
 */
export function nepaliWordsToNumber(words: string): number {
  if (!words || typeof words !== "string") {
    throwInvalidInput(words);
  }

  const trimmed = words.trim();

  if (trimmed === NUMBER_WORDS[0]) {
    return 0;
  }

  if (isNegative(trimmed)) {
    const positiveWords = extractPositiveWords(trimmed);
    return -nepaliWordsToNumber(positiveWords);
  }

  const cleanWords = removeCurrencyWords(trimmed);

  if (!cleanWords) {
    throw new Error(
      "Invalid input: no recognizable Nepali number words found"
    );
  }

  const wordList = cleanWords.split(/\s+/).filter((w) => w);
  return processWordList(wordList);
}
