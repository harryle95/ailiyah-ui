import { PrimitiveProps, TailwindProps } from "@ailiyah-ui/utils";
import React from "react";
import {
  StateType,
  FormDataType,
  PromptRootOwnProps,
  FormObjectType,
} from "./Prompt.types";
import { PromptElementDataType } from "./PromptElement.types";
import { styled } from "@ailiyah-ui/factory";
import { PromptElement } from "./PromptElement";
import { AddButton, SubmitButton } from "@ailiyah-ui/button";

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

const Prompt = React.memo(
  React.forwardRef<
    HTMLDivElement,
    PrimitiveProps.DivProps & TailwindProps & PromptRootOwnProps
  >((props, ref) => {
    const { initialFormData, editing, ...rest } = props;

    const initState = initialFormData
      ? React.useCallback(() => {
          return Object.keys(initialFormData).reduce(
            (acc: StateType, curr: string) => {
              acc[curr] = editing ? editing : true;
              return acc;
            },
            {}
          );
        }, [Object.keys(initialFormData)])
      : {};

    const [editingStates, setEditingStates] =
      React.useState<StateType>(initState);

    const [formData, setFormData] = React.useState<FormDataType>(() => {
      return initialFormData ? initialFormData : {};
    });

    const setEditingByPromptId = (promptId: string) => {
      return () => {
        setEditingStates((prevState: StateType) => {
          console.log("Click on editing");
          return { ...prevState, [promptId]: !prevState[promptId] };
        });
      };
    };

    const addElement = () => {
      let newId = crypto.randomUUID();
      setObjectById<boolean>(newId, editing ? editing : true, setEditingStates);
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

    return (
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
        <styled.div themeName="PromptButtonGroup">
          <AddButton
            themeName="PromptButtonGroupNewButton"
            onClick={addElement}
          />
          <SubmitButton themeName="PromptButtonSubmitButton" />
        </styled.div>
      </styled.div>
    );
  })
);

export { Prompt };
