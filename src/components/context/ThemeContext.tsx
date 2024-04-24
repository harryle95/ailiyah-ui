import * as React from "react";
import { ITailwindTheme, isTailwindKey } from "./types";
import { PresetTheme, defaultTheme } from "./default";

export function createContext<ContextValueType>(
  rootComponentName: string,
  defaultContext?: ContextValueType
) {
  const Context = React.createContext<ContextValueType | undefined>(
    defaultContext
  );

  function Provider({
    value,
    children,
  }: {
    value: ContextValueType;
    children: React.ReactNode;
  }) {
    const _value = value
      ? React.useMemo(() => value, Object.values(value))
      : defaultContext;
    return <Context.Provider value={_value}>{children}</Context.Provider>;
  }

  function useContext() {
    const context = React.useContext(Context);
    if (context) return context;
    if (defaultContext !== undefined) return defaultContext;
    // if a defaultContext wasn't specified, it's a required context.
    throw new Error(`context must be used within \`${rootComponentName}\``);
  }

  Provider.displayName = rootComponentName + "Provider";
  return [Provider, useContext] as const;
}

const [ThemeProvider, useThemeContext] = createContext<PresetTheme>(
  "Theme",
  defaultTheme
);

class Theme {
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

export { useThemeContext, ThemeProvider, Theme };

export type { PresetTheme };
