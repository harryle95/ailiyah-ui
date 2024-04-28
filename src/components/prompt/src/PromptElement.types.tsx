interface PromptElementDataType {
  thumbnail?: File;
  prompt?: string;
}

interface PromptElementOwnProps {
  promptId: string;
  editing: boolean;
  setEditing: Function;
  formData: PromptElementDataType;
  setFormData: Function;
}

export type { PromptElementOwnProps, PromptElementDataType };
