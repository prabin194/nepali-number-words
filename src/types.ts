/**
 * Options for number to Nepali words conversion
 */
export interface NumberWordOptions {
  // Reserved for future options
}

/**
 * Options for amount to Nepali words conversion
 */
export interface AmountWordOptions {
  /**
   * Whether to append "मात्र" (only) at the end
   * @default true
   */
  appendOnly?: boolean;

  /**
   * Whether to show paisa in the output
   * @default true
   */
  showPaisa?: boolean;

  /**
   * Separator between rupees and paisa
   * @default "space"
   */
  paisaSeparator?: "space" | "and";

  /**
   * Text to use for zero rupees
   * @default "शून्य"
   */
  zeroRupeeText?: string;

  /**
   * Whether to use cheque/document style formatting
   * When true, capitalizes first letter and adds extra spacing
   * @default false
   */
  chequeStyle?: boolean;
}

/**
 * Options for Nepali currency formatting
 */
export interface CurrencyFormatOptions {
  /**
   * Whether to use Devanagari digits
   * @default false
   */
  devanagari?: boolean;

  /**
   * Currency symbol to use
   * @default "रु."
   */
  currencySymbol?: string;

  /**
   * Maximum fraction digits
   * @default 2
   */
  maximumFractionDigits?: number;
}
