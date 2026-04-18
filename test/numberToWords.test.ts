import { describe, it, expect } from "vitest";
import { toNepaliWords } from "../src/converters/numberToWords.js";

describe("toNepaliWords", () => {
  describe("basic numbers 0-99", () => {
    it("should convert 0", () => {
      expect(toNepaliWords(0)).toBe("शून्य");
    });

    it("should convert single digit numbers", () => {
      expect(toNepaliWords(1)).toBe("एक");
      expect(toNepaliWords(5)).toBe("पाँच");
      expect(toNepaliWords(9)).toBe("नौ");
    });

    it("should convert teens", () => {
      expect(toNepaliWords(10)).toBe("दश");
      expect(toNepaliWords(11)).toBe("एघार");
      expect(toNepaliWords(15)).toBe("पन्ध्र");
      expect(toNepaliWords(19)).toBe("उन्नाइस");
    });

    it("should convert 20-99", () => {
      expect(toNepaliWords(20)).toBe("बीस");
      expect(toNepaliWords(25)).toBe("पच्चीस");
      expect(toNepaliWords(50)).toBe("पचास");
      expect(toNepaliWords(99)).toBe("उनान्सय");
    });
  });

  describe("hundreds", () => {
    it("should convert 100", () => {
      expect(toNepaliWords(100)).toBe("एक सय");
    });

    it("should convert hundreds", () => {
      expect(toNepaliWords(200)).toBe("दुई सय");
      expect(toNepaliWords(550)).toBe("पाँच सय पचास");
      expect(toNepaliWords(999)).toBe("नौ सय उनान्सय");
    });
  });

  describe("thousands", () => {
    it("should convert 1000", () => {
      expect(toNepaliWords(1000)).toBe("एक हजार");
    });

    it("should convert thousands", () => {
      expect(toNepaliWords(4750)).toBe("चार हजार सात सय पचास");
      expect(toNepaliWords(10000)).toBe("दश हजार");
      expect(toNepaliWords(15000)).toBe("पन्ध्र हजार");
    });
  });

  describe("lakhs", () => {
    it("should convert 1 lakh", () => {
      expect(toNepaliWords(100000)).toBe("एक लाख");
    });

    it("should convert lakhs", () => {
      expect(toNepaliWords(150000)).toBe("एक लाख पचास हजार");
      expect(toNepaliWords(999999)).toBe("नौ लाख उनान्सय हजार नौ सय उनान्सय");
    });
  });

  describe("crores", () => {
    it("should convert 1 crore", () => {
      expect(toNepaliWords(10000000)).toBe("एक करोड");
    });

    it("should convert crores", () => {
      expect(toNepaliWords(15000000)).toBe("एक करोड पचास लाख");
      expect(toNepaliWords(100000000)).toBe("दश करोड");
    });
  });

  describe("arabs", () => {
    it("should convert 1 arab", () => {
      expect(toNepaliWords(1000000000)).toBe("एक अर्ब");
    });

    it("should convert arabs", () => {
      expect(toNepaliWords(1500000000)).toBe("एक अर्ब पचास करोड");
    });
  });

  describe("kharbs", () => {
    it("should convert 1 kharb", () => {
      expect(toNepaliWords(100000000000)).toBe("एक खर्ब");
    });
  });

  describe("negative numbers", () => {
    it("should handle negative numbers", () => {
      expect(toNepaliWords(-1)).toBe("ऋणात्मक एक");
      expect(toNepaliWords(-100)).toBe("ऋणात्मक एक सय");
      expect(toNepaliWords(-4750)).toBe("ऋणात्मक चार हजार सात सय पचास");
    });
  });

  describe("decimal handling", () => {
    it("should truncate decimals", () => {
      expect(toNepaliWords(4750.99)).toBe("चार हजार सात सय पचास");
      expect(toNepaliWords(100.5)).toBe("एक सय");
    });
  });

  describe("invalid inputs", () => {
    it("should throw for NaN", () => {
      expect(() => toNepaliWords(NaN)).toThrow();
    });

    it("should throw for Infinity", () => {
      expect(() => toNepaliWords(Infinity)).toThrow();
    });

    it("should throw for -Infinity", () => {
      expect(() => toNepaliWords(-Infinity)).toThrow();
    });

    it("should throw for string input", () => {
      expect(() => toNepaliWords("4750" as unknown as number)).toThrow();
    });

    it("should throw for null", () => {
      expect(() => toNepaliWords(null as unknown as number)).toThrow();
    });

    it("should throw for undefined", () => {
      expect(() => toNepaliWords(undefined as unknown as number)).toThrow();
    });

    it("should throw for numbers beyond खर्ब (100 billion)", () => {
      expect(() => toNepaliWords(100000000001)).toThrow(
        "Number exceeds maximum supported value"
      );
    });
  });

  describe("negative zero", () => {
    it("should handle -0 as zero", () => {
      expect(toNepaliWords(-0)).toBe("शून्य");
    });
  });
});
