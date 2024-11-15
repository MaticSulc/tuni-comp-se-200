import { expect, test } from "@jest/globals";
import toFinite from "../src/toFinite";

test("returns the same number for finite numbers", () => {
    expect(toFinite(3.2)).toBe(3.2);
    expect(toFinite(-10)).toBe(-10);
    expect(toFinite(0)).toBe(0);
    expect(toFinite(1.7976931348623157e+308)).toBe(1.7976931348623157e+308); // MAX_INTEGER
});

test("converts string representations of numbers to finite numbers", () => {
    expect(toFinite("3.2")).toBe(3.2);
    expect(toFinite("-10")).toBe(-10);
    expect(toFinite("0")).toBe(0);
});

test("returns 0 for null, undefined, or empty input", () => {
    expect(toFinite(null)).toBe(0);
    expect(toFinite(undefined)).toBe(0);
    expect(toFinite("")).toBe(0);
    expect(toFinite(false)).toBe(0);
});

test("converts Infinity and -Infinity to MAX_INTEGER", () => {
    expect(toFinite(Infinity)).toBe(1.7976931348623157e+308); // MAX_INTEGER
    expect(toFinite(-Infinity)).toBe(-1.7976931348623157e+308); // -MAX_INTEGER
});

test("handles special cases with invalid input", () => {
    expect(toFinite(NaN)).toBe(0);
    expect(toFinite(Symbol("test"))).toBe(0); // Invalid input
    expect(toFinite({})).toBe(0);
    expect(toFinite([])).toBe(0);
});

test("handles objects with valid number values", () => {
const objWithValueOf = { valueOf: () => 42 };
expect(toFinite(objWithValueOf)).toBe(42);

const objWithToString = { toString: () => "3.14" };
    expect(toFinite(objWithToString)).toBe(3.14);

const objWithBoth = { valueOf: () => 7, toString: () => "42" };
    expect(toFinite(objWithBoth)).toBe(7); // Prefer valueOf over toString
});

test("handles large inputs gracefully", () => {
    expect(toFinite(Number.MAX_VALUE)).toBe(1.7976931348623157e+308); // MAX_INTEGER
    expect(toFinite(Number.MIN_VALUE)).toBe(Number.MIN_VALUE); // Tiny positive number
});

test("handles booleans and other coercible types", () => {
    expect(toFinite(true)).toBe(1); // Boolean true -> 1
    expect(toFinite(false)).toBe(0); // Boolean false -> 0
    expect(toFinite("   42   ")).toBe(42); // String with whitespace
});

test("handles invalid numeric strings", () => {
    expect(toFinite("abc")).toBe(0); // Invalid string
    expect(toFinite("Infinity")).toBe(1.7976931348623157e+308); // "Infinity" string
    expect(toFinite("-Infinity")).toBe(-1.7976931348623157e+308); // "-Infinity" string
});

test("does not modify the original input", () => {
    const obj = { valueOf: () => 3.2 };
    const input = Object.assign({}, obj); // Create a copy
    toFinite(obj);
    expect(obj).toEqual(input); // Ensure original input is unchanged
});
