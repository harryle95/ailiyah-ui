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

interface PromptDataType{
  [key: string]: PromptElementDataType
}

export type { PromptElementOwnProps, PromptDataType, PromptElementDataType};
