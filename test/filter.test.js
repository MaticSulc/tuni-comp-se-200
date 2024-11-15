import { expect, test } from "@jest/globals";
import filter from "../src/filter";

// Filter even numbersS
test("filters array based on a simple predicate", () => {
  const array = [1, 2, 3, 4];
  const predicate = (value) => value % 2 === 0; 
  const result = filter(array, predicate);
  expect(result).toEqual([2, 4]);
});

test("filters array of objects based on a property", () => {
  const users = [
    { user: "barney", active: true },
    { user: "fred", active: false },
  ];
  const predicate = ({ active }) => active;
  const result = filter(users, predicate);
  expect(result).toEqual([{ user: "barney", active: true }]);
});

test("returns an empty array when input array is null or undefined", () => {
  const predicate = (value) => value !== undefined;
  expect(filter(null, predicate)).toEqual([]);
  expect(filter(undefined, predicate)).toEqual([]);
});

test("returns an empty array when no elements match the predicate", () => {
  const array = [1, 2, 3];
  const predicate = (value) => value > 10;
  const result = filter(array, predicate);
  expect(result).toEqual([]);
});

test("handles an empty array gracefully", () => {
  const array = [];
  const predicate = (value) => value !== undefined;
  const result = filter(array, predicate);
  expect(result).toEqual([]);
});

// Filter elements at even indexes
test("filters with index as part of the predicate logic", () => {
  const array = [10, 20, 30, 40];
  const predicate = (value, index) => index % 2 === 0; 
  const result = filter(array, predicate);
  expect(result).toEqual([10, 30]);
});

test("filters with array as part of the predicate logic", () => {
  const array = [1, 2, 3, 4];
  const predicate = (value, index, arr) => value > arr.length;
  const result = filter(array, predicate);
  expect(result).toEqual([]);
});

test("does not modify the original array", () => {
  const array = [1, 2, 3, 4];
  const predicate = (value) => value % 2 === 0;
  filter(array, predicate);
  expect(array).toEqual([1, 2, 3, 4]);
});
