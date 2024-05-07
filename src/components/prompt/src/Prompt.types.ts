import { PromptElementDataType } from "./PromptElement.types";
import React = require("react");

interface FormObjectType<T> {
  [key: string]: T;
}
type FormDataType = FormObjectType<PromptElementDataType>;

interface PromptRootOwnProps {
  formData: FormDataType;
  setFormData: React.Dispatch<
    React.SetStateAction<FormObjectType<PromptElementDataType>>
  >;
  editing?: boolean;
}

export type { FormDataType, PromptRootOwnProps, FormObjectType };
