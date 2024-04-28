import { Meta, StoryObj } from "@storybook/react";
import { defaultTheme } from "@ailiyah-ui/utils";
import { userEvent, within } from "@storybook/test";
import React from "react";
import { styled } from "@ailiyah-ui/factory";
import {
  mockImage,
  replacementMockImage,
  TestComponent,
  InitialFormData,
  mockPrompt,
} from "./PromptElement.helper";
import { theme } from "./theme";

const uploadPlay = async ({
  canvasElement,
}: {
  canvasElement: HTMLElement;
}) => {
  const canvas = within(canvasElement);
  const file = await mockImage();
  await userEvent.upload(canvas.getByTitle("file-upload")!, file);
  await userEvent.unhover(canvas.getByTitle("file-upload")!);
};

const typePlay = async ({ canvasElement }: { canvasElement: HTMLElement }) => {
  await userEvent.type(
    document.querySelector(".PromptElementTextArea")!,
    mockPrompt
  );
};

const hoverNoUploadPlay = async ({
  canvasElement,
}: {
  canvasElement: HTMLElement;
}) => {
  const canvas = within(canvasElement);
  await userEvent.hover(canvas.getByText("Upload"));
};

const hoverUploadPlay = async ({
  canvasElement,
}: {
  canvasElement: HTMLElement;
}) => {
  const canvas = within(canvasElement);
  await userEvent.hover(document.querySelector(".ThumbnailRoot")!);
};

const removeThumbnailPlay = async ({
  canvasElement,
}: {
  canvasElement: HTMLElement;
}) => {
  const canvas = within(canvasElement);
  await userEvent.click(document.querySelector(".ThumbnailDeleteButton")!);
};

const reUploadPlay = async ({
  canvasElement,
}: {
  canvasElement: HTMLElement;
}) => {
  const canvas = within(canvasElement);
  const file = await replacementMockImage();
  await userEvent.upload(canvas.getByTitle("file-upload")!, file);
  await userEvent.unhover(canvas.getByTitle("file-upload")!);
};

const clickEditPlay = async ({
  canvasElement,
}: {
  canvasElement: HTMLElement;
}) => {
  const canvas = within(canvasElement);
  await userEvent.click(document.querySelector(".PromptElementEditButton")!);
};

const editFromDisabled = async ({
  canvasElement,
}: {
  canvasElement: HTMLElement;
}) => {
  await hoverNoUploadPlay({ canvasElement });
  await clickEditPlay({ canvasElement });
};

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
      <styled.div twWidth="w-full max-w-[600px]" twHeight="h-full">
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
    value: theme,
  },
};

export const DefaultHover: Story = {
  args: Default.args,
  play: hoverNoUploadPlay,
};

export const UploadNoType: Story = {
  args: Default.args,
  play: uploadPlay,
};

export const UploadNoTypeThenReupload: Story = {
  args: Default.args,
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    await uploadPlay({ canvasElement });
    await reUploadPlay({ canvasElement });
  },
};

export const UploadThenType: Story = {
  args: Default.args,
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    await uploadPlay({ canvasElement });
    await typePlay({ canvasElement });
  },
};

export const TypeNoUpload: Story = {
  args: Default.args,
  play: typePlay,
};

export const TypeThenUpload: Story = {
  args: Default.args,
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    await typePlay({ canvasElement });
    await uploadPlay({ canvasElement });
  },
};

export const UploadedTypedThenHover: Story = {
  args: Default.args,
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    await uploadPlay({ canvasElement });
    await typePlay({ canvasElement });
    await hoverUploadPlay({ canvasElement });
  },
};

export const UploadedTypedHoveredThenReupload: Story = {
  args: Default.args,
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    await uploadPlay({ canvasElement });
    await typePlay({ canvasElement });
    await hoverUploadPlay({ canvasElement });
    await reUploadPlay({ canvasElement });
  },
};

export const UploadedTypedHoveredThenRemove: Story = {
  args: Default.args,
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    await uploadPlay({ canvasElement });
    await typePlay({ canvasElement });
    await hoverUploadPlay({ canvasElement });
    await removeThumbnailPlay({ canvasElement });
  },
};

export const Disabled: Story = {
  args: { ...Default.args, initialEditing: false },
};

export const DisabledHover: Story = {
  args: Disabled.args,
  play: hoverNoUploadPlay,
};

export const DisabledHoverThenClickEdit: Story = {
  args: Disabled.args,
  play: editFromDisabled,
};

export const DisabledEditThenHover: Story = {
  args: Disabled.args,
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    await editFromDisabled({ canvasElement });
    await hoverNoUploadPlay({ canvasElement });
  },
};

export const DisabledEditThenUploadNoType: Story = {
  args: Disabled.args,
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    await editFromDisabled({ canvasElement });
    await uploadPlay({ canvasElement });
  },
};

export const DisabledEditThenUploadNoTypeThenReupload: Story = {
  args: Disabled.args,
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    await editFromDisabled({ canvasElement });
    await uploadPlay({ canvasElement });
    await reUploadPlay({ canvasElement });
  },
};

export const DisabledEditThenUploadThenType: Story = {
  args: Disabled.args,
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    await editFromDisabled({ canvasElement });
    await uploadPlay({ canvasElement });
    await typePlay({ canvasElement });
  },
};

export const DisabledEditTypeNoUpload: Story = {
  args: Disabled.args,
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    await editFromDisabled({ canvasElement });
    await typePlay({ canvasElement });
  },
};

export const DisabledEditThenTypeThenUpload: Story = {
  args: Disabled.args,
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    await editFromDisabled({ canvasElement });
    await typePlay({ canvasElement });
    await uploadPlay({ canvasElement });
  },
};

export const DisabledEditThenUploadedTypedThenHover: Story = {
  args: Disabled.args,
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    await editFromDisabled({ canvasElement });
    await typePlay({ canvasElement });
    await uploadPlay({ canvasElement });
    await hoverUploadPlay({ canvasElement });
  },
};

export const DisabledEditThenUploadedTypedHoveredThenReupload: Story = {
  args: Disabled.args,
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    await editFromDisabled({ canvasElement });
    await typePlay({ canvasElement });
    await uploadPlay({ canvasElement });
    await hoverUploadPlay({ canvasElement });
    await reUploadPlay({ canvasElement });
  },
};

export const DisabledEditThenUploadTypeHoverReUploadThenRemove: Story = {
  args: Disabled.args,
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    await editFromDisabled({ canvasElement });
    await typePlay({ canvasElement });
    await uploadPlay({ canvasElement });
    await hoverUploadPlay({ canvasElement });
    await reUploadPlay({ canvasElement });
    await removeThumbnailPlay({ canvasElement });
  },
};
