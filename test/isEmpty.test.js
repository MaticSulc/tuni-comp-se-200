import { expect, test } from "@jest/globals";
import isEmpty from "../src/isEmpty";

test("returns true for null or undefined", () => {
    expect(isEmpty(null)).toBe(true);
    expect(isEmpty(undefined)).toBe(true);
});

test("returns true for boolean values", () => {
    expect(isEmpty(true)).toBe(true);
    expect(isEmpty(false)).toBe(true);
});

test("returns true for numbers", () => {
    expect(isEmpty(0)).toBe(true);
    expect(isEmpty(42)).toBe(true);
    expect(isEmpty(-42)).toBe(true);
    expect(isEmpty(NaN)).toBe(true);
});

test("returns true for empty arrays", () => {
    expect(isEmpty([])).toBe(true);
});

test("returns false for non-empty arrays", () => {
    expect(isEmpty([1, 2, 3])).toBe(false);
    expect(isEmpty(["a", "b"])).toBe(false);
});

test("returns true for empty strings", () => {
    expect(isEmpty("")).toBe(true);
});

test("returns false for non-empty strings", () => {
    expect(isEmpty("abc")).toBe(false);
    expect(isEmpty(" ")).toBe(false); // We note that strings with whitespace are not in fact empty
});

test("returns true for empty objects", () => {
    expect(isEmpty({})).toBe(true);
});

test("returns false for non-empty objects", () => {
    expect(isEmpty({ a: 1 })).toBe(false);
    expect(isEmpty({ key: "value" })).toBe(false);
});

test("returns true for empty Map and Set", () => {
    expect(isEmpty(new Map())).toBe(true);
    expect(isEmpty(new Set())).toBe(true);
});

test("returns false for non-empty Map and Set", () => {
    const map = new Map();
    map.set("key", "value");
    const set = new Set();
    set.add(1);

    expect(isEmpty(map)).toBe(false);
    expect(isEmpty(set)).toBe(false);
});

test("returns true for empty arguments object", () => {
    function testFunc() {
        expect(isEmpty(arguments)).toBe(true);
    }
    testFunc();
});

test("returns false for non-empty arguments object", () => {
    function testFunc() {
        expect(isEmpty(arguments)).toBe(false);
    }
    testFunc(1, 2, 3);
});

test("returns true for empty buffers", () => {
    const buffer = Buffer.alloc(0);
    expect(isEmpty(buffer)).toBe(true);
});

test("returns false for non-empty buffers", () => {
    const buffer = Buffer.from([1, 2, 3]);
    expect(isEmpty(buffer)).toBe(false);
});

test("returns true for objects with no own enumerable properties", () => {
    function EmptyConstructor() {}
    EmptyConstructor.prototype.someMethod = function () {};
    const instance = new EmptyConstructor();
    expect(isEmpty(instance)).toBe(true);
});

test("handles prototypes with own properties", () => {
    function Constructor() {
    this.a = 1;
    }
    const instance = new Constructor();
    expect(isEmpty(instance)).toBe(false);
});

test("returns true for empty typed arrays", () => {
    expect(isEmpty(new Uint8Array(0))).toBe(true);
});

test("returns false for non-empty typed arrays", () => {
    expect(isEmpty(new Uint8Array([1, 2, 3]))).toBe(false);
});
