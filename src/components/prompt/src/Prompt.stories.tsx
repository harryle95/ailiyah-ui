import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Prompt } from "./Prompt";
import { ThemeProvider } from "@ailiyah-ui/context";
import { theme } from "./theme";
import { styled } from "@ailiyah-ui/factory";
import { mockImage, replacementMockImage } from "./PromptElement.helper";
import { FormDataType, StateType } from "./Prompt.types";

function TestComponent({
  initialFormData,
  editing,
}: {
  initialFormData: FormDataType;
  editing: boolean;
}) {
  return (
    <ThemeProvider value={theme}>
      <Prompt initialFormData={initialFormData} editing={editing} />
    </ThemeProvider>
  );
}

const meta: Meta<typeof TestComponent> = {
  title: "Prompt",
  component: TestComponent,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <styled.div twWidth="w-[600px]" twHeight="h-[600px]">
        <Story />
      </styled.div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof TestComponent>;

export const Default: Story = {};

// @ts-ignore
let firstImage = await mockImage();
// @ts-ignore
let secondImage = await replacementMockImage();

export const InitWithDataDisabled: Story = {
  args: {
    initialFormData: {
      0: { thumbnail: firstImage, prompt: "Hello World" },
      1: { thumbnail: secondImage, prompt: "Greetings" },
    },
    editing: false,
  },
};

export const InitWithDataEnabled: Story = {
  args: {
    initialFormData: {
      0: { thumbnail: firstImage, prompt: "Hello World" },
      1: { thumbnail: secondImage, prompt: "Greetings" },
    },
    editing: true,
  },
};

export const InitWithImageAndNoImage: Story = {
  args: {
    initialFormData: {
      0: { thumbnail: firstImage, prompt: "Hello World" },
      1: { thumbnail: undefined, prompt: "Greetings" },
    },
    editing: true,
  },
};
