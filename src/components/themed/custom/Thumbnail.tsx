import * as React from "react";
import { PrimitiveProps } from "../../primitives";
import { ITailwindTheme } from "../../context";
import { createBox } from "../../primitives/Box";

const [Root, useBoxContext] = createBox("Root", null, { twPosition: "relative" });
