import * as React from "react";
import * as Primitive from "./types";
import { createContext } from "../context";
import { ITailwindTheme } from "../context";
import { styled } from "../context";

interface BaseBoxContextValue {
  activeState: "active" | "inactive";
}

interface BaseBoxOwnProps {
  activeState?: boolean;
  hoverSetActive?: boolean;
  children: React.ReactNode | ((internalActive: boolean) => React.ReactNode);
}

interface BaseBoxProps
  extends BaseBoxOwnProps,
    ITailwindTheme,
    Omit<Primitive.DivProps, "children"> {}

function createBox<
  ContextValueType extends BaseBoxContextValue | null,
  BoxProps extends BaseBoxProps
>(
  componentName: string,
  defaultContext?: ContextValueType,
  defaultProps?: ITailwindTheme
) {
  const [BoxProvider, useTextBoxContext] = createContext<ContextValueType>(
    componentName,
    defaultContext
  );

  const Root = React.forwardRef<HTMLDivElement, BoxProps>((props, ref) => {
    const {
      activeState = true,
      hoverSetActive = true,
      children,
      onMouseEnter,
      onMouseLeave,
      ...rest
    } = props;
    const [internalActive, setInternalActive] = React.useState(false);
    const hoverOn = (e: React.MouseEvent<HTMLDivElement>) => {
      onMouseEnter && onMouseEnter(e);
      if (hoverSetActive) {
        setInternalActive(true);
      }
    };
    const hoverOff = (e: React.MouseEvent<HTMLDivElement>) => {
      onMouseLeave && onMouseLeave(e);
      if (hoverSetActive) {
        setInternalActive(false);
      }
    };
    const dataState = activeState || internalActive ? "active" : "inactive";
    return (
      <BoxProvider value={{activeState: dataState} as unknown as ContextValueType}>
        <styled.div
          {...defaultProps}
          onMouseEnter={hoverOn}
          onMouseLeave={hoverOff}
          {...rest}
          ref={ref}
          data-state={dataState}
        >
          {typeof children === "function"
            ? children(activeState || internalActive)
            : children}
        </styled.div>
      </BoxProvider>
    );
  });
  return [Root, useTextBoxContext] as const;
}

export { createBox };
export type { BaseBoxProps, BaseBoxContextValue };
