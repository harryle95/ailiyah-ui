interface PromptElementDataType {
  thumbnail?: File;
  prompt?: string;
}

interface PromptElementOwnProps extends PromptElementDataType {
  promptId: string;
  editing: boolean;
  setEditing: Function;
  setFormData: Function;
  removeElement?: Function;
}

export type { PromptElementOwnProps, PromptElementDataType };
