import { describe, expect, test } from "vitest";
import { isTailwindKey, extractTailwindTheme } from "./tailwind";
import { TailwindProps } from "./tailwind.types";

describe("Test isTailwindKey gives true for correct key and false for incorrect", () => {
  test.each([
    ["twWidth", true],
    ["twHeight", true],
    ["twBackgroundColor", true],
    ["twBorder", false],
    ["Width", false],
    ["Height", false],
  ])("isTailwindKey(%s)->%i", (key, expected) => {
    expect(isTailwindKey(key)).toBe(expected);
  });
});

describe("Test extractTailwindTheme collects correct themes", () => {
  test.each([
    [
      { twWidth: "w-10", twHeight: "h-100", activeState: true, title: "dummy" },
      { twWidth: "w-10", twHeight: "h-100" },
      { activeState: true, title: "dummy" },
    ],
    [
      { twWidth: "w-10", activeState: true, title: "dummy" },
      { twWidth: "w-10" },
      { activeState: true, title: "dummy" },
    ],
    [
      { twBackgroundColor: "bg-white", activeState: true, title: "dummy" },
      { twBackgroundColor: "bg-white" },
      { activeState: true, title: "dummy" },
    ],
    [{}, {}, {}],
    [{ twWidth: "w-full" }, { twWidth: "w-full" }, {}],
    [{ title: "Accordion" }, {}, { title: "Accordion" }],
  ])(
    "Given a prop, extract tailwinTheme object",
    (props, twTheme, restProp) => {
      const { twProps, ...rest } = extractTailwindTheme(
        props as unknown as TailwindProps
      );
      expect(twProps).toEqual(twTheme);
      expect(rest).toEqual(restProp);
    }
  );
});
