import { expect, test } from "vitest";

import { toBool } from "shared/utils";

test("shared utils toBool", () => {
  expect(toBool("true")).toBe(true);
  expect(toBool("false")).toBe(false);
  expect(toBool("")).toBe(false);
  expect(toBool("test")).toBe(false);
  expect(toBool(undefined)).toBe(false);
});
