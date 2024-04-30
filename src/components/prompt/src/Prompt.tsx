import { PrimitiveProps, TailwindProps } from "@ailiyah-ui/utils";
import React from "react";
import {
  StateType,
  FormDataType,
  PromptRootOwnProps,
  FormObjectType,
} from "./Prompt.types";
import { PromptElementDataType } from "./PromptElement.types";
import { TailwindComponentProps, styled } from "@ailiyah-ui/factory";
import { PromptElement } from "./PromptElement";
import { createContext } from "@ailiyah-ui/context";
import { createStateBox } from "@ailiyah-ui/box";

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

    const setEditingByPromptId = (promptId: string) => {
      return () => {
        setEditingStates((prevState: StateType) => {
          console.log("Click on editing");
          return { ...prevState, [promptId]: !prevState[promptId] };
        });
      };
    };

    const addElement = (e: React.MouseEvent) => {
      e.preventDefault();
      let newId = crypto.randomUUID();
      setObjectById<boolean>(newId, true, setEditingStates);
      setObjectById<PromptElementDataType>(
        newId,
        { thumbnail: undefined, prompt: "" },
        setFormData
      );
    };

    const removeElementByPromptId = (promptId: string) => {
      return () => {
        removeObjectById(promptId, setEditingStates);
        removeObjectById(promptId, setFormData);
      };
    };

    const providerValue = React.useMemo(() => {
      return {
        addElement: addElement,
      };
    }, [addElement]);

    return (
      <PromptContextProvider value={providerValue}>
        <styled.div {...rest} ref={ref} themeName="PromptRoot">
          <styled.div themeName="PromptContent">
            {formData && Object.keys(formData).length > 0 ? (
              Object.entries(formData).map(([key, value], _) => {
                const setEditing = setEditingByPromptId(key);
                const removeElement = removeElementByPromptId(key);
                return (
                  <PromptElement
                    key={key}
                    editing={editingStates[key]}
                    setEditing={setEditing}
                    promptId={key}
                    setFormData={setFormData}
                    formData={value}
                    removeElement={removeElement}
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

const PromptButtonGroup = React.memo(
  React.forwardRef<HTMLDivElement, TailwindComponentProps<"div">>(
    (props, ref) => {
      const { addElement } = usePromptContext();
      return (
        <styled.div themeName="PromptButtonGroup" ref={ref} {...props}>
          <styled.button
            themeName="PromptButtonGroupNewButton"
            onClick={
              addElement as unknown as React.MouseEventHandler<HTMLButtonElement>
            }
          >
            Add Prompt
          </styled.button>
          <styled.button themeName="PromptButtonGroupSubmitButton">
            Submit
          </styled.button>
        </styled.div>
      );
    }
  )
);

export { Root, PromptButtonGroup };
