import { describe, test, expect } from "vitest";
import { styled } from "./factory";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "@ailiyah-ui/context";
import React from "react";

describe("Test styled", () => {
  test.each([
    [
      "with provided defaultProps, empty props should yield defaultProps class",
      { twWidth: "w-5" },
      { Icons: { twWidth: "w-10" } },
      {},
      "w-5",
    ],
    [
      "with provided defaultProps, props overriding defaultProps, should yield passed props",
      { twWidth: "w-5" },
      { Icons: { twWidth: "w-10" } },
      { twWidth: "w-10" },
      "w-10",
    ],
    [
      "with no defaultProps, and with props, should yield props",
      {},
      { Icons: { twWidth: "w-10" } },
      { twWidth: "w-10" },
      "w-10",
    ],
    [
      "with no defaultProps and with themeName provided, yield theme class",
      {},
      { Icons: { twWidth: "w-10" } },
      { themeName: "Icons" },
      "Icons w-10",
    ],
    [
      "with defaultProps, themeName, and props overriding theme props, yield defaultProps + props + theme (except overriden)",
      { twHeight: "h-10" },
      { Icons: { twWidth: "w-10" } },
      { themeName: "Icons", twWidth: "w-5" },
      "Icons w-5 h-10",
    ],
    [
      "with defaultProps, themeName, and props, should yield concatenation of all",
      { twHeight: "h-10" },
      { Icons: { twWidth: "w-10" } },
      { themeName: "Icons", twBackgroundColor: "bg-white" },
      "Icons w-10 h-10 bg-white",
    ],
    [
      "with defaultProps, themeName, className, and props, should yield concatenation of all",
      { twHeight: "h-10" },
      { Icons: { twWidth: "w-10" } },
      {
        themeName: "Icons",
        twBackgroundColor: "bg-white",
        className: "text-xl",
      },
      "text-xl Icons w-10 h-10 bg-white",
    ],
    [
      "with defaultProps, themeName, props overriding defaultProps, return concatnation except overriden defaultProps value",
      { twHeight: "h-10" },
      { Icons: { twWidth: "w-10" } },
      {
        themeName: "Icons",
        twHeight: "h-1",
      },
      "Icons w-10 h-1",
    ],
    [
      "with defaultProps, themeName, and props sharing the same prop, should yield class from props",
      { twHeight: "h-10" },
      { Icons: { twHeight: "h-2" } },
      {
        themeName: "Icons",
        twHeight: "h-1",
      },
      "Icons h-1",
    ],
  ])("%s", (description, defaultProps, theme, props, className) => {
    // @ts-ignore
    const Element = styled("div", defaultProps);
    render(
      <ThemeProvider value={theme}>
        <Element {...props} title="element" />
      </ThemeProvider>
    );
    const node = screen.getByTitle("element");
    expect(node.className).toBe(className);
  });
});
