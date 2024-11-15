import { expect, test } from "@jest/globals";
import map from "../src/map";

test("maps array elements using a simple iteratee", () => {
    const array = [1, 2, 3];
    const square = (n) => n * n;
    expect(map(array, square)).toEqual([1, 4, 9]);
});

test("passes index and array as additional arguments to the iteratee", () => {
    const array = [10, 20, 30];
    const iteratee = (value, index, arr) => `${value}-${index}-${arr.length}`;
    expect(map(array, iteratee)).toEqual(["10-0-3", "20-1-3", "30-2-3"]);
});

test("returns an empty array for null or undefined input", () => {
    const iteratee = (n) => n * 2;
    expect(map(null, iteratee)).toEqual([]);
    expect(map(undefined, iteratee)).toEqual([]);
    });

test("handles empty arrays gracefully", () => {
    const array = [];
    const iteratee = (n) => n * 2;
    expect(map(array, iteratee)).toEqual([]);
});

test("works with non-numeric values", () => {
    const array = ["a", "b", "c"];
    const iteratee = (char) => char.toUpperCase();
    expect(map(array, iteratee)).toEqual(["A", "B", "C"]);
});

test("works with objects in the array", () => {
    const array = [{ x: 1 }, { x: 2 }, { x: 3 }];
    const iteratee = (obj) => obj.x * 2;
    expect(map(array, iteratee)).toEqual([2, 4, 6]);
});

test("returns a new array and does not mutate the original array", () => {
    const array = [1, 2, 3];
    const iteratee = (n) => n + 1;
    const result = map(array, iteratee);
    expect(result).toEqual([2, 3, 4]);
    expect(array).toEqual([1, 2, 3]); // Ensure original array is unchanged
});

test("throws an error if iteratee is not a function", () => {
    const array = [1, 2, 3];
    expect(() => map(array, null)).toThrow(TypeError);
    expect(() => map(array, "not a function")).toThrow(TypeError);
    expect(() => map(array, 42)).toThrow(TypeError);
});

test("handles arrays with mixed data types", () => {
    const array = [1, "a", true, null];
    const iteratee = (value) => (typeof value === "number" ? value * 2 : value);
    expect(map(array, iteratee)).toEqual([2, "a", true, null]);
});

test("handles arrays with nested arrays", () => {
    const array = [[1, 2], [3, 4], [5, 6]];
    const iteratee = (subArray) => subArray.reduce((a, b) => a + b, 0);
    expect(map(array, iteratee)).toEqual([3, 7, 11]);
});
