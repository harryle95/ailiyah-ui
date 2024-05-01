import { Root, ButtonGroup } from "./Prompt";
import { styled } from "@ailiyah-ui/factory";
import { FormDataType, StateType } from "./Prompt.types";
import React from "react";

export function PromptForm({
  initialFormData = undefined,
  editing = true,
  onSubmit = (e) => {
    e.preventDefault();
    alert("Submitting Form");
  },
}: {
  initialFormData?: FormDataType;
  editing: boolean;
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
}) {
  const initState = initialFormData
    ? React.useCallback(() => {
        return Object.keys(initialFormData).reduce(
          (acc: StateType, curr: string) => {
            acc[curr] =
              editing !== undefined && editing !== null ? editing : true;
            return acc;
          },
          {}
        );
      }, [Object.keys(initialFormData)])
    : () => {
        return {};
      };

  const [editingStates, setEditingStates] =
    React.useState<StateType>(initState);

  const [formData, setFormData] = React.useState<FormDataType>(() => {
    return initialFormData ? initialFormData : {};
  });

  return (
    <styled.form onSubmit={onSubmit} themeName="PromptForm">
      <Root
        editingStates={editingStates}
        setEditingStates={setEditingStates}
        formData={formData}
        setFormData={setFormData}
      >
        <ButtonGroup />
      </Root>
    </styled.form>
  );
}
