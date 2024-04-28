import { PromptElementDataType } from "./PromptElement.types";

interface FormObjectType<T> {
  [key: string]: T;
}
type FormDataType = FormObjectType<PromptElementDataType>;
type StateType = FormObjectType<boolean>;

interface PromptRootOwnProps {
  initialFormData?: FormDataType;
  editing?: boolean;
}

export type { StateType, FormDataType, PromptRootOwnProps, FormObjectType };
