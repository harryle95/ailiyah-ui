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
        setEditingStates((prevState) => {
          return { ...prevState, [promptId]: true };
        });
      };
    };

    const addElement = () => {
      let newId = crypto.randomUUID()
      setObjectById<boolean>(newId, editing ? editing : true, setEditingStates);
      setObjectById<PromptElementDataType>(
        newId,
        { thumbnail: undefined, prompt: "" },
        setFormData
      );
    };

    const removeElement = (promptId: string) => {
      removeObjectById(promptId, setEditingStates);
      removeObjectById(promptId, setFormData);
    };

    return (
      <styled.div {...rest} ref={ref} themeName="PromptRoot">
        <styled.div themeName="PromptContent">
          {formData && Object.keys(formData).length > 0 ? (
            Object.entries(formData).map(([key, value], _) => {
              const setEditing = setEditingByPromptId(key);
              return (
                <PromptElement
                  key={key}
                  editing={editingStates[key]}
                  setEditing={setEditing}
                  promptId={key}
                  setFormData={setFormData}
                  formData={value}
                />
              );
            })
          ) : (
            <></>
          )}
        </styled.div>
        <styled.div themeName="PromptButtonGroup">
          <styled.button
            themeName="PromptButtonGroupAddButton"
            onClick={addElement}
          >
            Add Form
          </styled.button>
          <styled.button themeName="PromptButtonGroupSubmitButton">
            SubmitForm
          </styled.button>
        </styled.div>
      </styled.div>
    );
  })
);

export { Prompt };
