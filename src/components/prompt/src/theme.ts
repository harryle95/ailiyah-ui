import { defaultTheme } from "@ailiyah-ui/utils";
import { PresetTheme } from "@ailiyah-ui/utils";

export const theme: PresetTheme = {
  ...defaultTheme,
  PromptRoot: {
    twHeight: "h-full",
    twWidth: "w-full",
    twFlex: "flex",
    twFlexDirection: "flex-col",
    twJustifyContent: "justify-between",
  },
  PromptContent: {
    twFlex: "flex",
    twFlexDirection: "flex-col",
    twGap: "gap-y-4",
    twFlexGrow: "flex-grow",
    twOverflow: "overflow-y-auto",
    twOther: "scrollbar-thin",
    twPadding: "p-4",
  },
  PromptButtonGroup: {
    twFlexShrink: "flex-shrink-0",
  },
  PromptElementRoot: {
    twWidth: "w-full",
    twHeight: "h-full",
    twPadding: "pb-6",
  },
  PromptElementContent: {
    twFlex: "flex",
    twGap: "gap-x-4",
  },
  PromptElementTextArea: {
    twFlexGrow: "flex-grow",
    twBorderWidth: "border-2",
    twBorderRadius: "rounded-md",
    twPadding: "p-4",
  },
  PromptElementThumbnailRoot: {
    twFlexShrink: "flex-shrink-0",
  },
  PromptElementButtonGroup: {
    twDisplay: "hidden data-[state=active]:flex",
  },
  ThumbnailContent: {
    twPadding: "pb-6",
    twWidth: "w-[200px]",
    twHeight: "h-[200px]",
    twFlex: "flex",
    twAlignItems: "items-center",
    twJustifyContent: "justify-center",
    twBorderWidth: "data-[state=active]:border-2",
  },
  ThumbnailCanvas: {
    twMaxWidth: "max-w-full",
    twMaxHeight: "max-h-full",
    twObjectFit: "object-contain",
    twFontWeight: "font-bold",
    twFontSize: "text-2xl",
  },
  ThumbnailButtonGroup: {
    twDisplay: "hidden data-[state=active]:flex",
    twGap: "gap-x-4",
  },
};
