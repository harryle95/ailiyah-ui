import { PrimitiveProps, TailwindProps } from "@ailiyah-ui/utils";
import React from "react";
import { StateType, PromptRootOwnProps, FormObjectType } from "./Prompt.types";
import { PromptElementDataType } from "./PromptElement.types";
import { TailwindComponentProps, styled } from "@ailiyah-ui/factory";
import { PromptElement } from "./PromptElement";
import { createContext } from "@ailiyah-ui/context";

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
    const {
      formData,
      setFormData,
      editingStates,
      setEditingStates,
      children,
      ...rest
    } = props;

    const setEditingByPromptId = React.useCallback(
      (promptId: string) => {
        return () => {
          setEditingStates((prevState: StateType) => {
            console.log("Click on editing");
            return { ...prevState, [promptId]: !prevState[promptId] };
          });
        };
      },
      [setEditingStates]
    );

    const addElement = React.useCallback(
      (e: React.MouseEvent) => {
        e.preventDefault();
        let newId = crypto.randomUUID();
        setObjectById<boolean>(newId, true, setEditingStates);
        setObjectById<PromptElementDataType>(
          newId,
          { thumbnail: undefined, prompt: "" },
          setFormData
        );
      },
      [setObjectById, setFormData, setEditingStates]
    );

    const removeElementByPromptId = React.useCallback(
      (promptId: string) => {
        return () => {
          removeObjectById(promptId, setEditingStates);
          removeObjectById(promptId, setFormData);
        };
      },
      [removeObjectById, setEditingStates, setFormData]
    );

    const providerValue = React.useMemo(() => {
      return {
        addElement: addElement,
      };
    }, [addElement]);

    const setEditingMap: FormObjectType<Function> = React.useMemo(
      () =>
        Object.keys(formData).reduce((acc, key) => {
          acc[key] = setEditingByPromptId(key);
          return acc;
        }, {} as FormObjectType<Function>),
      [...Object.keys(formData), setEditingByPromptId]
    );

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
                    key={key}
                    editing={editingStates[key]}
                    setEditing={setEditingMap[key]}
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

const ButtonGroup = React.memo(
  React.forwardRef<HTMLDivElement, TailwindComponentProps<"div">>(
    (props, ref) => {
      const { addElement } = usePromptContext();
      return (
        <styled.div themeName="PromptButtonGroup" ref={ref} {...props}>
          <styled.button
            type="button"
            themeName="PromptButtonGroupNewButton"
            onClick={
              addElement as unknown as React.MouseEventHandler<HTMLButtonElement>
            }
          >
            Add Prompt
          </styled.button>
          <styled.button
            type="submit"
            themeName="PromptButtonGroupSubmitButton"
          >
            Submit
          </styled.button>
        </styled.div>
      );
    }
  )
);

export { Root, ButtonGroup };
