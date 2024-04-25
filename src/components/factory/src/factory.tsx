import * as React from "react";
import { useThemeContext } from "@ailiyah-ui/context";
import {getClassName} from "@ailiyah-ui/utils";

import {
  StyledFactoryFn,
  TailwindComponentDefaultProps,
} from "./factory.types";

const styledFn = (component: any, defaultProps?: any) => {
  const SComponent = React.forwardRef<HTMLAnchorElement, any>((props, ref) => {
    const theme = useThemeContext();
    // @ts-ignore
    const { children, ...rest } = props;
    const propsWithDefault = {...defaultProps, ...rest}
    const { className, ...other } = getClassName(propsWithDefault, theme);
    return React.createElement(
      component,
      { ref, ...other, className },
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
