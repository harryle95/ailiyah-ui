import * as React from "react";
import * as Primitive from "./types";
import { createContext } from "../context";
import { TailwindProps } from "../context";
import { styled } from "../context";
import { CornerLocationProps, LocationMap } from "./types";

/*************************************************************************************************************************************
 * State Box
 *************************************************************************************************************************************
 */

interface BaseStateBoxContextValue {
  activeState: "active" | "inactive";
}

interface BaseStateBoxOwnProps {
  disabled?: boolean;
  activeState?: boolean;
  hoverSetActive?: boolean;
  children: React.ReactNode | ((internalActive: boolean) => React.ReactNode);
}

interface BaseStateBoxProps
  extends BaseStateBoxOwnProps,
    TailwindProps,
    Omit<Primitive.DivProps, "children"> {}

function createStateBox<
  ContextValueType extends BaseStateBoxContextValue,
  StateBoxProps extends BaseStateBoxProps
>(
  componentName: string,
  defaultContext?: ContextValueType,
  defaultProps?: Omit<StateBoxProps, "children">
) {
  const [StateBoxProvider, useStateBoxContext] =
    createContext<ContextValueType>(componentName, defaultContext);

  const Root = React.forwardRef<HTMLDivElement, StateBoxProps>((props, ref) => {
    const {
      activeState = true,
      hoverSetActive = true,
      disabled = false,
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
    const dataState =
      (activeState || internalActive) && !disabled ? "active" : "inactive";
    return (
      <StateBoxProvider
        value={{ activeState: dataState } as unknown as ContextValueType}
      >
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
      </StateBoxProvider>
    );
  });
  return [Root, useStateBoxContext] as const;
}

/*************************************************************************************************************************************
 * Base Box
 *************************************************************************************************************************************
 */
interface BaseBoxProps extends TailwindProps, Primitive.DivProps {}

function createBox<BoxProps extends BaseBoxProps>(
  componentName: string,
  defaultProps?: Omit<BoxProps, "children">
) {
  const Root = React.forwardRef<HTMLDivElement, BoxProps>((props, ref) => {
    const { children, ...rest } = props;

    return (
      <styled.div {...defaultProps} {...rest} ref={ref}>
        {children}
      </styled.div>
    );
  });
  Root.displayName = componentName;
  return Root;
}

/*************************************************************************************************************************************
 * Location Box
 *************************************************************************************************************************************
 */
interface BaseLocationBoxProps extends BaseBoxProps, CornerLocationProps {}

function createLocationBox<BoxProps extends BaseLocationBoxProps>(
  componentName: string,
  defaultProps?: Omit<BoxProps, "children">
) {
  const Root = React.forwardRef<HTMLDivElement, BoxProps>((props, ref) => {
    const {
      children,
      compLocation,
      twPosition = "absolute",
      twTopRightBottomLeft,
      ...rest
    } = props;
    let location = twTopRightBottomLeft
      ? twTopRightBottomLeft
      : LocationMap[compLocation];

    return (
      <styled.div
        {...defaultProps}
        {...rest}
        ref={ref}
        twTopRightBottomLeft={location}
        twPosition={twPosition}
      >
        {children}
      </styled.div>
    );
  });
  Root.displayName = componentName;
  return Root;
}

/*************************************************************************************************************************************
 * Export
 *************************************************************************************************************************************
 */
export { createStateBox, createBox, createLocationBox };
export type {
  BaseStateBoxProps,
  BaseStateBoxContextValue,
  BaseBoxProps,
  BaseLocationBoxProps,
};
