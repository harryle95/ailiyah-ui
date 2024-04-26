import React from "react";
import { render, screen } from "@testing-library/react";
import { useThemeContext, ThemeProvider } from "./context";
import { expect, test, describe } from "vitest";


const ThemeTestComponent = ({themeName}:{themeName: string}) => {
  const theme = useThemeContext();
  return <>{theme[themeName] ? <h1>{themeName}</h1> : <></>}</>;
};

describe("Test ThemeProvider and useThemeContext", () => {
  test.each([
    ["Icons", { Icons: { twWidth: "w-10" } }],
    ["NavBar", { NavBar: { twTextColor: "text-white" } }],
  ])("Given %s and %o, render exists", (themeName, themeValue) => {
    render(
      <ThemeProvider value={themeValue}>
        <ThemeTestComponent themeName={themeName} />
      </ThemeProvider>
    );
    expect(screen.getByRole("heading").textContent).toBe(themeName);
  });

  test.each([
    ["NavBar", { Icons: { twWidth: "w-10" } }],
    ["Icons", { NavBar: { twTextColor: "text-white" } }],
  ])("Given %s and %o, throw error no render", (themeName, themeValue) => {
    render(
      <ThemeProvider value={themeValue}>
        <ThemeTestComponent themeName={themeName} />
      </ThemeProvider>
    );
    expect(() => screen.getByRole("heading")).toThrowError();
  });

  test.each([["Icons"]])(
    "Given %s and default theme, render exists",
    (themeName) => {
      render(
        <ThemeProvider>
          <ThemeTestComponent themeName={themeName} />
        </ThemeProvider>
      );
      expect(screen.getByRole("heading").textContent).toBe(themeName);
    }
  );
});
