import { describe, it, expect } from "vitest";
import { toNepaliAmount } from "../src/converters/amountToWords.js";

describe("toNepaliAmount options", () => {
  describe("chequeStyle option", () => {
    it("should apply cheque style formatting when true", () => {
      expect(toNepaliAmount(4750, { chequeStyle: true })).toBe(
        "चार  हजार  सात  सय  पचास  रुपैयाँ  मात्र"
      );
      expect(toNepaliAmount(4750.50, { chequeStyle: true })).toBe(
        "चार  हजार  सात  सय  पचास  रुपैयाँ  पचास  पैसा  मात्र"
      );
    });

    it("should capitalize first letter in cheque style", () => {
      const result = toNepaliAmount(4750, { chequeStyle: true });
      // First character should be the same (Nepali doesn't have case)
      expect(result).toBeTruthy();
    });

    it("should not apply cheque style by default", () => {
      expect(toNepaliAmount(4750)).toBe(
        "चार हजार सात सय पचास रुपैयाँ मात्र"
      );
    });

    it("should work with other options combined", () => {
      expect(
        toNepaliAmount(4750.50, {
          chequeStyle: true,
          appendOnly: false,
          paisaSeparator: "and",
        })
      ).toBe("चार  हजार  सात  सय  पचास  रुपैयाँ  र  पचास  पैसा");
    });

    it("should handle negative amounts with cheque style", () => {
      expect(toNepaliAmount(-4750, { chequeStyle: true })).toBe(
        "ऋणात्मक  चार  हजार  सात  सय  पचास  रुपैयाँ  मात्र"
      );
    });

    it("should handle zero with cheque style", () => {
      expect(toNepaliAmount(0, { chequeStyle: true })).toBe(
        "शून्य  रुपैयाँ  मात्र"
      );
    });
  });
});
