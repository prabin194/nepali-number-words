import { describe, it, expect } from "vitest";
import { toNepaliDigits } from "../src/formatters/devanagari.js";

describe("toNepaliDigits", () => {
  describe("basic conversion", () => {
    it("should convert single digits", () => {
      expect(toNepaliDigits("0")).toBe("०");
      expect(toNepaliDigits("1")).toBe("१");
      expect(toNepaliDigits("5")).toBe("५");
      expect(toNepaliDigits("9")).toBe("९");
    });

    it("should convert multiple digits", () => {
      expect(toNepaliDigits("4750")).toBe("४७५०");
      expect(toNepaliDigits("123456789")).toBe("१२३४५६७८९");
    });

    it("should convert numbers with decimal points", () => {
      expect(toNepaliDigits("4750.50")).toBe("४७५०.५०");
      expect(toNepaliDigits("123.45")).toBe("१२३.४५");
    });
  });

  describe("number input", () => {
    it("should convert number input", () => {
      expect(toNepaliDigits(4750)).toBe("४७५०");
      expect(toNepaliDigits(4750.50)).toBe("४७५०.५");
      expect(toNepaliDigits(12.3)).toBe("१२.३");
      expect(toNepaliDigits(0)).toBe("०");
    });
  });

  describe("preserving formatting", () => {
    it("should preserve commas", () => {
      expect(toNepaliDigits("1,23,456")).toBe("१,२३,४५६");
      expect(toNepaliDigits("4,750.50")).toBe("४,७५०.५०");
    });

    it("should preserve other characters", () => {
      expect(toNepaliDigits("रु. 4,750.00")).toBe("रु. ४,७५०.००");
      expect(toNepaliDigits("NPR 1,23,456.78")).toBe("NPR १,२३,४५६.७८");
    });
  });

  describe("edge cases", () => {
    it("should handle empty string", () => {
      expect(toNepaliDigits("")).toBe("");
    });

    it("should handle string with no digits", () => {
      expect(toNepaliDigits("रुपैयाँ")).toBe("रुपैयाँ");
    });

    it("should handle mixed content", () => {
      expect(toNepaliDigits("Amount: 4750.50 NPR")).toBe(
        "Amount: ४७५०.५० NPR"
      );
    });
  });

  describe("all digits", () => {
    it("should convert all Arabic digits 0-9", () => {
      expect(toNepaliDigits("0123456789")).toBe("०१२३४५६७८९");
    });
  });
});
