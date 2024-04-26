import React from "react";
import { TooltipProps } from "@radix-ui/react-tooltip";
import { TailwindProps } from "@ailiyah-ui/utils";
import { PrimitiveProps } from "./types";

interface UploadContextValue {
  /** input component id -> for upload button */
  id?: string;
  /**
   * Handler for when file is uploaded. Use-case: showing thumbnail when a file is uploaded
   */
  onFileUploaded?: React.ChangeEventHandler<HTMLInputElement>;
  /**
   * Handler for when file is removed. Use-case: clicking x button to remove thumbnail
   */
  onFileRemoved?: React.MouseEventHandler<HTMLButtonElement>;
}

interface UploadRootProps
  extends Omit<PrimitiveProps.InputProps, "type" | "children">,
    UploadContextValue {
  children:
    | React.ReactNode
    | ((context: UploadContextValue) => React.ReactNode);
}

interface UploadTriggerProps
  extends PrimitiveProps.LabelProps,
    Omit<TooltipProps, "children">,
    TailwindProps {
  tooltipContent?: string;
}

export type { UploadContextValue, UploadRootProps, UploadTriggerProps };
