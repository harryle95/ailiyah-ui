import * as React from "react";
import { createStateBox } from "../../primitives/Box";
import { PrimitiveProps } from "../../primitives/";
import { TailwindProps } from "@ailiyah-ui/utils";
import { styled } from "@ailiyah-ui/factory";
import { CornerLocationProps, LocationMap } from "../../primitives/types";
import { createElement } from "@ailiyah-ui/factory";

const [Root, useRootContext] = createStateBox("Root", undefined);

const Content = createElement("div", "Content");

const Image = React.forwardRef<
  HTMLImageElement,
  PrimitiveProps.ImageProps & TailwindProps
>((props, ref) => {
  return <styled.img {...props} ref={ref} themeName="ThumbnailImage" />;
});

const Component = React.forwardRef<
  HTMLDivElement,
  CornerLocationProps & PrimitiveProps.DivProps & TailwindProps
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
