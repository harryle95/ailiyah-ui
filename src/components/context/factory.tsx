import * as React from "react";
import { useThemeContext, Theme } from "./ThemeContext";
import { TailwindProps } from "./tailwind.types";
import { FunctionComponent, ElementType } from "react";

type TailwindProps<T extends ElementType> = React.ComponentPropsWithoutRef<T> &
  TailwindProps;

export type TailwindComponent<T extends ElementType> = FunctionComponent<
  TailwindProps<T> & { ref?: any }
>;

type JSXElement = {
  [T in keyof JSX.IntrinsicElements]: TailwindComponent<T>;
};

type JSXFactory = {
  <T extends ElementType>(
    component: T,
    defaultProps?: Omit<TailwindProps, "children">
  ): TailwindComponent<T>;
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