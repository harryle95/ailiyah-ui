import { defaultTheme } from "./default";
import { PresetTheme } from "./default.types";
import { getClassName } from "./tailwind";
import { TailwindProps } from "./tailwind.types";
import { ThemeProvider, createContext, useThemeContext } from "./context";
import { styled, createElement } from "./factory";
import {
  TailwindComponent,
  TailwindComponentProps,
  TailwindComponentDefaultProps,
} from "./factory.types";

export {
  defaultTheme,
  getClassName,
  ThemeProvider,
  createContext,
  useThemeContext,
  styled,
  createElement,
};

export type {
  TailwindProps,
  PresetTheme,
  TailwindComponent,
  TailwindComponentProps,
  TailwindComponentDefaultProps,
};
