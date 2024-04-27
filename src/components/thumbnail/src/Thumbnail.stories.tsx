import { Meta, StoryObj } from "@storybook/react";
import { userEvent, within, expect } from "@storybook/test";
import * as Thumbnail from "./Thumbnail";
import * as Button from "@ailiyah-ui/button";
import React from "react";
import { styled } from "@ailiyah-ui/factory";

export function TestComponent() {
  return (
    <Thumbnail.Root initialState={false} title="thumbnail">
      <Thumbnail.Content twPadding="pb-6">
        <Thumbnail.Image
          src="/testImage.jpeg"
          twAspectRatio="aspect-square"
          twWidth="w-full"
          twHeight="h-full"
        />
        <Thumbnail.Component
          compLocation="bottom-right"
          twDisplay="hidden data-[state=active]:flex"
          title="button-group"
        >
          <Button.EditButton title="edit-button" />
          <Button.DeleteButton title="delete-button" />
        </Thumbnail.Component>
      </Thumbnail.Content>
    </Thumbnail.Root>
  );
}

const meta: Meta<typeof TestComponent> = {
  title: "Thumbnail",
  component: TestComponent,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <styled.div twWidth="w-[500px]" twHeight="h-[500px]">
        <Story />
      </styled.div>
    ),
  ],
};

export default meta;
