import React from "react";

namespace PrimitiveProps {
  export type DivProps = React.ComponentPropsWithoutRef<"div">;
  export type InputProps = React.ComponentPropsWithoutRef<"input">;
  export type TextAreaProps = React.ComponentPropsWithoutRef<"textarea">;
  export type ButtonProps = React.ComponentPropsWithoutRef<"button">;
  export type LabelProps = React.ComponentPropsWithoutRef<"label">;
  export type FormProps = React.ComponentPropsWithoutRef<"form">;
  export type ImageProps = React.ComponentPropsWithoutRef<"img">;
}

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

export type { PrimitiveProps, LRLocationProps, CornerLocationProps };
