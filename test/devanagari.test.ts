import { describe, it, expect } from "vitest";
import { toDevanagariDigits } from "../src/formatters/devanagari.js";

describe("toDevanagariDigits", () => {
  describe("basic conversion", () => {
    it("should convert single digits", () => {
      expect(toDevanagariDigits("0")).toBe("०");
      expect(toDevanagariDigits("1")).toBe("१");
      expect(toDevanagariDigits("5")).toBe("५");
      expect(toDevanagariDigits("9")).toBe("९");
    });

    it("should convert multiple digits", () => {
      expect(toDevanagariDigits("4750")).toBe("४७५०");
      expect(toDevanagariDigits("123456789")).toBe("१२३४५६७८९");
    });

    it("should convert numbers with decimal points", () => {
      expect(toDevanagariDigits("4750.50")).toBe("४७५०.५०");
      expect(toDevanagariDigits("123.45")).toBe("१२३.४५");
    });
  });

  describe("number input", () => {
    it("should convert number input", () => {
      expect(toDevanagariDigits(4750)).toBe("४७५०");
      expect(toDevanagariDigits(4750.50)).toBe("४७५०.५०");
      expect(toDevanagariDigits(0)).toBe("०");
    });
  });

  describe("preserving formatting", () => {
    it("should preserve commas", () => {
      expect(toDevanagariDigits("1,23,456")).toBe("१,२३,४५६");
      expect(toDevanagariDigits("4,750.50")).toBe("४,७५०.५०");
    });

    it("should preserve other characters", () => {
      expect(toDevanagariDigits("रु. 4,750.00")).toBe("रु. ४,७५०.००");
      expect(toDevanagariDigits("NPR 1,23,456.78")).toBe("NPR १,२३,४५६.७८");
    });
  });

  describe("edge cases", () => {
    it("should handle empty string", () => {
      expect(toDevanagariDigits("")).toBe("");
    });

    it("should handle string with no digits", () => {
      expect(toDevanagariDigits("रुपैयाँ")).toBe("रुपैयाँ");
    });

    it("should handle mixed content", () => {
      expect(toDevanagariDigits("Amount: 4750.50 NPR")).toBe(
        "Amount: ४७५०.५० NPR"
      );
    });
  });

  describe("all digits", () => {
    it("should convert all Arabic digits 0-9", () => {
      expect(toDevanagariDigits("0123456789")).toBe("०१२३४५६७८९");
    });
  });
});
