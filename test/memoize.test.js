import { expect, test } from "@jest/globals";
import memoize from "../src/memoize";

test("memoizes results of a function", () => {
    const mockFunc = jest.fn((x) => x * 2); // Function that doubles input
    const memoizedFunc = memoize(mockFunc);

    expect(memoizedFunc(2)).toBe(4); 
    expect(memoizedFunc(2)).toBe(4); 

    // Ensure the original function was only called once
    expect(mockFunc).toHaveBeenCalledTimes(1);
});

test("uses resolver to determine cache keys", () => {
    const mockFunc = jest.fn((x) => x * 2);
    const resolver = (x) => `key:${x}`; // Custom key resolver
    const memoizedFunc = memoize(mockFunc, resolver);

    expect(memoizedFunc(2)).toBe(4);
    expect(memoizedFunc(2)).toBe(4);

    // Ensure the resolver determined the cache key
    expect(mockFunc).toHaveBeenCalledTimes(1);
});

test("updates cache with results", () => {
    const mockFunc = jest.fn((x) => x * 2);
    const memoizedFunc = memoize(mockFunc);

    expect(memoizedFunc(2)).toBe(4);
    // Manually update the cache to check if it breaks
    memoizedFunc.cache.set(2, 8);
    expect(memoizedFunc(2)).toBe(8); // Should return updated value
});

test("throws an error if func is not a function", () => {
    expect(() => memoize(null)).toThrow(TypeError);
    expect(() => memoize(42)).toThrow(TypeError);
    expect(() => memoize("not a function")).toThrow(TypeError);
});

test("throws an error if resolver is not a function", () => {
    const mockFunc = (x) => x;
    expect(() => memoize(mockFunc, 42)).toThrow(TypeError);
});

test("handles functions with no arguments", () => {
    const mockFunc = jest.fn(() => "constant");
    const memoizedFunc = memoize(mockFunc);

    expect(memoizedFunc()).toBe("constant");
    expect(memoizedFunc()).toBe("constant");
    // Check wehther only called once
    expect(mockFunc).toHaveBeenCalledTimes(1); 
});

test("works with custom cache implementation", () => {
    const mockFunc = jest.fn((x) => x * 2);
    const customCache = new WeakMap(); 
    // Replace default cache with custom cache
    memoize.Cache = WeakMap; 

    const memoizedFunc = memoize(mockFunc);
    memoizedFunc.cache = customCache;

    const objKey = {};
    // WeakMap only works with objects
    expect(memoizedFunc(objKey)).toBe(NaN);
    // Should use cached value 
    expect(memoizedFunc(objKey)).toBe(NaN); 
    expect(mockFunc).toHaveBeenCalledTimes(1);

    // Reset Cache after test
    memoize.Cache = Map;
});

test("does not cache when resolver returns unique keys", () => {
    const mockFunc = jest.fn((x) => x * 2);
    const resolver = () => Math.random(); 
    const memoizedFunc = memoize(mockFunc, resolver);

    expect(memoizedFunc(2)).toBe(4);
    expect(memoizedFunc(2)).toBe(4); // Same input but unique key
    // Called twice because keys differ
    expect(mockFunc).toHaveBeenCalledTimes(2); 
});

test("does not modify the original function", () => {
    const mockFunc = jest.fn((x) => x * 2);
    const memoizedFunc = memoize(mockFunc);

    expect(memoizedFunc(2)).toBe(4);
    expect(mockFunc(2)).toBe(4); // Call original function directly
    expect(mockFunc).toHaveBeenCalledTimes(2); // Both direct and memoized calls
});
