import { PrimitiveProps, TailwindProps } from "@ailiyah-ui/utils";
import React from "react";
import { PromptRootOwnProps, FormObjectType } from "./Prompt.types";
import { PromptElementDataType } from "./PromptElement.types";
import {
  TailwindComponentProps,
  createElement,
  styled,
} from "@ailiyah-ui/factory";
import { PromptElement } from "./PromptElement";
import { createContext } from "@ailiyah-ui/context";
import { createBox } from "@ailiyah-ui/box";

function setObjectById<T>(
  promptId: string,
  value: T,
  setFn: React.Dispatch<React.SetStateAction<FormObjectType<T>>>
) {
  setFn((prevState: FormObjectType<T>) => {
    return { ...prevState, [promptId]: value };
  });
}

function removeObjectById<T>(
  promptId: string,
  setFn: React.Dispatch<React.SetStateAction<FormObjectType<T>>>
) {
  setFn((prevState: FormObjectType<T>) => {
    return Object.fromEntries(
      Object.entries(prevState).filter(([key, _]) => key != promptId)
    );
  });
}

interface PromptContextValue {
  addElement: Function;
}

const [PromptContextProvider, usePromptContext] =
  createContext<PromptContextValue>("Prompt");

const Root = React.memo(
  React.forwardRef<
    HTMLDivElement,
    PrimitiveProps.DivProps & TailwindProps & PromptRootOwnProps
  >((props, ref) => {
    const { formData, setFormData, editing = true, children, ...rest } = props;

    const addElement = React.useCallback(
      (e: React.MouseEvent) => {
        e.preventDefault();
        let newId = crypto.randomUUID();
        setObjectById<PromptElementDataType>(
          newId,
          { thumbnail: undefined, prompt: "" },
          setFormData
        );
      },
      [setObjectById, setFormData]
    );

    const removeElementByPromptId = React.useCallback(
      (promptId: string) => {
        return () => {
          removeObjectById(promptId, setFormData);
        };
      },
      [removeObjectById, setFormData]
    );

    const providerValue = React.useMemo(() => {
      return {
        addElement: addElement,
      };
    }, [addElement]);

    const removeElementMap: FormObjectType<Function> = React.useMemo(
      () =>
        Object.keys(formData).reduce((acc, key) => {
          acc[key] = removeElementByPromptId(key);
          return acc;
        }, {} as FormObjectType<Function>),
      [...Object.keys(formData), removeElementByPromptId]
    );

    return (
      <PromptContextProvider value={providerValue}>
        <styled.div {...rest} ref={ref} themeName="PromptRoot">
          <styled.div themeName="PromptContent">
            {formData && Object.keys(formData).length > 0 ? (
              Object.entries(formData).map(([key, value], _) => {
                return (
                  <PromptElement
                    editing={editing}
                    key={key}
                    promptId={key}
                    setFormData={setFormData}
                    thumbnail={value.thumbnail}
                    prompt={value.prompt}
                    removeElement={removeElementMap[key]}
                  />
                );
              })
            ) : (
              <></>
            )}
          </styled.div>
          {children}
        </styled.div>
      </PromptContextProvider>
    );
  })
);

const Button = styled("button", {
  themeName: "PromptButtonGroupButton",
});

const AddButton = React.memo(
  React.forwardRef<HTMLButtonElement, TailwindComponentProps<"button">>(
    (props, ref) => {
      const { addElement } = usePromptContext();
      const { children, ...rest } = props;
      return (
        <styled.button
          type="button"
          themeName="PromptButtonGroupButton"
          {...rest}
          ref={ref}
          onClick={
            addElement as unknown as React.MouseEventHandler<HTMLButtonElement>
          }
        >
          {children}
        </styled.button>
      );
    }
  )
);

const ButtonGroup = createBox("ButtonGroup", {
  themeName: "PromptButtonGroup",
});

export { Root, ButtonGroup, AddButton, Button };
