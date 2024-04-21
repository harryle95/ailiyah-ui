import * as React from "react";
import { ITailwindTheme, isTailwindKey } from "./types";

interface PresetTheme {
  [key: string]: ITailwindTheme;
}

const defaultTheme: PresetTheme = {
  NavBarRoot: {
    twHeight: "h-screen",
    twWidth: "w-fit",
    twFlex: "flex",
    twFlexDirection: "flex-row-reverse",
    twBorderRadius: "rounded-r-md",
    twBackgroundColor: "bg-slate-100 dark:bg-slate-950",
  },

  NavBarTrigger: {
    twHeight: "h-full",
    twWidth: "w-fit",
    twPadding: "px-1",
    twFlex: "flex",
    twAlignItems: "items-center",
    twBorderRadius: "rounded-r-md",
    twBackgroundColor: "bg-transparent",
  },

  NavBarContent: {
    twWidth: "w-[260px]",
    twHeight: "h-full",
  },

  Icons: {
    twWidth: "w-full",
    twHeight: "h-full",
    twOpacity: "opacity-100 hover:opacity-50",
    twStrokeWidth: "stroke-1",
    twStroke: "stroke-slate-500 dark:stroke-slate-100"
  },

  TooltipContent: {
    twTextColor: "text-gray-100 dark:text-violet-800",
    twBackgroundColor: "bg-gray-900 dark:bg-gray-50",
    twBoxShadow: "shadow-md",
    twBoxShadowColor: "shadow-gray-100 dark:shadow-gray-900"
  },

  TooltipArrow: {
    twFill: "fill-gray-900 dark:fill-gray-50",
  },
};

export const ThemeContext = React.createContext<PresetTheme | undefined>(
  undefined
);

export const useThemeContext = () => {
  const context = React.useContext(ThemeContext);
  if (!context) {
    console.error("useThemeContext must be used within a Provider");
    return {};
  }
  return context;
};

export const ThemeProvider: React.FC<{
  value?: PresetTheme;
  children: React.ReactNode;
}> = ({ value, children }) => {
  return (
    <ThemeContext.Provider value={value ? value : defaultTheme}>
      {children}
    </ThemeContext.Provider>
  );
};

export class Theme {
  static extract(values: ITailwindTheme): {
    tailwindTheme: ITailwindTheme;
    rest: Record<string, any>;
  } {
    let tailwindTheme: ITailwindTheme = {};
    const rest: Record<string, any> = {};

    Object.keys(values).forEach((key) => {
      if (isTailwindKey(key)) {
        tailwindTheme[key] = values[key];
      } else {
        rest[key] = values[key];
      }
    });
    return { tailwindTheme, rest };
  }

  static toString(value: ITailwindTheme): string {
    const { themeName = "", ...values } = value;
    const valueString = Object.values(values).join(" ");
    return themeName ? themeName + " " + valueString : valueString;
  }

  static getClassName(
    props: ITailwindTheme,
    theme: PresetTheme
  ): { className: string; rest: Record<string, any> } {
    const { tailwindTheme, rest } = Theme.extract(props);
    const appliedTheme =
      tailwindTheme.themeName && theme[tailwindTheme.themeName]
        ? { ...theme[tailwindTheme.themeName], ...tailwindTheme }
        : tailwindTheme;

    const stringTheme = Theme.toString(appliedTheme);
    const className = rest.className
      ? rest.className + " " + stringTheme
      : stringTheme;
    return { className: className, rest: rest };
  }
}
