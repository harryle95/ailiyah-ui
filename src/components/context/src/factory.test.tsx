import { describe, test, expect } from "vitest";
import { styled, createElement } from "./factory";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "./context";
import React from "react";

describe("Test styled", () => {
  test.each([
    ["div", { twWidth: "w-5" }, { Icons: { twWidth: "w-10" } }, {}, "w-5"],
    [
      "div",
      { twWidth: "w-5" },
      { Icons: { twWidth: "w-10" } },
      { twWidth: "w-10" },
      "w-10",
    ],
    ["div", {}, { Icons: { twWidth: "w-10" } }, { twWidth: "w-10" }, "w-10"],
    [
      "div",
      {},
      { Icons: { twWidth: "w-10" } },
      { themeName: "Icons" },
      "Icons w-10",
    ],
    [
      "div",
      { twHeight: "h-10" },
      { Icons: { twWidth: "w-10" } },
      { themeName: "Icons", twWidth: "w-5" },
      "Icons w-5 h-10",
    ],
    [
      "div",
      { twHeight: "h-10" },
      { Icons: { twWidth: "w-10" } },
      { themeName: "Icons", twBackgroundColor: "bg-white" },
      "Icons w-10 h-10 bg-white",
    ],
    [
      "div",
      { twHeight: "h-10" },
      { Icons: { twWidth: "w-10" } },
      {
        themeName: "Icons",
        twBackgroundColor: "bg-white",
        className: "text-xl",
      },
      "text-xl Icons w-10 h-10 bg-white",
    ],
  ])(
    "Test style yields correct tailwind class",
    (element, defaultProps, theme, props, className) => {
      // @ts-ignore
      const Element = styled(element, defaultProps);
      render(
        <ThemeProvider value={theme}>
          <Element {...props} title="element" />
        </ThemeProvider>
      );
      const node = screen.getByTitle("element");
      expect(node.className).toBe(className);
    }
  );
});
