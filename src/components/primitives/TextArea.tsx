import * as React from "react";
import * as Primitive from "./types";
import { ITailwindTheme } from "../context";
import { createElement, styled } from "../context/factory";
import { CornerLocationProps, LocationMap } from "./types";

/**
 * Renders as div styled with ITailwind parameters.
 * Container of all TextArea components.
 */
const Root = createElement("div", "Root");

/**
 * Renders as div styled with ITailwind parameters
 * Container of TextArea.TextArea and TextArea.Component
 */
const Content = React.forwardRef<
  HTMLDivElement,
  Primitive.DivProps & ITailwindTheme
>((props, ref) => {
  const { children, twPosition = "relative", ...rest } = props;
  return (
    <styled.div {...rest} twPosition={twPosition} ref={ref}>
      {children}
    </styled.div>
  );
});

/**
 * Renders as textarea with ITailwind parameters
 */
const TextArea = createElement("textarea", "TextArea");

interface ComponentProps
  extends Primitive.DivProps,
    ITailwindTheme,
    CornerLocationProps {}

const Component = React.forwardRef<HTMLDivElement, ComponentProps>(
  (props, ref) => {
    const { compLocation, twPosition = "absolute", children, ...rest } = props;
    const twTopRightBottomLeft = rest.twTopRightBottomLeft
      ? rest.twTopRightBottomLeft
      : LocationMap[compLocation];
    return (
      <styled.div
        {...rest}
        ref={ref}
        twTopRightBottomLeft={twTopRightBottomLeft}
        twPosition={twPosition}
      >
        {children}
      </styled.div>
    );
  }
);

export { Root, Content, TextArea, Component };

export type { ComponentProps };
