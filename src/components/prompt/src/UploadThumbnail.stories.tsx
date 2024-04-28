import { Meta, StoryObj } from "@storybook/react";
import { defaultTheme } from "@ailiyah-ui/utils";
import React from "react";
import { styled } from "@ailiyah-ui/factory";

import { PresetTheme } from "@ailiyah-ui/utils";
import { ThemeProvider } from "@ailiyah-ui/context";
import { UploadThumbnail } from "./UploadThumbnail";
import { within, userEvent } from "@storybook/test";

const uploadFile = async (
  path: string,
  name: string,
  type: string
): Promise<File> => {
  const data = await fetch(path);
  const blob = await data.blob();
  return new File([blob], name, { type: type });
};

const mockImage = async (): Promise<File> => {
  return await uploadFile("/testImage.jpeg", "testImage.jpeg", "image/jpeg");
};

export function TestComponent({
  value,
  editing,
}: {
  value: PresetTheme;
  editing: boolean;
}) {
  const [thumbnail, setThumbnail] = React.useState<Blob | MediaSource>();

  return (
    <ThemeProvider value={value}>
      <UploadThumbnail
        thumbnail={thumbnail}
        setThumbnail={setThumbnail}
        editing={editing}
      />
    </ThemeProvider>
  );
}

const meta: Meta<typeof TestComponent> = {
  title: "UploadThumbnail",
  component: TestComponent,
  tags: ["autodocs"],
  parameters: {
    editing: { default: true, type: "boolean" },
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
    editing: true,
    value: {
      ...defaultTheme,
      UploadThumbnailContent: {
        twPadding: "pb-6",
        twWidth: "w-[200px]",
        twHeight: "h-[200px]",
        twFlex: "flex",
        twAlignItems: "items-center",
        twJustifyContent: "justify-center",
        twBorderWidth: "data-[state=active]:border-2",
      },
      UploadThumbnailCanvas: {
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

export const DefaultHover: Story = {
  args: Default.args,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.hover(canvas.getByText("Upload"));
  },
};

export const DefaultUploaded: Story = {
  args: Default.args,
  play: async ({canvasElement}) => {
    const canvas = within(canvasElement)
    const file = await mockImage()
    await userEvent.upload(canvas.getByTitle("file-upload")!, file)
    await userEvent.unhover(canvas.getByTitle("file-upload"))
  }
};

export const DefaultUploadedHover: Story = {
  args: Default.args,
  play: async({canvasElement}) => {
    const canvas = within(canvasElement)
    const file = await mockImage()
    await userEvent.upload(canvas.getByTitle("file-upload")!, file)
  }
};

export const DefaultUploadedHoverDelete: Story = {
  args: Default.args,
  play: async({canvasElement}) => {
    const canvas = within(canvasElement)
    const file = await mockImage()
    await userEvent.upload(canvas.getByTitle("file-upload")!, file)
    await userEvent.click(document.querySelector(".UploadThumbnailDeleteButton")!)
  }
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    editing: false,
  },
  
};

export const DisabledHover: Story = {
  args: Disabled.args,
  play: async({canvasElement}) => {
    const canvas = within(canvasElement)
    await userEvent.hover(canvas.getByText("Upload"))
  }
};

export const DisabledClick: Story = {
  args: Disabled.args,
  play: async({canvasElement}) => {
    const canvas = within(canvasElement)
    const file = await mockImage()
    await userEvent.upload(canvas.getByTitle("file-upload")!, file)
  }
};
