import { expect, test } from "@jest/globals";
import add from "../src/add";

test("adds two positive numbers", () => {
  expect(add(1, 2)).toBe(3);
});

test("adds a positive and a negative number", () => {
  expect(add(5, -3)).toBe(2);
});

test("adds two negative numbers", () => {
  expect(add(-4, -6)).toBe(-10);
});

test("adds zero to a number", () => {
  expect(add(0, 5)).toBe(5);
});
// We use toBeCloseTo for floating-point comparisons
test("adds two decimal numbers", () => {
  expect(add(2.5, 3.1)).toBeCloseTo(5.6); 
});

// We Assume the function should throw for invalid inputs right?
test("adds a number and a string", () => {
  expect(() => add(1, "2")).toThrow(TypeError); 
});

test("adds with undefined or null inputs", () => {
  expect(() => add(1, undefined)).toThrow(TypeError);
  expect(() => add(null, 2)).toThrow(TypeError);
});
