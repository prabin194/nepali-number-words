import { describe, it, expect } from "vitest";
import { numberToNepaliWords } from "../src/converters/numberToWords.js";

describe("numberToNepaliWords options", () => {
  describe("capitalizeFirst option", () => {
    it("should capitalize first letter when true", () => {
      expect(numberToNepaliWords(4750, { capitalizeFirst: true })).toBe(
        "चार हजार सात सय पचास"
      );
      expect(numberToNepaliWords(0, { capitalizeFirst: true })).toBe("शून्य");
      expect(numberToNepaliWords(100, { capitalizeFirst: true })).toBe(
        "एक सय"
      );
    });

    it("should not capitalize by default", () => {
      expect(numberToNepaliWords(4750)).toBe("चार हजार सात सय पचास");
      expect(numberToNepaliWords(4750, { capitalizeFirst: false })).toBe(
        "चार हजार सात सय पचास"
      );
    });

    it("should capitalize negative numbers", () => {
      expect(numberToNepaliWords(-4750, { capitalizeFirst: true })).toBe(
        "ऋणात्मक चार हजार सात सय पचास"
      );
    });
  });
});
