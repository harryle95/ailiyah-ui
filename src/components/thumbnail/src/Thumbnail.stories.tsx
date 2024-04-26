import { Meta, StoryObj } from "@storybook/react";
import * as Thumbnail from "./Thumbnail";
import * as Button from "@ailiyah-ui/button";
import React from "react";
import { styled } from "@ailiyah-ui/factory";

function TestComponent() {
  return (
    <Thumbnail.Root initialState={false}>
      <Thumbnail.Content twPadding="pb-6">
        <Thumbnail.Image
          src="https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?cs=srgb&dl=pexels-valeriya-1805164.jpg&fm=jpg"
          twAspectRatio="aspect-square"
          twWidth="w-11"
          twHeight="h-11"
        />
        <Thumbnail.Component compLocation="bottom-right" twDisplay="hidden data-[state=active]:flex">
          <Button.EditButton />
          <Button.DeleteButton />
        </Thumbnail.Component>
      </Thumbnail.Content>
    </Thumbnail.Root>
  );
}

const meta: Meta<typeof TestComponent> = {
  component: TestComponent,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <styled.div
        twWidth="w-fit"
        twHeight="h-fit"
        twFlex="flex"
        twJustifyContent="justify-center"
        twAlignItems="items-center"
      >
        <Story />
      </styled.div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof TestComponent>;

export const Default: Story = {
};
