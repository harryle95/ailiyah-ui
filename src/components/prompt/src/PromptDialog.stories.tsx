import { PromptDialog } from "./PromptDialog.helper";
import { Meta, StoryObj } from "@storybook/react";
import { ThemeProvider } from "@ailiyah-ui/context";
import { theme } from "./theme";
import React from "react";

const meta: Meta<typeof PromptDialog> = {
  component: PromptDialog,
  title: "PromptDialog",
  decorators: [
    (Story) => (
      <ThemeProvider value={theme}>
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default meta 

type Story = StoryObj<typeof PromptDialog>;

const Default: Story = {};

export { Default };
