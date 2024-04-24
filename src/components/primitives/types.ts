import * as React from "react";

type DivProps = React.ComponentPropsWithoutRef<"div">;
type InputProps = React.ComponentPropsWithoutRef<"input">;
type TextAreaProps = React.ComponentPropsWithoutRef<"textarea">;
type ButtonProps = React.ComponentPropsWithoutRef<"button">;
type LabelProps = React.ComponentPropsWithoutRef<"label">;
type FormProps = React.ComponentPropsWithoutRef<"form">;
type ImageProps = React.ComponentPropsWithoutRef<"img">;

interface LRLocationProps {
  compLocation: "left" | "right";
}

interface CornerLocationProps {
  compLocation: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}

const LocationMap = {
  "top-left": "top-0 left-0",
  "top-right": "top-0 right-0",
  "bottom-left": "bottom-0 left-0",
  "bottom-right": "bottom-0 right-0",
};

export { LocationMap };

export type {
  DivProps,
  InputProps,
  TextAreaProps,
  ButtonProps,
  LabelProps,
  FormProps,
  ImageProps,
  LRLocationProps,
  CornerLocationProps,
};
