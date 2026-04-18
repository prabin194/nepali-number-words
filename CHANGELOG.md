# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2026-04-18

### Added
- `toNepaliText` function to replace numbers in text with Nepali words
- `toNepaliDigits` function to convert digits in mixed text (e.g., "Rs. 4750" → "Rs. ४७५०")

### Changed
- Renamed public API functions for consistency: `numberToNepaliWords` → `toNepaliWords`, `amountToNepaliWords` → `toNepaliAmount`, `toDevanagariDigits` → `toNepaliDigits`, `nepaliNumberFormat` → `formatNepaliCurrency`, `textToNepali` → `toNepaliText`
- `toNepaliDigits` now preserves original decimal representation (12.3 → "१२.३" instead of "१२.३०")
- `nepaliWordsToNumber` now throws errors for unknown words or invalid format instead of silently returning 0
- Fixed `nepaliWordsToNumber` to correctly handle compound numbers (e.g., "चार हजार सात सय पचास" now returns 4750)

### Removed
- Removed unused `variant` option from `NumberWordOptions`
- Removed `capitalizeFirst` option from `NumberWordOptions` (not meaningful for Nepali text)

## [0.2.0] - 2026-04-18

### Added
- `nepaliWordsToNumber` function for reverse conversion (experimental)
- `chequeStyle` option to `amountToNepaliWords` for document formatting with extra spacing
- `capitalizeFirst` option to `numberToNepaliWords` for capitalizing first letter
- Test coverage for new options and reverse conversion

### Changed
- Marked `nepaliWordsToNumber` as experimental with limited scope

## [0.1.0] - 2026-04-18

### Added
- `numberToNepaliWords` function to convert numbers to Nepali words
- `amountToNepaliWords` function to convert monetary amounts to Nepali currency words
- `toDevanagariDigits` function to convert Arabic numerals to Devanagari numerals
- `formatNepaliCurrency` function to format amounts with Indian/Nepali grouping
- TypeScript type definitions for all functions and options
- Comprehensive test suite with Vitest
- Support for numbers up to खर्ब (100,000,000,000)
- Support for negative numbers
- Configuration options for all functions
- Framework-agnostic implementation (works with React, Vue, Node.js, etc.)
