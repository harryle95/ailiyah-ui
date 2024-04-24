import { TailwindProps } from "../context/src";
import React from "react";
import { CornerLocationProps } from "./types";
import * as PrimitiveProps from "./types";

interface BaseBoxProps extends TailwindProps, PrimitiveProps.DivProps {}

interface BaseStateBoxContextValue {
  activeState: boolean;
}

interface BaseStateBoxOwnProps {
  disabled?: boolean;
  initialState?: boolean;
  hoverSetActive?: boolean;
  children: React.ReactNode | ((internalActive: boolean) => React.ReactNode);
}

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
