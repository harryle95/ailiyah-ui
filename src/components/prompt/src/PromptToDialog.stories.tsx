import { TextArea } from "@ailiyah-ui/text";
import React from "react";
import { SubmitButton } from "@ailiyah-ui/button";
import { PromptDialog } from "./PromptDialog.helper";
import { Meta, StoryObj } from "@storybook/react";
import { styled } from "@ailiyah-ui/factory";
import { ThemeProvider } from "@ailiyah-ui/context";
import { theme } from "./theme";

const TextAreaToPromptDialog: React.FC<{
  initPrompt: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}> = ({ initPrompt, onClick = () => {} }) => {
  const [prompt, setPrompt] = React.useState<string>(() => initPrompt);
  const isDisabled = prompt === "" || prompt === initPrompt;
  return (
    <TextArea.Root themeName="TextAreaRoot">
      <TextArea.Content themeName="TextAreaContent">
        <TextArea.TextArea
          name="prompt"
          placeholder={prompt}
          value={prompt}
          onChange={(e) => setPrompt(e.currentTarget.value)}
          themeName="TextAreaTextArea"
        />
        <TextArea.Component twTopRightBottomLeft="bottom-1 right-4">
          <PromptDialog />
          <SubmitButton
            disabled={isDisabled}
            onClick={onClick}
            themeName="TextAreaSubmitButton"
          />
        </TextArea.Component>
      </TextArea.Content>
    </TextArea.Root>
  );
};

const meta: Meta<typeof TextAreaToPromptDialog> = {
  title: "TextAreToPromptDialog",
  component: TextAreaToPromptDialog,
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

type Story = StoryObj<typeof TextAreaToPromptDialog>;

export const Default: Story = {};
