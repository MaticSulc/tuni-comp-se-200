import {expect, test} from '@jest/globals';

import add from "../src/add";

test("adds two numbers to test add.js", () => {
	expect(add(1, 2)).toBe(3);
})