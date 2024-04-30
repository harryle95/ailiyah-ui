import { PromptElementDataType } from "./PromptElement.types";
import React = require("react");

interface FormObjectType<T> {
  [key: string]: T;
}
type FormDataType = FormObjectType<PromptElementDataType>;
type StateType = FormObjectType<boolean>;

interface PromptRootOwnProps {
  formData: FormDataType;
  setFormData: React.Dispatch<
    React.SetStateAction<FormObjectType<PromptElementDataType>>
  >;
  editingStates: StateType;
  setEditingStates: React.Dispatch<
    React.SetStateAction<FormObjectType<boolean>>
  >;
}

export type { StateType, FormDataType, PromptRootOwnProps, FormObjectType };
