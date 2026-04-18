import { describe, it, expect } from "vitest";
import { numberToNepaliWords } from "../src/converters/numberToWords.js";

describe("numberToNepaliWords", () => {
  describe("basic numbers 0-99", () => {
    it("should convert 0", () => {
      expect(numberToNepaliWords(0)).toBe("शून्य");
    });

    it("should convert single digit numbers", () => {
      expect(numberToNepaliWords(1)).toBe("एक");
      expect(numberToNepaliWords(5)).toBe("पाँच");
      expect(numberToNepaliWords(9)).toBe("नौ");
    });

    it("should convert teens", () => {
      expect(numberToNepaliWords(10)).toBe("दश");
      expect(numberToNepaliWords(11)).toBe("एघार");
      expect(numberToNepaliWords(15)).toBe("पन्ध्र");
      expect(numberToNepaliWords(19)).toBe("उन्नाइस");
    });

    it("should convert 20-99", () => {
      expect(numberToNepaliWords(20)).toBe("बीस");
      expect(numberToNepaliWords(25)).toBe("पच्चीस");
      expect(numberToNepaliWords(50)).toBe("पचास");
      expect(numberToNepaliWords(99)).toBe("उनान्सय");
    });
  });

  describe("hundreds", () => {
    it("should convert 100", () => {
      expect(numberToNepaliWords(100)).toBe("एक सय");
    });

    it("should convert hundreds", () => {
      expect(numberToNepaliWords(200)).toBe("दुई सय");
      expect(numberToNepaliWords(550)).toBe("पाँच सय पचास");
      expect(numberToNepaliWords(999)).toBe("नौ सय उनान्सय");
    });
  });

  describe("thousands", () => {
    it("should convert 1000", () => {
      expect(numberToNepaliWords(1000)).toBe("एक हजार");
    });

    it("should convert thousands", () => {
      expect(numberToNepaliWords(4750)).toBe("चार हजार सात सय पचास");
      expect(numberToNepaliWords(10000)).toBe("दश हजार");
      expect(numberToNepaliWords(15000)).toBe("पन्ध्र हजार");
    });
  });

  describe("lakhs", () => {
    it("should convert 1 lakh", () => {
      expect(numberToNepaliWords(100000)).toBe("एक लाख");
    });

    it("should convert lakhs", () => {
      expect(numberToNepaliWords(150000)).toBe("एक लाख पचास हजार");
      expect(numberToNepaliWords(999999)).toBe("नौ लाख उनान्सय हजार नौ सय उनान्सय");
    });
  });

  describe("crores", () => {
    it("should convert 1 crore", () => {
      expect(numberToNepaliWords(10000000)).toBe("एक करोड");
    });

    it("should convert crores", () => {
      expect(numberToNepaliWords(15000000)).toBe("एक करोड पचास लाख");
      expect(numberToNepaliWords(100000000)).toBe("दश करोड");
    });
  });

  describe("arabs", () => {
    it("should convert 1 arab", () => {
      expect(numberToNepaliWords(1000000000)).toBe("एक अर्ब");
    });

    it("should convert arabs", () => {
      expect(numberToNepaliWords(1500000000)).toBe("एक अर्ब पचास करोड");
    });
  });

  describe("kharbs", () => {
    it("should convert 1 kharb", () => {
      expect(numberToNepaliWords(100000000000)).toBe("एक खर्ब");
    });
  });

  describe("negative numbers", () => {
    it("should handle negative numbers", () => {
      expect(numberToNepaliWords(-1)).toBe("ऋणात्मक एक");
      expect(numberToNepaliWords(-100)).toBe("ऋणात्मक एक सय");
      expect(numberToNepaliWords(-4750)).toBe("ऋणात्मक चार हजार सात सय पचास");
    });
  });

  describe("decimal handling", () => {
    it("should truncate decimals", () => {
      expect(numberToNepaliWords(4750.99)).toBe("चार हजार सात सय पचास");
      expect(numberToNepaliWords(100.5)).toBe("एक सय");
    });
  });

  describe("invalid inputs", () => {
    it("should throw for NaN", () => {
      expect(() => numberToNepaliWords(NaN)).toThrow("Invalid input");
    });

    it("should throw for Infinity", () => {
      expect(() => numberToNepaliWords(Infinity)).toThrow("Invalid input");
    });

    it("should throw for -Infinity", () => {
      expect(() => numberToNepaliWords(-Infinity)).toThrow("Invalid input");
    });

    it("should throw for string input", () => {
      expect(() => numberToNepaliWords("4750" as unknown as number)).toThrow(
        "Invalid input"
      );
    });

    it("should throw for null", () => {
      expect(() => numberToNepaliWords(null as unknown as number)).toThrow(
        "Invalid input"
      );
    });

    it("should throw for undefined", () => {
      expect(() => numberToNepaliWords(undefined as unknown as number)).toThrow(
        "Invalid input"
      );
    });
  });
});
