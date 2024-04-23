import { styled } from "./factory";
import { Theme, ThemeProvider, useThemeContext, createContext} from "./ThemeContext";
import { ITailwindKey, ITailwindTheme } from "./types";
import { defaultTheme, PresetTheme } from "./default";

export {
    styled,
    Theme,
    ThemeProvider,
    useThemeContext,
    defaultTheme,
    createContext
}
export type{
    ITailwindKey,
    ITailwindTheme,
    PresetTheme
}