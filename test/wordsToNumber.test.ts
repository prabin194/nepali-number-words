import { describe, it, expect } from "vitest";
import { nepaliWordsToNumber } from "../src/converters/wordsToNumber.js";

describe("nepaliWordsToNumber (experimental)", () => {
  describe("basic conversions", () => {
    it("should convert zero", () => {
      expect(nepaliWordsToNumber("शून्य")).toBe(0);
    });

    it("should convert single digit numbers", () => {
      expect(nepaliWordsToNumber("एक")).toBe(1);
      expect(nepaliWordsToNumber("पाँच")).toBe(5);
      expect(nepaliWordsToNumber("नौ")).toBe(9);
    });

    it("should convert basic numbers", () => {
      expect(nepaliWordsToNumber("बीस")).toBe(20);
      expect(nepaliWordsToNumber("पचास")).toBe(50);
    });
  });

  describe("hundreds", () => {
    it("should convert hundreds", () => {
      expect(nepaliWordsToNumber("एक सय")).toBe(100);
    });
  });

  describe("negative numbers", () => {
    it("should handle negative numbers", () => {
      expect(nepaliWordsToNumber("ऋणात्मक एक")).toBe(-1);
      expect(nepaliWordsToNumber("ऋणात्मक एक सय")).toBe(-100);
    });
  });

  describe("currency words", () => {
    it("should ignore currency words", () => {
      expect(nepaliWordsToNumber("एक सय रुपैयाँ")).toBe(100);
      expect(nepaliWordsToNumber("एक सय रुपैयाँ मात्र")).toBe(100);
    });
  });

  describe("invalid inputs", () => {
    it("should throw for empty string", () => {
      expect(() => nepaliWordsToNumber("")).toThrow("Invalid input");
    });

    it("should throw for null", () => {
      expect(() => nepaliWordsToNumber(null as unknown as string)).toThrow(
        "Invalid input"
      );
    });

    it("should throw for undefined", () => {
      expect(() =>
        nepaliWordsToNumber(undefined as unknown as string)
      ).toThrow("Invalid input");
    });
  });
});
