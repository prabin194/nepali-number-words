import { describe, it, expect } from "vitest";
import { toNepaliText } from "../src/transformers/textTransformer.js";

describe("toNepaliText", () => {
  it("should replace standalone numbers with Nepali words", () => {
    expect(toNepaliText("Pay 4750 now")).toBe(
      "Pay चार हजार सात सय पचास now"
    );
  });

  it("should replace multiple numbers in text", () => {
    expect(toNepaliText("Amount 500 and fee 25")).toBe(
      "Amount पाँच सय and fee पच्चीस"
    );
  });

  it("should handle decimal numbers as amounts", () => {
    expect(toNepaliText("Rs. 4750.50")).toBe(
      "Rs. चार हजार सात सय पचास रुपैयाँ पचास पैसा मात्र"
    );
  });

  it("should leave non-standalone numbers unchanged", () => {
    expect(toNepaliText("asjdajsd 98989as dasd s")).toBe(
      "asjdajsd 98989as dasd s"
    );
  });

  it("should leave text without numbers unchanged", () => {
    expect(toNepaliText("Hello world")).toBe("Hello world");
  });

  it("should handle empty string", () => {
    expect(toNepaliText("")).toBe("");
  });

  it("should handle whitespace-only string", () => {
    expect(toNepaliText("   ")).toBe("   ");
  });

  it("should handle single number", () => {
    expect(toNepaliText("4750")).toBe(
      "चार हजार सात सय पचास"
    );
  });

  it("should handle zero", () => {
    expect(toNepaliText("0")).toBe("शून्य");
  });

  it("should handle negative numbers", () => {
    expect(toNepaliText("-100")).toBe("ऋणात्मक एक सय");
  });

  it("should handle numbers at start of string", () => {
    expect(toNepaliText("100 rupees")).toBe("एक सय rupees");
  });

  it("should handle numbers at end of string", () => {
    expect(toNepaliText("Total 100")).toBe("Total एक सय");
  });

  it("should handle large numbers", () => {
    expect(toNepaliText("10000000")).toBe("एक करोड");
  });
});
