import { Meta, StoryObj } from "@storybook/react";
import { PresetTheme, defaultTheme } from "@ailiyah-ui/utils";
import { ThemeProvider } from "@ailiyah-ui/context";
import { UserEvent, within, expect } from "@storybook/test";
import React from "react";
import { PromptElement } from "./PromptElement";
import { PromptDataType } from "./PromptElement.types";
import { styled } from "@ailiyah-ui/factory";

const InitialFormData: PromptDataType = {
  0: {},
  1: {},
  2: {},
};

function TestComponent({
  initialEditing,
  initialFormData,
  value,
}: {
  initialEditing: boolean;
  initialFormData: PromptDataType;
  value?: PresetTheme;
}) {
  const [formData, setFormData] = React.useState(initialFormData);
  const [editing, setEditing] = React.useState(() => initialEditing);
  const promptId = "1";
  console.log(formData);
  return (
    <ThemeProvider value={value}>
      <PromptElement
        editing={editing}
        formData={formData[promptId]}
        setEditing={setEditing}
        setFormData={setFormData}
        promptId={promptId}
      />
    </ThemeProvider>
  );
}

const meta: Meta<typeof TestComponent> = {
  title: "PromptElement",
  component: TestComponent,
  tags: ["autodocs"],
  parameters: {
    initialEditing: { default: true, type: "boolean" },
    initialFormData: { default: InitialFormData, type: "PromptDataType" },
    value: {
      default: defaultTheme,
    },
  },
  decorators: [
    (Story) => (
      <styled.div twWidth="w-full" twHeight="h-full">
        <Story />
      </styled.div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof TestComponent>;

export const Default: Story = {
  args: {
    initialEditing: true,
    initialFormData: InitialFormData,
    value: {
      ...defaultTheme,
      PromptElementRoot: {
        twWidth: "w-full",
        twHeight: "h-full",
      },
      PromptElementContent: {
        twFlex: "flex",
        twGap: "gap-x-4",
      },
      PromptElementTextArea: {
        twFlexGrow: "flex-grow",
        twBorderWidth: "border-2",
        twBorderRadius: "rounded-md",
        twPadding: "p-4",
      },
      PromptElementUploadThumbnailRoot: {
        twFlexShrink: "flex-shrink-0",
      },
      UploadThumbnailContent: {
        twPadding: "pb-6",
        twWidth: "w-[200px]",
        twHeight: "h-[200px]",
        twFlex: "flex",
        twAlignItems: "items-center",
        twJustifyContent: "justify-center",
        twBorderWidth: "data-[state=active]:border-2",
      },
      UploadCanvas: {
        twMaxWidth: "max-w-full",
        twMaxHeight: "max-h-full",
        twObjectFit: "object-contain",
        twFontWeight: "font-bold",
        twFontSize: "text-2xl",
      },
      UploadThumbnailButtonGroup: {
        twDisplay: "hidden data-[state=active]:flex",
        twGap: "gap-x-4",
      },
    },
  },
};
