import * as React from "react";
import { useThemeContext, Theme } from "./ThemeContext";
import { ITailwindTheme } from "./types";
import { FunctionComponent, ElementType } from "react";

export type TailwindProps<T extends ElementType> =
  React.ComponentPropsWithoutRef<T> & ITailwindTheme;

export type TailwindComponent<T extends ElementType> = FunctionComponent<
  TailwindProps<T> & { ref?: any }
>;

type JSXElement = {
  [T in keyof JSX.IntrinsicElements]: TailwindComponent<T>;
};

type JSXFactory = {
  <T extends ElementType>(component: T): TailwindComponent<T>;
};

export type StyledFactoryFn = JSXElement & JSXFactory;

const styledFn = (element: any) => {
  const SComponent = React.forwardRef<HTMLAnchorElement, any>((props, ref) => {
    const theme = useThemeContext();
    const { className, rest } = Theme.getClassName(props, theme);

    return React.createElement(
      element,
      { ref, ...rest, className },
      rest.children
    );
  });
  return SComponent;
};

const cache = new Map();

const styledProxy = new Proxy(styledFn, {
  apply(_, __, args) {
    // @ts-ignore
    return styledFn(...args);
  },
  get(_, el) {
    if (!cache.has(el)) {
      cache.set(el, styledFn(el));
    }
    return cache.get(el);
  },
});

export const styled = styledProxy as unknown as StyledFactoryFn;

type IntrinsicElementType = keyof JSX.IntrinsicElements;

export const createElement = (
  element: IntrinsicElementType,
  displayName: string
) => {
  const Component = styled(element);
  Component.displayName = displayName;
  return Component;
};

export function createContext<ContextValueType extends object | null>(
  rootComponentName: string,
  defaultContext?: ContextValueType
) {
  const MyContext = React.createContext<ContextValueType | undefined>(
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
    return <MyContext.Provider value={_value}>{children}</MyContext.Provider>;
  }

  function useContext() {
    const context = React.useContext(MyContext);
    if (context) return context;
    if (defaultContext !== undefined) return defaultContext;
    // if a defaultContext wasn't specified, it's a required context.
    throw new Error(`context must be used within \`${rootComponentName}\``);
  }

  Provider.displayName = rootComponentName + "Provider";
  return [Provider, useContext] as const;
}
