import { describe, it, expect } from "vitest";
import { toNepaliDigits } from "../src/formatters/devanagari.js";

describe("toNepaliDigits", () => {
  it("should convert digits in mixed text", () => {
    expect(toNepaliDigits("asjdajsd 98989as dasd s")).toBe(
      "asjdajsd ९८९८९as dasd s"
    );
  });

  it("should convert digits with currency symbols", () => {
    expect(toNepaliDigits("Rs. 4750.00")).toBe("Rs. ४७५०.००");
  });

  it("should convert number input", () => {
    expect(toNepaliDigits(123456)).toBe("१२३४५६");
  });

  it("should preserve non-digit characters", () => {
    expect(toNepaliDigits("Invoice #12345")).toBe("Invoice #१२३४५");
  });

  it("should handle empty string", () => {
    expect(toNepaliDigits("")).toBe("");
  });

  it("should handle string with no digits", () => {
    expect(toNepaliDigits("Hello World")).toBe("Hello World");
  });
});
