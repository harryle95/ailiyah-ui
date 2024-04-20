import * as Text from "../components/primitives/TextBox";
import * as React from "react";
import { DeleteButton } from "../components/built/Buttons";
import { ScrollArea } from "@radix-ui/themes";
import { List } from "@radix-ui/themes/src/components/tabs.js";
import * as Button from "../components/built/Buttons";
import { styled } from "../components/context/factory";

function ListItem({ children, activeState = false }) {
  return (
    <Text.Root
      activeState={activeState}
      hoverSetActive={true}
      twBorderWidth="data-[state=active]:border-2"
      twBorderColor="data-[state=active]:border-slate-400"
      twTextColor="text-gray-800 data-[state=active]:text-white"
      twBackgroundColor="data-[state=active]:bg-slate-400"
      twBorderRadius="rounded-md"
      twPadding="px-2"
    >
      <styled.div twPosition="relative" twWidth="w-full" twHeight="h-full">
        <Text.Content>{children}</Text.Content>

        <Text.Component
          compLocation="right"
          twPosition="absolute"
          twHeight="max-h-full"
          twTopRightBottomLeft="top-0 bottom-0 right-0"
          twWidth="w-8 data-[state=active]:w-20"
          twGradientColorStops="from-slate-500 data-[state=active]:from-slate-400 from-60%"
          twBackgroundColor="bg-gradient-to-l"
        ></Text.Component>

        <Text.Component
          compLocation="right"
          twDisplay="hidden data-[state=active]:flex"
          twPosition="absolute"
          twTopRightBottomLeft="top-0 bottom-0 right-0"
        >
          <Button.InvisibleButtonGroup
            twFlex="flex"
            twPadding="py-1"
            twGap="gap-x-1"
          >
            <Button.EditButton twHeight="h-full" tooltipContent="Edit" />
            <Button.DeleteButton twHeight="h-full" tooltipContent="Delete" />
          </Button.InvisibleButtonGroup>
        </Text.Component>
      </styled.div>
    </Text.Root>
  );
}

/**
 * Text box with delete button that appears when hovered over and gradient masking at the end
 * @returns
 */
function Demo() {
  return (
    <div className="flex flex-col h-screen w-[256px] border rounded-lg bg-slate-500 items-center justify-center p-3 gap-y-4">
      <ListItem activeState={true}>
        <a href="#">New Project</a>
      </ListItem>
      <ListItem>
        <a href="#">
          This Project has a very long name that cannot be displayed on the
          screen correctly
        </a>
      </ListItem>
    </div>
  );
}

export { Demo };
