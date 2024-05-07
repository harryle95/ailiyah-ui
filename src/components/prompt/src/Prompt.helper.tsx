import { Root, ButtonGroup, Button } from "./Prompt";
import { styled } from "@ailiyah-ui/factory";
import { FormDataType } from "./Prompt.types";
import React from "react";
import { AddButton } from "./Prompt";
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
  const [formData, setFormData] = React.useState<FormDataType>(() => {
    return initialFormData ? initialFormData : {};
  });

  return (
    <styled.form onSubmit={onSubmit} themeName="PromptForm">
      <Root formData={formData} setFormData={setFormData} editing={editing}>
        {editing && (
          <ButtonGroup>
            <AddButton className="Add">Add Element</AddButton>
            <Button className="Submit">Submit</Button>
          </ButtonGroup>
        )}
      </Root>
    </styled.form>
  );
}
