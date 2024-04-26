import * as React from "react";
import {
  BaseStateBoxContextValue,
  createStateBox,
  createStateBoxChildren,
  resolveLocation,
} from "@ailiyah-ui/box";
import {
  CornerLocationProps,
} from "@ailiyah-ui/utils";
import { createElement, TailwindComponentProps } from "@ailiyah-ui/factory";

const [Root, useRootContext] = createStateBox("Root", undefined);

const Content = createStateBoxChildren("div", "Content", useRootContext, {twPosition: "relative"})

const Image = createElement("img", "Image", { themeName: "ThumbnailImage" });

const Component = createStateBoxChildren<"div", BaseStateBoxContextValue, CornerLocationProps & TailwindComponentProps<"div">>("div", "Component", useRootContext, {twPosition: "absolute"}, resolveLocation)

export { Root, Content, Image, Component };
