import { createElement } from "@ailiyah-ui/factory";
import { createBox, createLocationBox } from "@ailiyah-ui/box";

/**
 * Renders as div styled with TailwindProps parameters.
 * Container of all TextArea components.
 */
const Root = createBox("Root");

/**
 * Renders as div styled with TailwindProps parameters
 * Container of TextArea.TextArea and TextArea.Component
 */
const Content = createBox("Content", { twPosition: "relative" });

/**
 * Renders as textarea with TailwindProps parameters
 */
const TextArea = createElement("textarea", "TextArea");

const Component = createLocationBox("Component");

export { Root, Content, TextArea, Component };
