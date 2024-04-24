import * as React from "react";
import { createStateBox } from "../../primitives/Box";
import { PrimitiveProps } from "../../primitives/";
import { ITailwindTheme } from "../../context";
import { styled } from "../../context";
import { CornerLocationProps, LocationMap } from "../../primitives/types";
import { createElement } from "../../context/factory";

const [Root, useRootContext] = createStateBox("Root", undefined);

const Content = createElement("div", "Content");

const Image = React.forwardRef<
  HTMLImageElement,
  PrimitiveProps.ImageProps & ITailwindTheme
>((props, ref) => {
  return <styled.img {...props} ref={ref} themeName="ThumbnailImage" />;
});

const Component = React.forwardRef<
  HTMLDivElement,
  CornerLocationProps & PrimitiveProps.DivProps & ITailwindTheme
>((props, ref) => {
  const { compLocation, children, twPosition = "absolute", ...rest } = props;
  const twTopRightBottomLeft = rest.twTopRightBottomLeft
    ? rest.twTopRightBottomLeft
    : LocationMap[compLocation];
  const { activeState } = useRootContext();
  return (
    <styled.div
      {...rest}
      ref={ref}
      twTopRightBottomLeft={twTopRightBottomLeft}
      data-state={activeState}
      themeName="ThumbnailComponent"
      twPosition={twPosition}
    >
      {children}
    </styled.div>
  );
});

export { Root, Content, Image, Component };
