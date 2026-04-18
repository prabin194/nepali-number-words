import { describe, it, expect } from "vitest";
import { amountToNepaliWords } from "../src/converters/amountToWords.js";

describe("amountToNepaliWords", () => {
  describe("basic amounts", () => {
    it("should convert integer amounts", () => {
      expect(amountToNepaliWords(4750)).toBe("चार हजार सात सय पचास रुपैयाँ मात्र");
    });

    it("should convert 0", () => {
      expect(amountToNepaliWords(0)).toBe("शून्य रुपैयाँ मात्र");
    });

    it("should convert small amounts", () => {
      expect(amountToNepaliWords(1)).toBe("एक रुपैयाँ मात्र");
      expect(amountToNepaliWords(10)).toBe("दश रुपैयाँ मात्र");
      expect(amountToNepaliWords(100)).toBe("एक सय रुपैयाँ मात्र");
    });
  });

  describe("amounts with paisa", () => {
    it("should convert amounts with paisa", () => {
      expect(amountToNepaliWords(4750.50)).toBe(
        "चार हजार सात सय पचास रुपैयाँ पचास पैसा मात्र"
      );
    });

    it("should convert amounts with various paisa values", () => {
      expect(amountToNepaliWords(100.25)).toBe("एक सय रुपैयाँ पच्चीस पैसा मात्र");
      expect(amountToNepaliWords(50.75)).toBe("पचास रुपैयाँ पचहत्तर पैसा मात्र");
      expect(amountToNepaliWords(0.50)).toBe("शून्य रुपैयाँ पचास पैसा मात्र");
    });

    it("should round to 2 decimal places", () => {
      expect(amountToNepaliWords(100.555)).toBe("एक सय रुपैयाँ छपन्न पैसा मात्र");
      expect(amountToNepaliWords(100.999)).toBe("एक सय एक रुपैयाँ मात्र");
    });
  });

  describe("options", () => {
    it("should handle appendOnly option", () => {
      expect(amountToNepaliWords(4750, { appendOnly: false })).toBe(
        "चार हजार सात सय पचास रुपैयाँ"
      );
      expect(amountToNepaliWords(4750.50, { appendOnly: false })).toBe(
        "चार हजार सात सय पचास रुपैयाँ पचास पैसा"
      );
    });

    it("should handle showPaisa option", () => {
      expect(amountToNepaliWords(4750.50, { showPaisa: false })).toBe(
        "चार हजार सात सय पचास रुपैयाँ मात्र"
      );
    });

    it("should handle paisaSeparator option", () => {
      expect(amountToNepaliWords(4750.50, { paisaSeparator: "and" })).toBe(
        "चार हजार सात सय पचास रुपैयाँ र पचास पैसा मात्र"
      );
    });

    it("should handle zeroRupeeText option", () => {
      expect(amountToNepaliWords(0, { zeroRupeeText: "शून्य रकम" })).toBe(
        "शून्य रकम रुपैयाँ मात्र"
      );
    });

    it("should handle combined options", () => {
      expect(
        amountToNepaliWords(4750.50, {
          appendOnly: false,
          showPaisa: true,
          paisaSeparator: "and",
        })
      ).toBe("चार हजार सात सय पचास रुपैयाँ र पचास पैसा");
    });
  });

  describe("negative amounts", () => {
    it("should handle negative amounts", () => {
      expect(amountToNepaliWords(-4750)).toBe(
        "ऋणात्मक चार हजार सात सय पचास रुपैयाँ मात्र"
      );
      expect(amountToNepaliWords(-4750.50)).toBe(
        "ऋणात्मक चार हजार सात सय पचास रुपैयाँ पचास पैसा मात्र"
      );
    });
  });

  describe("large amounts", () => {
    it("should convert lakhs", () => {
      expect(amountToNepaliWords(150000)).toBe(
        "एक लाख पचास हजार रुपैयाँ मात्र"
      );
    });

    it("should convert crores", () => {
      expect(amountToNepaliWords(15000000)).toBe(
        "एक करोड पचास लाख रुपैयाँ मात्र"
      );
    });

    it("should convert arabs", () => {
      expect(amountToNepaliWords(1500000000)).toBe(
        "एक अर्ब पचास करोड रुपैयाँ मात्र"
      );
    });
  });

  describe("invalid inputs", () => {
    it("should throw for NaN", () => {
      expect(() => amountToNepaliWords(NaN)).toThrow("Invalid input");
    });

    it("should throw for Infinity", () => {
      expect(() => amountToNepaliWords(Infinity)).toThrow("Invalid input");
    });

    it("should throw for string input", () => {
      expect(() => amountToNepaliWords("4750" as unknown as number)).toThrow(
        "Invalid input"
      );
    });
  });
});
