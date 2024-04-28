import { ThemeProvider } from "@ailiyah-ui/context";
import { PromptElement } from "./PromptElement";
import { PresetTheme, defaultTheme } from "@ailiyah-ui/utils";
import React from "react";
import { FormDataType } from "./Prompt.types";

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

const replacementMockImage = async (): Promise<File> => {
  return await uploadFile(
    "/replacementImage.jpeg",
    "replacementImage.jpeg",
    "image/jpeg"
  );
};

function TestComponent({
  initialEditing,
  initialFormData,
  value,
}: {
  initialEditing: boolean;
  initialFormData: FormDataType;
  value?: PresetTheme;
}) {
  const [formData, setFormData] = React.useState(initialFormData);
  const [editing, setEditing] = React.useState(() => initialEditing);
  const promptId = "1";
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

const theme: PresetTheme = {
  ...defaultTheme,
  PromptElementRoot: {
    twWidth: "w-full",
    twHeight: "h-full",
    twPadding: "pb-6",
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
  PromptElementButtonGroup: {
    twDisplay: "hidden data-[state=active]:flex",
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
};

const InitialFormData: FormDataType = {
  0: {},
  1: {},
  2: {},
};

const mockPrompt = "Hello World";

export {
  mockImage,
  replacementMockImage,
  TestComponent,
  theme,
  InitialFormData,
  mockPrompt,
};
