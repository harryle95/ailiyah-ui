import { styled } from "./factory";
import { Theme, ThemeProvider, useThemeContext, PresetTheme } from "./ThemeContext";
import { ITailwindKey, ITailwindTheme } from "./types";
import { defaultTheme } from "./default";

export {
    styled,
    Theme,
    ThemeProvider,
    useThemeContext,
    defaultTheme
}
export type{
    ITailwindKey,
    ITailwindTheme,
    PresetTheme
}