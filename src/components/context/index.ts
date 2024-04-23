import { styled } from "./factory";
import { Theme, ThemeProvider, useThemeContext} from "./ThemeContext";
import { ITailwindKey, ITailwindTheme } from "./types";
import { defaultTheme, PresetTheme } from "./default";

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