import * as React from "react";
import { createBox } from "../../primitives/Box";
import { PrimitiveProps } from "../../primitives/";
import { ITailwindTheme } from "../../context";
import { styled } from "../../context";

const [Root, useBoxContext] = createBox("Root", null, {
  twPosition: "relative",
});

const Image = React.forwardRef<
  HTMLImageElement,
  PrimitiveProps.ImageProps & ITailwindTheme
>((props, ref) => {
  return <styled.img {...props} ref={ref} />;
});

