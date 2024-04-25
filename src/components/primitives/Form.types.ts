import { FormProps as _FormProps } from "react-router-dom";

interface FormContextValue {
  submitForm?:
    | React.FormEvent<HTMLFormElement>
    | React.MouseEventHandler<HTMLButtonElement>
    | React.KeyboardEventHandler<HTMLInputElement>;
}

interface FormProps extends Omit<_FormProps, "children" | "onSubmit"> {
  children:
    | React.ReactNode
    | ((formContext: FormContextValue) => React.ReactNode);
  onSubmit?:
    | React.FormEvent<HTMLFormElement>
    | React.MouseEventHandler<HTMLButtonElement>
    | React.KeyboardEventHandler<HTMLInputElement>
    | React.FocusEventHandler<HTMLInputElement>;
}

export type { FormContextValue, FormProps };
