# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
