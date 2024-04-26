import { Meta, StoryObj } from "@storybook/react";
import { defaultTheme } from "@ailiyah-ui/utils";
import React from "react";
import { styled } from "@ailiyah-ui/factory";
import { TestComponent } from "./UploadThumbnail.test";

const meta: Meta<typeof TestComponent> = {
  title: "UploadThumbnail",
  component: TestComponent,
  tags: ["autodocs"],
  parameters: {
    value: {
      default: defaultTheme,
    },
  },
  decorators: [
    (Story) => (
      <styled.div twWidth="w-[500px]" twHeight="h-[500px]">
        <Story />
      </styled.div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof TestComponent>;

export const Default: Story = {
  args: {
    value: {
      ...defaultTheme,
      UploadThumbnailContent: {
        twPadding: "pb-6",
        twWidth: "w-[500px]",
        twHeight: "h-[500px]",
        twFlex: "flex",
        twAlignItems: "items-center",
        twJustifyContent: "justify-center",
        twBorderWidth: "data-[state=active]:border-2"
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
