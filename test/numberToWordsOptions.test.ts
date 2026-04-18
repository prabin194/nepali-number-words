import { describe, it, expect } from "vitest";
import { toNepaliWords } from "../src/converters/numberToWords.js";

describe("toNepaliWords options", () => {
  describe("capitalizeFirst option", () => {
    it("should capitalize first letter when true", () => {
      expect(toNepaliWords(4750, { capitalizeFirst: true })).toBe(
        "चार हजार सात सय पचास"
      );
      expect(toNepaliWords(0, { capitalizeFirst: true })).toBe("शून्य");
      expect(toNepaliWords(100, { capitalizeFirst: true })).toBe(
        "एक सय"
      );
    });

    it("should not capitalize by default", () => {
      expect(toNepaliWords(4750)).toBe("चार हजार सात सय पचास");
      expect(toNepaliWords(4750, { capitalizeFirst: false })).toBe(
        "चार हजार सात सय पचास"
      );
    });

    it("should capitalize negative numbers", () => {
      expect(toNepaliWords(-4750, { capitalizeFirst: true })).toBe(
        "ऋणात्मक चार हजार सात सय पचास"
      );
    });
  });
});
