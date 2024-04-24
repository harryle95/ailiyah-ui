import { styled } from "./factory";
import { Theme, ThemeProvider, useThemeContext, createContext} from "./ThemeContext";
import { ITailwindKey, TailwindProps } from "./tailwind.types";
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
    TailwindProps,
    PresetTheme
}