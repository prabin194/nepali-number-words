# Nepali Number & Currency Words Library

[![npm](https://img.shields.io/npm/v/nepali-number-words)](https://www.npmjs.com/package/nepali-number-words)
[![downloads](https://img.shields.io/npm/dw/nepali-number-words)](https://www.npmjs.com/package/nepali-number-words)

[**Try the Demo →**](https://prabin194.github.io/portfolio/projects/nepali-number-words)

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
  toNepaliWords,
  toNepaliAmount,
  toNepaliDigits,
  toNepaliText,
  formatNepaliCurrency,
  nepaliWordsToNumber,
} from "nepali-number-words";

// Convert numbers to Nepali words (shorter API)
toNepaliWords(4750); // "चार हजार सात सय पचास"
toNepaliWords(0); // "शून्य"
toNepaliWords(-100); // "ऋणात्मक एक सय"

// Convert monetary amounts to Nepali currency words (shorter API)
toNepaliAmount(4750); // "चार हजार सात सय पचास रुपैयाँ मात्र"
toNepaliAmount(4750.50); // "चार हजार सात सय पचास रुपैयाँ पचास पैसा मात्र"

// Convert digits in mixed text (shorter API)
toNepaliDigits("asjdajsd 98989as dasd s"); // "asjdajsd ९८९८९as dasd s"
toNepaliDigits("Rs. 4750.00"); // "Rs. ४७५०.००"

// Replace numbers in text with Nepali words (shorter API)
toNepaliText("Pay 4750 now"); // "Pay चार हजार सात सय पचास now"
toNepaliText("Amount 500 and fee 25"); // "Amount पाँच सय and fee पच्चीस"

// Format currency with Indian/Nepali grouping
formatNepaliCurrency(4750); // "रु. 4,750.00"
formatNepaliCurrency(4750, { devanagari: true }); // "रु. ४,७५०.००"

// Convert Nepali words back to numbers (experimental - throws on invalid input)
nepaliWordsToNumber("एक सय"); // 100
nepaliWordsToNumber("शून्य"); // 0
```

## API Reference

### `toNepaliWords(value, options?)`

Converts a number to Nepali words.

**Parameters:**
- `value: number` - The number to convert
- `options?: NumberWordOptions` - Conversion options

**Returns:** `string`

**Options:**
```ts
type NumberWordOptions = {
  // Reserved for future options
};
```

**Examples:**
```ts
toNepaliWords(0); // "शून्य"
toNepaliWords(99); // "उनान्सय"
toNepaliWords(100); // "एक सय"
toNepaliWords(4750); // "चार हजार सात सय पचास"
toNepaliWords(100000); // "एक लाख"
toNepaliWords(10000000); // "एक करोड"
toNepaliWords(1000000000); // "एक अर्ब"
```

### `toNepaliAmount(value, options?)`

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
toNepaliAmount(4750); // "चार हजार सात सय पचास रुपैयाँ मात्र"
toNepaliAmount(4750.50); // "चार हजार सात सय पचास रुपैयाँ पचास पैसा मात्र"

// Without "मात्र"
toNepaliAmount(4750, { appendOnly: false }); // "चार हजार सात सय पचास रुपैयाँ"

// With "र" separator
toNepaliAmount(4750.50, { paisaSeparator: "and" }); // "चार हजार सात सय पचास रुपैयाँ र पचास पैसा मात्र"

// Hide paisa
toNepaliAmount(4750.50, { showPaisa: false }); // "चार हजार सात सय पचास रुपैयाँ मात्र"

// Cheque style formatting
toNepaliAmount(4750, { chequeStyle: true }); // "चार  हजार  सात  सय  पचास  रुपैयाँ  मात्र"
```

### `nepaliWordsToNumber(words)`

Converts Nepali words back to a number.

> **Experimental:** This feature has limited scope and may not handle all edge cases. It throws errors for unknown words or invalid format.

**Parameters:**
- `words: string` - The Nepali words to convert

**Returns:** `number`

**Throws:** `Error` if input contains unknown words or invalid format

**Examples:**
```ts
nepaliWordsToNumber("शून्य"); // 0
nepaliWordsToNumber("एक"); // 1
nepaliWordsToNumber("पचास"); // 50
nepaliWordsToNumber("एक सय"); // 100
nepaliWordsToNumber("ऋणात्मक एक सय"); // -100
nepaliWordsToNumber("चार हजार सात सय पचास"); // 4750
```

### `toNepaliDigits(value)`

Converts Arabic numerals to Devanagari numerals. Non-digit text remains unchanged.

**Parameters:**
- `value: string | number` - The value to convert

**Returns:** `string`

**Examples:**
```ts
toNepaliDigits("4750.50"); // "४७५०.५०"
toNepaliDigits(4750.50); // "४७५०.५०"
toNepaliDigits(12.3); // "१२.३"
toNepaliDigits("1,23,456.78"); // "१,२३,४५६.७८"
toNepaliDigits("रु. 4,750.00"); // "रु. ४,७५०.००"
toNepaliDigits("asjdajsd 98989as dasd s"); // "asjdajsd ९८९८९as dasd s"
toNepaliDigits("Invoice #12345"); // "Invoice #१२३४५"
```

### `toNepaliText(input)`

Replaces standalone numbers in text with Nepali words. Non-numeric text remains unchanged. If no valid standalone numbers are found, returns the original string unchanged.

**Parameters:**
- `input: string` - The text to transform

**Returns:** `string`

**Examples:**
```ts
toNepaliText("Pay 4750 now"); // "Pay चार हजार सात सय पचास now"
toNepaliText("Amount 500 and fee 25"); // "Amount पाँच सय and fee पच्चीस"
toNepaliText("asjdajsd 98989as dasd s"); // "asjdajsd 98989as dasd s" (no standalone number)
toNepaliText("Rs. 4750.50"); // "Rs. चार हजार सात सय पचास रुपैयाँ पचास पैसा मात्र"
toNepaliText("Hello world"); // "Hello world" (no numbers)
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
import { toNepaliAmount } from "nepali-number-words";

function Invoice({ amount }: { amount: number }) {
  return (
    <div>
      <p>Amount: {amount}</p>
      <p>In words: {toNepaliAmount(amount)}</p>
    </div>
  );
}
```

### Vue Example

```vue
<script setup lang="ts">
import { toNepaliAmount } from "nepali-number-words";

const amount = 4750.50;
</script>

<template>
  <div>
    <p>Amount: {{ amount }}</p>
    <p>In words: {{ toNepaliAmount(amount) }}</p>
  </div>
</template>
```

### Node.js Example

```ts
import { toNepaliAmount } from "nepali-number-words";

const amount = 4750.50;
console.log(toNepaliAmount(amount));
// Output: चार हजार सात सय पचास रुपैयाँ पचास पैसा मात्र
```

## Edge Cases

### Invalid Inputs

The library throws descriptive errors for invalid inputs:

```ts
toNepaliWords(NaN); // Throws: "Invalid input: expected a finite number, received number: NaN"
toNepaliWords(Infinity); // Throws: "Invalid input: expected a finite number, received number: Infinity"
toNepaliWords("4750" as unknown as number); // Throws: "Invalid input: expected a finite number, received string: 4750"
```

### Zero

```ts
toNepaliWords(0); // "शून्य"
toNepaliAmount(0); // "शून्य रुपैयाँ मात्र"
```

### Negative Numbers

```ts
toNepaliWords(-4750); // "ऋणात्मक चार हजार सात सय पचास"
toNepaliAmount(-4750.50); // "ऋणात्मक चार हजार सात सय पचास रुपैयाँ पचास पैसा मात्र"
```

### Decimal Handling

- `toNepaliWords` truncates decimals
- `toNepaliAmount` rounds to 2 decimal places

```ts
toNepaliWords(4750.99); // "चार हजार सात सय पचास"
toNepaliAmount(4750.555); // "चार हजार सात सय पचास रुपैयाँ पचपन्न पैसा मात्र"
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
