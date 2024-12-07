import { expect, test } from "@jest/globals";
import toNumber from "../src/toNumber";

test("converts number to itself", () => {
    expect(toNumber(3.2)).toBe(3.2);
    expect(toNumber(-10)).toBe(-10);
    expect(toNumber(0)).toBe(0);
    expect(toNumber(Infinity)).toBe(Infinity);
});

test("converts string to number", () => {
    expect(toNumber("3.2")).toBe(3.2);
    expect(toNumber("42")).toBe(42);
    expect(toNumber("-10")).toBe(-10);
    expect(toNumber("0")).toBe(0);
});

test("trims whitespace from strings before conversion", () => {
    expect(toNumber("   42   ")).toBe(42);
    expect(toNumber("\n\t-10.5\t\n")).toBe(-10.5);
});

test("converts binary string to number", () => {
    expect(toNumber("0b101")).toBe(5);
    expect(toNumber("0b0")).toBe(0);
});

test("converts octal string to number", () => {
    expect(toNumber("0o7")).toBe(7);
    expect(toNumber("0o10")).toBe(8);
});

test("returns NaN for invalid hexadecimal strings", () => {
    expect(toNumber("-0x1a")).toBeNaN();
    expect(toNumber("0xGHI")).toBeNaN();
});

test("handles bad input gracefully", () => {
    expect(toNumber(NaN)).toBeNaN();
    expect(toNumber(null)).toBe(0);
    expect(toNumber(undefined)).toBeNaN();
    expect(toNumber(true)).toBe(1);
    expect(toNumber(false)).toBe(0);
});

test("handles Symbol input", () => {
    const symbol = Symbol("test");
    expect(toNumber(symbol)).toBeNaN();
});

test("converts object with valueOf method", () => {
    const obj = { valueOf: () => 42 };
    expect(toNumber(obj)).toBe(42);
});

test("converts object to string if valueOf is not a function", () => {
    const obj = { toString: () => "10" };
    expect(toNumber(obj)).toBe(10);
});

test("returns NaN for objects that cannot be converted", () => {
    const obj = {};
    expect(toNumber(obj)).toBeNaN();
});

test("handles arrays", () => {
    expect(toNumber([42])).toBe(42);
    expect(toNumber(["42"])).toBe(42);
    expect(toNumber([1, 2, 3])).toBeNaN();
});

test("returns NaN for invalid string input", () => {
    expect(toNumber("abc")).toBeNaN();
    expect(toNumber("")).toBeNaN();
    expect(toNumber(" ")).toBeNaN();
});

test("handles edge cases with large numbers", () => {
    expect(toNumber(Number.MIN_VALUE)).toBe(Number.MIN_VALUE);
    expect(toNumber(Number.MAX_VALUE)).toBe(Number.MAX_VALUE);
});
