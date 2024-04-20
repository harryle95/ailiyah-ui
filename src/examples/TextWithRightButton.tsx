import * as Text from "../components/primitives/TextBox";
import * as React from "react";
import { DeleteIcon } from "../components/built/Buttons";

function Demo() {
  return (
    <div className="flex h-screen w-[256px] mx-auto border rounded-lg bg-slate-500 items-center justify-center p-3">
      <Text.Root
        activeState={true}
        hoverSetActive={true}
        twBorderWidth="border-2"
        twBackgroundColor="bg-white"
        twBorderRadius="rounded-md"
      >
        <Text.Content twPadding="px-2">
          Long Text that will not be fully displayed and will be clipped
        </Text.Content>
        <Text.Component compLocation="right" twBorderWidth="border-l-2">
          <DeleteIcon themeName="icons" />
        </Text.Component>
      </Text.Root>
    </div>
  );
}

export { Demo };
