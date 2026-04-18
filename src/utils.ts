/**
 * Validates if a value is a valid finite number
 */
export function isValidNumber(value: unknown): value is number {
  return typeof value === "number" && isFinite(value) && !isNaN(value);
}

/**
 * Throws an error for invalid input
 */
export function throwInvalidInput(value: unknown): never {
  throw new Error(
    `Invalid input: expected a finite number, received ${typeof value}: ${value}`
  );
}

/**
 * Rounds a number to specified decimal places
 */
export function roundToDecimals(value: number, decimals: number): number {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}

/**
 * Formats a number with Indian/Nepali grouping style
 * (groups of 2 after the first 3 digits from right)
 */
export function formatWithIndianGrouping(value: string): string {
  const parts = value.split(".");
  let integerPart = parts[0];
  const decimalPart = parts[1];

  // Remove commas if present
  integerPart = integerPart.replace(/,/g, "");

  // Add Indian-style grouping
  if (integerPart.length > 3) {
    const lastThree = integerPart.slice(-3);
    const rest = integerPart.slice(0, -3);
    // Group the rest in pairs from right to left
    const groupedRest = rest.replace(/(\d)(?=(\d{2})+(?!\d))/g, "$1,");
    integerPart = groupedRest ? `${groupedRest},${lastThree}` : lastThree;
  }

  return decimalPart ? `${integerPart}.${decimalPart}` : integerPart;
}

/**
 * Capitalizes the first letter of a string
 */
export function capitalize(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Applies cheque/document style formatting
 * Capitalizes first letter and adds extra spacing
 */
export function applyChequeStyle(str: string): string {
  if (!str) return str;
  const capitalized = capitalize(str);
  return capitalized.replace(/ /g, "  ");
}
