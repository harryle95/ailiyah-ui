import * as React from "react";
import {
  BaseStateBoxContextValue,
  createStateBox,
  createStateBoxChildren,
} from "@ailiyah-ui/box";
import {
  TailwindProps,
  PrimitiveProps,
  CornerLocationProps,
  LocationMap,
} from "@ailiyah-ui/utils";
import { styled, createElement } from "@ailiyah-ui/factory";

const [Root, useRootContext] = createStateBox("Root", undefined);

const Content = createElement("div", "Content", { twPosition: "relative" });

const Image = createElement("img", "Image", { themeName: "ThumbnailImage" });

const Component = React.forwardRef<
  HTMLDivElement,
  CornerLocationProps & PrimitiveProps.DivProps & TailwindProps
>((props, ref) => {
  const {
    compLocation = "top-right",
    children,
    twPosition = "absolute",
    ...rest
  } = props;
  const twTopRightBottomLeft = rest.twTopRightBottomLeft
    ? rest.twTopRightBottomLeft
    : LocationMap[compLocation];
  const { activeState } = useRootContext();
  return (
    <styled.div
      {...rest}
      ref={ref}
      twTopRightBottomLeft={twTopRightBottomLeft}
      data-state={activeState?"active":"inactive"}
      themeName="ThumbnailComponent"
      twPosition={twPosition}
    >
      {children}
    </styled.div>
  );
});

export { Root, Content, Image, Component };
