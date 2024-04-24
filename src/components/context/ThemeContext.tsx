import * as React from "react";
import { TailwindProps, isTailwindKey } from "./src/tailwind.types";
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



}

export { useThemeContext, ThemeProvider, Theme };

export type { PresetTheme };
