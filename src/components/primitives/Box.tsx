import * as React from "react";
import {
  BaseBoxProps,
  BaseLocationBoxProps,
  BaseStateBoxContextValue,
  BaseStateBoxProps,
} from "./Box.types";
import { createContext, createElement } from "../context/src";
import { styled } from "../context/src";
import { LocationMap } from "./types";

function getState(value: boolean): "active" | "inactive" {
  return value ? "active" : "inactive";
}

/*************************************************************************************************************************************
 * State Box
 *************************************************************************************************************************************
 */
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
  const Div = styled("div", defaultProps);

  const Root = React.forwardRef<HTMLDivElement, StateBoxProps>((props, ref) => {
    const {
      initialState = true,
      hoverSetActive = true,
      disabled = false,
      children,
      onMouseEnter,
      onMouseLeave,
      ...rest
    } = props;
    const [internalState, setInternalState] = React.useState(false);
    const hoverOn = (e: React.MouseEvent<HTMLDivElement>) => {
      onMouseEnter && onMouseEnter(e);
      if (hoverSetActive) {
        setInternalState(true);
      }
    };
    const hoverOff = (e: React.MouseEvent<HTMLDivElement>) => {
      onMouseLeave && onMouseLeave(e);
      if (hoverSetActive) {
        setInternalState(false);
      }
    };
    const dataState = initialState || internalState;
    return (
      <StateBoxProvider
        value={{ activeState: dataState } as unknown as ContextValueType}
      >
        <Div
          onMouseEnter={hoverOn}
          onMouseLeave={hoverOff}
          {...rest}
          ref={ref}
          data-state={getState(dataState)}
        >
          {typeof children === "function" ? children(dataState) : children}
        </Div>
      </StateBoxProvider>
    );
  });
  return [Root, useStateBoxContext] as const;
}

/*************************************************************************************************************************************
 * Base Box
 *************************************************************************************************************************************
 */
const createBox = (componentName: string, defaultProps?: BaseBoxProps) =>
  createElement("div", componentName, defaultProps);

/*************************************************************************************************************************************
 * Location Box
 *************************************************************************************************************************************
 */

function createLocationBox<BoxProps extends BaseLocationBoxProps>(
  componentName: string,
  defaultProps?: Omit<BoxProps, "children">
) {
  const Div = styled("div", defaultProps);
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
      <Div
        {...rest}
        ref={ref}
        twTopRightBottomLeft={location}
        twPosition={twPosition}
      >
        {children}
      </Div>
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
