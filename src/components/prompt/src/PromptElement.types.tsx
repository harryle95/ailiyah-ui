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
  removeElement?: Function;
}

export type { PromptElementOwnProps, PromptElementDataType };
