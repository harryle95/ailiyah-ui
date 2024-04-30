import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { styled } from "@ailiyah-ui/factory";
import { mockImage, replacementMockImage } from "./PromptElement.helper";
import { PromptForm } from "./Prompt.helper";
import { ThemeProvider } from "@ailiyah-ui/context";
import { theme } from "./theme";

const meta: Meta<typeof PromptForm> = {
  title: "Prompt",
  component: PromptForm,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <styled.div twWidth="w-[600px]" twHeight="h-[600px]">
        <ThemeProvider value={theme}>
          <Story />
        </ThemeProvider>
      </styled.div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof PromptForm>;

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
