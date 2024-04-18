import * as React from "react";
import {
  DoubleArrowLeftIcon as LeftIcon,
  DoubleArrowRightIcon as RightIcon,
} from "@radix-ui/react-icons";
import * as PNavBar from "../primitives/NavBar";
import { Tooltip } from "@radix-ui/themes";
import { styled } from "../context/factory";

export function NavBar() {
  const SLeftIcon = styled(LeftIcon);
  const SRightIcon = styled(RightIcon);

  const leftIcon = (
    <Tooltip content="Collapse">
      <div>
        <SLeftIcon
          themeName="icons"
          twPadding="p-0"
          twTopRightBottomLeft="top-1/2"
        />
      </div>
    </Tooltip>
  );

  const rightIcon = (
    <Tooltip content="Expand">
      <div>
        <SRightIcon
          themeName="icons"
          twPadding="p-0"
          twTopRightBottomLeft="top-1/2"
        />
      </div>
    </Tooltip>
  );
  
  return (
    <div className="flex">
      <PNavBar.Root
        twBackgroundColor="bg-black"
        twHeight="h-screen"
        twWidth="w-fit"
        twFlex="flex"
        twFlexDirection="flex-row-reverse"
        twBorderRadius="rounded-r-md"
      >
        <PNavBar.Trigger
          twHeight="h-full"
          twWidth="w-fit"
          twTextColor="text-gray-500"
          twBackgroundColor="bg-gray-300"
          twBorderRadius="rounded-r-md"
          twFlex="flex"
          twAlignItems="items-center"
        >
          {(state) => (state ? leftIcon : rightIcon)}
        </PNavBar.Trigger>

        <PNavBar.Content
          twWidth="w-[260px]"
          twHeight="h-full"
        ></PNavBar.Content>
      </PNavBar.Root>
    </div>
  );
}
