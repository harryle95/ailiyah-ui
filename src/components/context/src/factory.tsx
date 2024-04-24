import * as React from "react";
import { useThemeContext } from "./context";
import { getClassName } from "./tailwind";
import {
  StyledFactoryFn,
  TailwindComponentDefaultProps,
} from "./factory.types";

const styledFn = (component: any, defaultProps?: any) => {
  const SComponent = React.forwardRef<HTMLAnchorElement, any>((props, ref) => {
    const theme = useThemeContext();
    // @ts-ignore
    const { className, children, ...rest } = getClassName(props, theme);
    let _props = defaultProps ? { ...defaultProps, ...rest } : { ...rest };
    return React.createElement(
      component,
      { ref, ..._props, className },
      children
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

const styled = styledProxy as unknown as StyledFactoryFn;

type IntrinsicElementType = keyof React.JSX.IntrinsicElements;

const createElement = <T extends IntrinsicElementType>(
  component: T,
  displayName: string,
  defaultProps?: TailwindComponentDefaultProps<T>
) => {
  const Element = styled(component, defaultProps);
  Element.displayName = displayName;
  return Element;
};

export { styled, createElement };
