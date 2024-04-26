import { TailwindProps } from "@ailiyah-ui/utils";
import React from "react";
import { CornerLocationProps } from "./types";
import { PrimitiveProps } from "./types";

interface BaseBoxProps extends TailwindProps, PrimitiveProps.DivProps {}

/**
 * @param activeState - box state
 */
interface BaseStateBoxContextValue {
  /** Box state to be displayed on data-state. If true: active, else inactive */
  activeState: boolean;
}

interface BaseStateBoxOwnProps {
  disabled?: boolean;
  initialState?: boolean;
  hoverSetActive?: boolean;
  children: React.ReactNode | ((internalActive: boolean) => React.ReactNode);
}

/**
 * @param disabled - whether state information is disabled
 * @param initialState - external state could be inherited from parents
 * @param hoverSetActive - whether hovering set internal state to active
 */
interface BaseStateBoxProps
  extends BaseStateBoxOwnProps,
    TailwindProps,
    Omit<PrimitiveProps.DivProps, "children"> {}

interface BaseLocationBoxProps extends BaseBoxProps, CornerLocationProps {}

export type {
  BaseBoxProps,
  BaseStateBoxContextValue,
  BaseStateBoxOwnProps,
  BaseStateBoxProps,
  BaseLocationBoxProps,
};
