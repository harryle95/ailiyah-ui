import { TailwindProps } from "./src/tailwind.types";

export interface PresetTheme {
  [key: string]: TailwindProps;
}

export const defaultTheme: PresetTheme = {
  NavBarRoot: {
    twHeight: "h-screen",
    twWidth: "w-fit",
    twFlex: "flex",
    // Padding set to 0 when collapsed (inactive)
    twPadding:
      "pl-4 py-4 data-[state=inactive]:pl-0 data-[state=inactive]:py-0",
    twFlexDirection: "flex-row-reverse",
    twBackgroundColor: "bg-neutral-100 dark:bg-neutral-900",
    // Different text color for active/inactive and light/dark modes
    twTextColor:
      "text-neutral-700 data-[state=active]:text-neutral-500 dark:text-neutral-400 dark:data-[state=active]:text-neutral-300",
  },
  NavBarTrigger: {
    twHeight: "h-full",
    twWidth: "w-fit",
    twPadding: "px-1",
    twFlex: "flex",
    twAlignItems: "items-center",
  },
  NavBarContent: {
    twWidth: "w-[260px]",
    twHeight: "h-full",
    twOverflow: "overflow-auto",
    twFlex: "flex flex-col",
    twGap: "gap-y-5",
  },
  NavBarContentHeader: {
    twFlexShrink: "flex-shrink-0",
    twOrder: "order-1",
  },
  NavBarContentBody: {
    twFlexGrow: "flex-grow",
    twOrder: "order-2",
    twOverflow: "overflow-auto",
    twFlex: "flex flex-col",
    twGap: "gap-y-4",
  },
  NavBarContentFooter: {
    twFlexShrink: "flex-shrink-0",
    twOrder: "order-3",
  },
  NavBarIcons: {
    twWidth: "w-full",
    twHeight: "h-full",
    twOpacity: "opacity-100 hover:opacity-50",
    twStroke: "stroke-neutral-500 dark:stroke-neutral-100", // stroke color based on dark or light mode
  },
  Icons: {
    twWidth: "w-full",
    twHeight: "h-full",
    twOpacity: "opacity-100 hover:opacity-50",
  },
  TooltipPopoverContent: {
    twTextColor: "text-neutral-100 dark:text-neutral-800",
    twBackgroundColor: "bg-gray-900 dark:bg-gray-50",
    twBoxShadow: "shadow-md",
    twBoxShadowColor: "shadow-gray-100 dark:shadow-gray-900",
  },
  TooltipPopoverArrow: {
    twFill: "fill-gray-900 dark:fill-gray-50",
  },
};
