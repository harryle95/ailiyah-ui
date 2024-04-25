import * as React from "react";
import { Form } from "react-router-dom";
import { FormContextValue, FormProps } from "./Form.types";
import { createContext } from "@ailiyah-ui/context";

const [FormProvider, useFormContext] = createContext<FormContextValue>(
  "Form",
  undefined
);

/**
 * Wrapper of Remix/React-Router-Dom's `Form` component, which provides an accompanying
 * `useFormContext` hook to access`submitForm`
 *
 * Parameters:
 *
 *
 * Use case:
 * children of Root can call `useFormContext` to get `submitForm`, which is a reference to
 * the parent form's `onSubmit` handler. This allows for submitting the form using handlers
 * of components not necessarily buttons. For instance, consider an input text field that
 * can submit form once it goes out of focus.
 *
 * Example: Submit with a text input once out of focus.
 *
 * ```
      <Form.Root
        onSubmit={(e) => {
          e.preventDefault;
          console.log("Submit Form");
        }}
      >
        {({ submitForm }) => (
          <input
            type="text"
            autoFocus
            onBlur={
              submitForm as unknown as React.FocusEventHandler<HTMLInputElement>
            }
          />
        )}
      </Form.Root>
 * ```
 *
 * Example: submitting with a regular button
 *
 * ```
 * <Root method="POST" onSubmit={(e)=>{console.log("Submit Form"); e.preventDefault()}}>
 *  <button>Submit</button>
 * </Root>
 * ```
 *
 */
const Root = React.forwardRef<HTMLFormElement, FormProps>((props, ref) => {
  const { children, onSubmit, ...rest } = props;
  const contextValue = React.useMemo(
    () => ({
      submitForm: onSubmit,
    }),
    [onSubmit]
  );
  return (
    <FormProvider value={contextValue as unknown as FormContextValue}>
      <Form
        ref={ref}
        {...rest}
        onSubmit={
          onSubmit as unknown as React.FormEventHandler<HTMLFormElement>
        }
      >
        {typeof children === "function"
          ? children(contextValue as unknown as FormContextValue)
          : children}
      </Form>
    </FormProvider>
  );
});

Root.displayName = "FormRoot";

export { Root, useFormContext };
