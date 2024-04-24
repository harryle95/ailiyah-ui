import { createElement } from "../context/factory";
import { createBox, createLocationBox } from "./Box";

/**
 * Renders as div styled with ITailwind parameters.
 * Container of all TextArea components.
 */
const Root = createElement("div", "Root");

/**
 * Renders as div styled with ITailwind parameters
 * Container of TextArea.TextArea and TextArea.Component
 */
const Content = createBox("Content", { twPosition: "relative" });

/**
 * Renders as textarea with ITailwind parameters
 */
const TextArea = createElement("textarea", "TextArea");

const Component = createLocationBox("Component");

export { Root, Content, TextArea, Component };
