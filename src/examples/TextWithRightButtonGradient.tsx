import * as Text from "../components/primitives/TextBox";
import * as React from "react";
import { DeleteButton } from "../components/built/Buttons";

/**
 * Text box with delete button that appears when hovered over and gradient masking at the end
 * @returns
 */
function Demo() {
  return (
    <div className="flex h-screen w-[256px] mx-auto border rounded-lg bg-slate-500 items-center justify-center p-3">
      <Text.Root
        activeState={false}
        hoverSetActive={true}
        twBorderWidth="border-2"
        twTextColor="text-gray-600 data-[state=active]:text-white"
        twBackgroundColor="bg-white data-[state=active]:bg-slate-500"
        twBorderRadius="rounded-md"
        twPosition="relative"
      >
        <Text.Content twPadding="px-2">
          Long Text that will not be fully displayed and will be clipped
        </Text.Content>

        <Text.Component
          compLocation="right"
          twPosition="absolute"
          twHeight="max-h-full"
          twTopRightBottomLeft="top-0 bottom-0 right-0"
          twWidth="w-8 data-[state=active]:w-20"
          twGradientColorStops="from-white data-[state=active]:from-slate-500 from-60%"
          twBackgroundColor="bg-gradient-to-l"
        >
          <div></div>
        </Text.Component>

        <Text.Component
          compLocation="right"
          twDisplay="hidden data-[state=active]:flex"
          twPosition="absolute"
          twTopRightBottomLeft="top-0 bottom-0 right-0"
        >
          <DeleteButton
            tooltipContent="Delete"
            themeName="icons"
            twPadding="p-1"
          />
        </Text.Component>
      </Text.Root>
    </div>
  );
}

export { Demo };
