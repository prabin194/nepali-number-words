# Nepali Number & Currency Words Library

A lightweight, framework-independent TypeScript library for converting numbers and monetary amounts to Nepali words.

## Features

- **Number to Words**: Convert integers to Nepali words (e.g., `4750` → `चार हजार सात सय पचास`)
- **Amount to Words**: Convert monetary amounts to Nepali currency words (e.g., `4750.50` → `चार हजार सात सय पचास रुपैयाँ पचास पैसा मात्र`)
- **Words to Number**: Convert Nepali words back to numbers (experimental, e.g., `एक सय` → `100`)
- **Devanagari Digits**: Convert Arabic numerals to Devanagari (e.g., `4750.50` → `४७५०.५०`)
- **Currency Formatting**: Format amounts with Indian/Nepali grouping (e.g., `4750` → `रु. 4,750.00`)
- **Framework Agnostic**: Works with React, Vue, Node.js, Next.js, Nuxt, and any JavaScript/TypeScript project
- **TypeScript Support**: Full TypeScript definitions included
- **Zero Dependencies**: Pure TypeScript, no external runtime dependencies

## Installation

```bash
npm install nepali-number-words
```

## Quick Start

```ts
import {
  numberToNepaliWords,
  amountToNepaliWords,
  nepaliWordsToNumber,
  toDevanagariDigits,
  formatNepaliCurrency,
} from "nepali-number-words";

// Convert numbers to Nepali words
numberToNepaliWords(4750); // "चार हजार सात सय पचास"
numberToNepaliWords(0); // "शून्य"
numberToNepaliWords(-100); // "ऋणात्मक एक सय"

// Convert monetary amounts to Nepali currency words
amountToNepaliWords(4750); // "चार हजार सात सय पचास रुपैयाँ मात्र"
amountToNepaliWords(4750.50); // "चार हजार सात सय पचास रुपैयाँ पचास पैसा मात्र"

// Convert Nepali words back to numbers (experimental)
nepaliWordsToNumber("एक सय"); // 100
nepaliWordsToNumber("शून्य"); // 0

// Convert Arabic digits to Devanagari
toDevanagariDigits("4750.50"); // "४७५०.५०"
toDevanagariDigits(4750.50); // "४७५०.५०"

// Format currency with Indian/Nepali grouping
formatNepaliCurrency(4750); // "रु. 4,750.00"
formatNepaliCurrency(4750, { devanagari: true }); // "रु. ४,७५०.००"
```

## API Reference

### `numberToNepaliWords(value, options?)`

Converts a number to Nepali words.

**Parameters:**
- `value: number` - The number to convert
- `options?: NumberWordOptions` - Conversion options

**Returns:** `string`

**Options:**
```ts
type NumberWordOptions = {
  variant?: "formal" | "common"; // Default: "common"
  capitalizeFirst?: boolean; // Capitalize first letter. Default: false
};
```

**Examples:**
```ts
numberToNepaliWords(0); // "शून्य"
numberToNepaliWords(99); // "उनान्सय"
numberToNepaliWords(100); // "एक सय"
numberToNepaliWords(4750); // "चार हजार सात सय पचास"
numberToNepaliWords(100000); // "एक लाख"
numberToNepaliWords(10000000); // "एक करोड"
numberToNepaliWords(1000000000); // "एक अर्ब"

// With capitalizeFirst option
numberToNepaliWords(4750, { capitalizeFirst: true }); // "चार हजार सात सय पचास"
```

### `amountToNepaliWords(value, options?)`

Converts a monetary amount to Nepali currency words.

**Parameters:**
- `value: number` - The amount to convert
- `options?: AmountWordOptions` - Conversion options

**Returns:** `string`

**Options:**
```ts
type AmountWordOptions = {
  appendOnly?: boolean; // Append "मात्र" at the end. Default: true
  showPaisa?: boolean; // Show paisa in the output. Default: true
  paisaSeparator?: "space" | "and"; // Separator between rupees and paisa. Default: "space"
  zeroRupeeText?: string; // Text for zero rupees. Default: "शून्य"
  chequeStyle?: boolean; // Use cheque/document formatting with extra spacing. Default: false
};
```

**Examples:**
```ts
amountToNepaliWords(4750); // "चार हजार सात सय पचास रुपैयाँ मात्र"
amountToNepaliWords(4750.50); // "चार हजार सात सय पचास रुपैयाँ पचास पैसा मात्र"

// Without "मात्र"
amountToNepaliWords(4750, { appendOnly: false }); // "चार हजार सात सय पचास रुपैयाँ"

// With "र" separator
amountToNepaliWords(4750.50, { paisaSeparator: "and" }); // "चार हजार सात सय पचास रुपैयाँ र पचास पैसा मात्र"

// Hide paisa
amountToNepaliWords(4750.50, { showPaisa: false }); // "चार हजार सात सय पचास रुपैयाँ मात्र"

// Cheque style formatting
amountToNepaliWords(4750, { chequeStyle: true }); // "चार  हजार  सात  सय  पचास  रुपैयाँ  मात्र"
```

### `nepaliWordsToNumber(words)`

Converts Nepali words back to a number.

> **Experimental:** This feature has limited scope and may not handle all edge cases.

**Parameters:**
- `words: string` - The Nepali words to convert

**Returns:** `number`

**Examples:**
```ts
nepaliWordsToNumber("शून्य"); // 0
nepaliWordsToNumber("एक"); // 1
nepaliWordsToNumber("पचास"); // 50
nepaliWordsToNumber("एक सय"); // 100
nepaliWordsToNumber("ऋणात्मक एक सय"); // -100
```

### `toDevanagariDigits(value)`

Converts Arabic numerals to Devanagari numerals.

**Parameters:**
- `value: string | number` - The value to convert

**Returns:** `string`

**Examples:**
```ts
toDevanagariDigits("4750.50"); // "४७५०.५०"
toDevanagariDigits(4750.50); // "४७५०.५०"
toDevanagariDigits("1,23,456.78"); // "१,२३,४५६.७८"
toDevanagariDigits("रु. 4,750.00"); // "रु. ४,७५०.००"
```

### `formatNepaliCurrency(value, options?)`

Formats a number as Nepali currency string with Indian/Nepali grouping.

**Parameters:**
- `value: number` - The number to format
- `options?: CurrencyFormatOptions` - Formatting options

**Returns:** `string`

**Options:**
```ts
type CurrencyFormatOptions = {
  devanagari?: boolean; // Use Devanagari digits. Default: false
  currencySymbol?: string; // Currency symbol. Default: "रु."
  maximumFractionDigits?: number; // Maximum fraction digits. Default: 2
};
```

**Examples:**
```ts
formatNepaliCurrency(4750); // "रु. 4,750.00"
formatNepaliCurrency(4750.50); // "रु. 4,750.50"

// With Devanagari digits
formatNepaliCurrency(4750, { devanagari: true }); // "रु. ४,७५०.००"

// Custom currency symbol
formatNepaliCurrency(4750, { currencySymbol: "NPR " }); // "NPR 4,750.00"

// Custom fraction digits
formatNepaliCurrency(4750, { maximumFractionDigits: 0 }); // "रु. 4,750"
```

## Framework Compatibility

This library is framework-agnostic and works in:

- **React**
- **Vue**
- **Node.js**
- **Next.js**
- **Nuxt**
- **Plain JavaScript**
- **TypeScript**

### React Example

```tsx
import { amountToNepaliWords } from "nepali-number-words";

function Invoice({ amount }: { amount: number }) {
  return (
    <div>
      <p>Amount: {amount}</p>
      <p>In words: {amountToNepaliWords(amount)}</p>
    </div>
  );
}
```

### Vue Example

```vue
<script setup lang="ts">
import { amountToNepaliWords } from "nepali-number-words";

const amount = 4750.50;
</script>

<template>
  <div>
    <p>Amount: {{ amount }}</p>
    <p>In words: {{ amountToNepaliWords(amount) }}</p>
  </div>
</template>
```

### Node.js Example

```ts
import { amountToNepaliWords } from "nepali-number-words";

const amount = 4750.50;
console.log(amountToNepaliWords(amount));
// Output: चार हजार सात सय पचास रुपैयाँ पचास पैसा मात्र
```

## Edge Cases

### Invalid Inputs

The library throws descriptive errors for invalid inputs:

```ts
numberToNepaliWords(NaN); // Throws: "Invalid input: expected a finite number, received number: NaN"
numberToNepaliWords(Infinity); // Throws: "Invalid input: expected a finite number, received number: Infinity"
numberToNepaliWords("4750" as unknown as number); // Throws: "Invalid input: expected a finite number, received string: 4750"
```

### Zero

```ts
numberToNepaliWords(0); // "शून्य"
amountToNepaliWords(0); // "शून्य रुपैयाँ मात्र"
```

### Negative Numbers

```ts
numberToNepaliWords(-4750); // "ऋणात्मक चार हजार सात सय पचास"
amountToNepaliWords(-4750.50); // "ऋणात्मक चार हजार सात सय पचास रुपैयाँ पचास पैसा मात्र"
```

### Decimal Handling

- `numberToNepaliWords` truncates decimals
- `amountToNepaliWords` rounds to 2 decimal places

```ts
numberToNepaliWords(4750.99); // "चार हजार सात सय पचास"
amountToNepaliWords(4750.555); // "चार हजार सात सय पचास रुपैयाँ पचपन्न पैसा मात्र"
```

## Supported Number Ranges

The library supports numbers up to खर्ब (100,000,000,000):

- सय (100)
- हजार (1,000)
- लाख (100,000)
- करोड (10,000,000)
- अर्ब (1,000,000,000)
- खर्ब (100,000,000,000)

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
