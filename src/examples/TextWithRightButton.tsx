import * as Text from "../components/primitives/TextInput";
import * as React from "react";
import {Button} from "../components/themed"

/**
 * Text box with delete button that appears when hovered
 * @returns 
 */
function Demo() {
  return (
    <div className="flex h-screen w-[256px] mx-auto border rounded-lg bg-slate-500 items-center justify-center p-3">
      <Text.Root
        activeState={false}
        hoverSetActive={true}
        twBorderWidth="border-2"
        twBackgroundColor="bg-white data-[state=active]:bg-slate-200"
        twBorderRadius="rounded-md"
      >
        <Text.Content twPadding="px-2">
          Long Text that will not be fully displayed and will be clipped
        </Text.Content>
        <Text.Component compLocation="right" twDisplay="hidden data-[state=active]:flex">
          <Button.DeleteButton tooltipContent="Delete" themeName="Icons" twPadding="p-0" />
        </Text.Component>
      </Text.Root>
    </div>
  );
}

export { Demo };
