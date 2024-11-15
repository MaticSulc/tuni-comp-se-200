import { expect, test } from "@jest/globals";
import chunk from "../src/chunk";

test("splits array into chunks of given size", () => {
  const array = ["a", "b", "c", "d"];
  const result = chunk(array, 2);
  expect(result).toEqual([["a", "b"], ["c", "d"]]);
});

test("handles chunk size larger than the array length", () => {
  const array = ["a", "b", "c"];
  const result = chunk(array, 5);
  expect(result).toEqual([["a", "b", "c"]]);
});

test("splits array into uneven chunks", () => {
  const array = ["a", "b", "c", "d", "e"];
  const result = chunk(array, 3);
  expect(result).toEqual([["a", "b", "c"], ["d", "e"]]);
});

test("returns an empty array if input array is null or undefined", () => {
  expect(chunk(null, 2)).toEqual([]);
  expect(chunk(undefined, 3)).toEqual([]);
});

test("returns an empty array if chunk size is less than 1", () => {
  const array = ["a", "b", "c"];
  const result = chunk(array, 0);
  expect(result).toEqual([]);
});

test("defaults to chunk size of 1 when no size is provided", () => {
  const array = ["a", "b", "c"];
  const result = chunk(array);
  expect(result).toEqual([["a"], ["b"], ["c"]]);
});

test("handles negative chunk sizes gracefully", () => {
  const array = ["a", "b", "c"];
  const result = chunk(array, -2);
  expect(result).toEqual([]);
});

test("splits array with floating-point chunk size", () => {
  const array = ["a", "b", "c", "d", "e"];
  const result = chunk(array, 2.5); // Should treat size as 2
  expect(result).toEqual([["a", "b"], ["c", "d"], ["e"]]);
});

test("does not modify the original array", () => {
  const array = ["a", "b", "c", "d"];
  const copy = [...array];
  chunk(array, 2);
  expect(array).toEqual(copy);
});
