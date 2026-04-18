import { describe, it, expect } from "vitest";
import { formatNepaliCurrency } from "../src/formatters/currencyFormat.js";

describe("formatNepaliCurrency", () => {
  describe("basic formatting", () => {
    it("should format basic amounts", () => {
      expect(formatNepaliCurrency(4750)).toBe("रु. 4,750.00");
    });

    it("should format small amounts", () => {
      expect(formatNepaliCurrency(0)).toBe("रु. 0.00");
      expect(formatNepaliCurrency(1)).toBe("रु. 1.00");
      expect(formatNepaliCurrency(10)).toBe("रु. 10.00");
    });

    it("should format amounts with decimals", () => {
      expect(formatNepaliCurrency(4750.50)).toBe("रु. 4,750.50");
      expect(formatNepaliCurrency(100.25)).toBe("रु. 100.25");
    });
  });

  describe("Indian/Nepali grouping", () => {
    it("should apply Indian-style grouping", () => {
      expect(formatNepaliCurrency(100000)).toBe("रु. 1,00,000.00");
      expect(formatNepaliCurrency(1234567)).toBe("रु. 12,34,567.00");
      expect(formatNepaliCurrency(10000000)).toBe("रु. 1,00,00,000.00");
    });

    it("should handle amounts with grouping and decimals", () => {
      expect(formatNepaliCurrency(1234567.89)).toBe("रु. 12,34,567.89");
    });
  });

  describe("options", () => {
    it("should handle devanagari option", () => {
      expect(formatNepaliCurrency(4750, { devanagari: true })).toBe(
        "रु. ४,७५०.००"
      );
      expect(formatNepaliCurrency(4750.50, { devanagari: true })).toBe(
        "रु. ४,७५०.५०"
      );
    });

    it("should handle custom currency symbol", () => {
      expect(formatNepaliCurrency(4750, { currencySymbol: "NPR " })).toBe(
        "NPR 4,750.00"
      );
      expect(formatNepaliCurrency(4750, { currencySymbol: "Rs. " })).toBe(
        "Rs. 4,750.00"
      );
      expect(formatNepaliCurrency(4750, { currencySymbol: "" })).toBe(
        " 4,750.00"
      );
    });

    it("should handle fraction digits options", () => {
      expect(formatNepaliCurrency(4750, { maximumFractionDigits: 0 })).toBe(
        "रु. 4,750"
      );
      expect(formatNepaliCurrency(4750, { minimumFractionDigits: 0, maximumFractionDigits: 0 })).toBe(
        "रु. 4,750"
      );
      expect(formatNepaliCurrency(4750.50, { maximumFractionDigits: 3 })).toBe(
        "रु. 4,750.500"
      );
    });

    it("should handle combined options", () => {
      expect(
        formatNepaliCurrency(4750.50, {
          devanagari: true,
          currencySymbol: "NPR ",
        })
      ).toBe("NPR ४,७५०.५०");
    });
  });

  describe("negative amounts", () => {
    it("should format negative amounts", () => {
      expect(formatNepaliCurrency(-4750)).toBe("रु. -4,750.00");
      expect(formatNepaliCurrency(-4750.50)).toBe("रु. -4,750.50");
    });
  });

  describe("large amounts", () => {
    it("should format lakhs", () => {
      expect(formatNepaliCurrency(150000)).toBe("रु. 1,50,000.00");
    });

    it("should format crores", () => {
      expect(formatNepaliCurrency(15000000)).toBe("रु. 1,50,00,000.00");
    });

    it("should format arabs", () => {
      expect(formatNepaliCurrency(1500000000)).toBe("रु. 1,50,00,00,000.00");
    });
  });

  describe("invalid inputs", () => {
    it("should throw for NaN", () => {
      expect(() => formatNepaliCurrency(NaN)).toThrow("Invalid input");
    });

    it("should throw for Infinity", () => {
      expect(() => formatNepaliCurrency(Infinity)).toThrow("Invalid input");
    });

    it("should throw for string input", () => {
      expect(() => formatNepaliCurrency("4750" as unknown as number)).toThrow(
        "Invalid input"
      );
    });
  });
});
