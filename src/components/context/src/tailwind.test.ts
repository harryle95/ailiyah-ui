import { describe, expect, test } from "vitest";
import {
  isTailwindKey,
  extractTailwindTheme,
  toClassString,
  getClassName,
} from "./tailwind";
import { TailwindProps } from "./tailwind.types";
import { defaultTheme } from "./default";

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

describe("Test toClassstring returns the correct tailwind classname", () => {
  test.each([
    [{ twWidth: "w-10", twHeight: "h-10" }, "w-10 h-10"],
    [
      { twWidth: "w-10", twHeight: "h-10", themeName: "Icons" },
      "Icons w-10 h-10",
    ],
    [
      { twWidth: "w-10", twHeight: "h-10", themeName: "Icons " },
      "Icons w-10 h-10",
    ],
    [{}, ""],
    [{ themeName: "Icons" }, "Icons"],
    [{ themeName: "Icons", twBackgroundColor: "bg-white" }, "Icons bg-white"],
  ])("Given a prop, return the correct classname", (props, className) => {
    const result = toClassString(props);
    expect(result).toStrictEqual(className);
  });
});

describe("Test getClassName returns the correct tailwind className", () => {
  test.each([
    // No themeName, no className
    [{ twWidth: "w-10" }, {}, { className: "w-10" }],
    [{ twWidth: "w-10" }, defaultTheme, { className: "w-10" }],
    [
      { twWidth: "w-10", title: "Delete" },
      {},
      { className: "w-10", title: "Delete" },
    ],
    [
      { twWidth: "w-10", title: "Delete" },
      defaultTheme,
      { className: "w-10", title: "Delete" },
    ],

    // themeName, no className
    [{ themeName: "Icons" }, {}, { className: "Icons" }],
    [
      { themeName: "Icons", title: "Delete" },
      {},
      { className: "Icons", title: "Delete" },
    ],
    [
      { themeName: "Icons" },
      defaultTheme,
      { className: "Icons w-full h-full opacity-100 hover:opacity-50" },
    ],
    [
      { themeName: "Icons", title: "Delete" },
      defaultTheme,
      {
        className: "Icons w-full h-full opacity-100 hover:opacity-50",
        title: "Delete",
      },
    ],
    [{ themeName: "Icons", twWidth: "w-10" }, {}, { className: "Icons w-10" }],
    [
      { themeName: "Icons", twWidth: "w-10" },
      defaultTheme,
      { className: "Icons w-10 h-full opacity-100 hover:opacity-50" },
    ],
    [
      { themeName: "Icons", twWidth: "w-10", title: "Delete" },
      {},
      { className: "Icons w-10", title: "Delete" },
    ],
    [
      { themeName: "Icons", twWidth: "w-10", title: "Delete" },
      defaultTheme,
      {
        className: "Icons w-10 h-full opacity-100 hover:opacity-50",
        title: "Delete",
      },
    ],

    // className, no themeName
    [{ className: "Icons" }, {}, { className: "Icons" }],
    [{ className: "Icons" }, defaultTheme, { className: "Icons" }],
    [{ className: "Icons " }, defaultTheme, { className: "Icons" }],
    [{ className: "Icons", twWidth: "w-10" }, {}, { className: "Icons w-10" }],
    [
      { className: "Icons", twWidth: "w-10" },
      defaultTheme,
      { className: "Icons w-10" },
    ],
    [{ className: "w-5" }, defaultTheme, { className: "w-5" }],
    [{ className: "w-5", twWidth: "w-10" }, {}, { className: "w-5 w-10" }],
    [
      { className: "w-5", twWidth: "w-10" },
      defaultTheme,
      { className: "w-5 w-10" },
    ],
    [
      { className: "w-5", twWidth: "w-10", title: "Delete" },
      defaultTheme,
      { className: "w-5 w-10", title: "Delete" },
    ],

    // Both className and themeName
    [{ className: "w-5", themeName: "Icons" }, {}, { className: "w-5 Icons" }],
    [
      { className: "w-5", themeName: "Icons", title: "Delete" },
      {},
      { className: "w-5 Icons", title: "Delete" },
    ],
    [
      { className: "w-5", themeName: "Icons" },
      defaultTheme,
      { className: "w-5 Icons w-full h-full opacity-100 hover:opacity-50" },
    ],
    [
      { className: "w-5", themeName: "Icons", title: "Delete" },
      defaultTheme,
      {
        className: "w-5 Icons w-full h-full opacity-100 hover:opacity-50",
        title: "Delete",
      },
    ],
    [
      { className: "w-5", themeName: "Icons", twWidth: "w-10" },
      defaultTheme,
      { className: "w-5 Icons w-10 h-full opacity-100 hover:opacity-50" },
    ],
    [
      {
        className: "w-5",
        themeName: "Icons",
        twWidth: "w-10",
        title: "Delete",
      },
      defaultTheme,
      {
        className: "w-5 Icons w-10 h-full opacity-100 hover:opacity-50",
        title: "Delete",
      },
    ],
  ])(
    "Given a prop, return the correct tailwind className",
    (props, theme, className) => {
      const clsName = getClassName(props as unknown as TailwindProps, theme);
      expect(clsName).toEqual(className);
    }
  );
});
