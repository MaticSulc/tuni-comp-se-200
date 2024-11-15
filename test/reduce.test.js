import { expect, test } from "@jest/globals";
import reduce from "../src/reduce";

test("reduces an array to a single value with an initial accumulator", () => {
    const array = [1, 2, 3, 4];
    const sum = (acc, value) => acc + value;
    expect(reduce(array, sum, 0)).toBe(10);
});

test("reduces an array without an initial accumulator", () => {
    const array = [1, 2, 3, 4];
    const sum = (acc, value) => acc + value;
    // First element is used as the initial accumulator
    expect(reduce(array, sum)).toBe(10); 
});

test("reduces an object to a single value with an initial accumulator", () => {
    const obj = { a: 1, b: 2, c: 3 };
    const sumValues = (acc, value) => acc + value;
    expect(reduce(obj, sumValues, 0)).toBe(6);
});

test("reduces an object without an initial accumulator", () => {
    const obj = { a: 1, b: 2, c: 3 };
    const sumValues = (acc, value) => acc + value;
    // First value (1) is used as the initial accumulator
    expect(reduce(obj, sumValues)).toBe(6); 
});

test("handles an empty array with an initial accumulator", () => {
    const array = [];
    const sum = (acc, value) => acc + value;
    expect(reduce(array, sum, 0)).toBe(0);
});

test("handles an empty array without an initial accumulator", () => {
    const array = [];
    const sum = (acc, value) => acc + value;
    expect(() => reduce(array, sum)).toThrow();
});

test("handles an empty object with an initial accumulator", () => {
    const obj = {};
    const combineKeys = (acc, value, key) => acc + key;
    expect(reduce(obj, combineKeys, "")).toBe("");
});

test("handles an empty object without an initial accumulator", () => {
    const obj = {};
    const combineKeys = (acc, value, key) => acc + key;
    expect(() => reduce(obj, combineKeys)).toThrow();
});

test("iterates over arrays with index provided to iteratee", () => {
    const array = [10, 20, 30];
    const sumIndices = (acc, value, index) => acc + index;
    expect(reduce(array, sumIndices, 0)).toBe(3); // Indices: 0 + 1 + 2
});

test("iterates over objects with key provided to iteratee", () => {
    const obj = { a: 1, b: 2, c: 3 };
    const concatenateKeys = (acc, value, key) => acc + key;
    expect(reduce(obj, concatenateKeys, "")).toBe("abc");
});

test("supports building complex objects during reduction", () => {
    const obj = { a: 1, b: 2, c: 1 };
    const groupByValue = (acc, value, key) => {
        if (!acc[value]) acc[value] = [];
            acc[value].push(key);
    return acc;
    };
    expect(reduce(obj, groupByValue, {})).toEqual({ 1: ["a", "c"], 2: ["b"] });
});

test("handles non-iterable values gracefully", () => {
    const nonIterable = null;
    const sum = (acc, value) => acc + value;
    expect(() => reduce(nonIterable, sum, 0)).toThrow();
});

test("works with strings as collections", () => {
    const str = "abc";
    const concatenate = (acc, value) => acc + value.toUpperCase();
    expect(reduce(str, concatenate, "")).toBe("ABC");
});

test("works with custom accumulator types", () => {
    const array = [1, 2, 3];
    const accumulateToSet = (acc, value) => {
        acc.add(value);
        return acc;
    };
    const result = reduce(array, accumulateToSet, new Set());
    expect(Array.from(result)).toEqual([1, 2, 3]);
});

test("does not modify the original collection", () => {
    const array = [1, 2, 3];
    const sum = (acc, value) => acc + value;
    reduce(array, sum, 0);
    expect(array).toEqual([1, 2, 3]);
});
