import { ThemeProvider } from "@ailiyah-ui/context";
import { PromptElement } from "./PromptElement";
import { PresetTheme } from "@ailiyah-ui/utils";
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
  InitialFormData,
  mockPrompt,
};
