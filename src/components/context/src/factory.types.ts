import { TailwindProps } from "./tailwind.types";
import { ElementType, FunctionComponent } from "react";

type TailwindComponentProps<T extends ElementType> =
  React.ComponentPropsWithoutRef<T> & TailwindProps;

type TailwindComponent<T extends ElementType> = FunctionComponent<
  TailwindComponentProps<T> & { ref?: any }
>;

type JSXElement = {
  [T in keyof JSX.IntrinsicElements]: TailwindComponent<T>;
};

type TailwindComponentDefaultProps<T extends ElementType> = Omit<
  TailwindComponentProps<T>,
  "children"
>;

type JSXFactory = {
  <T extends ElementType>(
    component: T,
    defaultProps?: TailwindComponentDefaultProps<T>
  ): TailwindComponent<T>;
};

type StyledFactoryFn = JSXElement & JSXFactory;

export type {
  StyledFactoryFn,
  TailwindComponentProps,
  TailwindComponent,
  TailwindComponentDefaultProps,
};
