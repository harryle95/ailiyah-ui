import React from "react";
import { UserEvent as TLUserEvent } from "@testing-library/user-event";
import { UserEvent as SUserEvent } from "@storybook/test";
import * as TextArea from "./TextArea";
import { EditButton, SubmitButton } from "@ailiyah-ui/button";

const TextAreaWithSubmitAndEdit: React.FC<{
  initPrompt: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}> = ({ initPrompt, onClick = () => {} }) => {
  const [prompt, setPrompt] = React.useState<string>(() => initPrompt);
  const isDisabled = prompt === "" || prompt === initPrompt;
  return (
    <TextArea.Root themeName="TextAreaRoot">
      <TextArea.Content themeName="TextAreaContent">
        <TextArea.TextArea
          name="prompt"
          placeholder={prompt}
          value={prompt}
          onChange={(e) => setPrompt(e.currentTarget.value)}
          themeName="TextAreaTextArea"
        />
        <TextArea.Component compLocation="bottom-right">
          <EditButton tooltipContent="Edit" themeName="TextAreaEditButton" />
          <SubmitButton
            disabled={isDisabled}
            onClick={onClick}
            themeName="TextAreaSubmitButton"
          />
        </TextArea.Component>
      </TextArea.Content>
    </TextArea.Root>
  );
};

const EMPTYPROMPT = "";
const NONEMPTYPROMPT = "LoremIpsum";
const FIRSTTYPE = "HELLO";
const SECONDTYPE = "WORLD";

const ActionFactory = (userEvent: SUserEvent | TLUserEvent) => {
  return {
    clearTextField: async () => {
      let textfield = document.querySelector(".TextAreaTextArea");
      await userEvent.clear(textfield!);
    },
    typeFirstPrompt: async () => {
      let textfield = document.querySelector(".TextAreaTextArea");
      await userEvent.type(textfield!, FIRSTTYPE);
    },
    typeSecondPrompt: async () => {
      let textfield = document.querySelector(".TextAreaTextArea");
      await userEvent.type(textfield!, SECONDTYPE);
    },
    typeInitialPrompt: async () => {
      let textfield = document.querySelector(".TextAreaTextArea");
      await userEvent.type(textfield!, NONEMPTYPROMPT);
    },
  };
};

export {
  TextAreaWithSubmitAndEdit,
  EMPTYPROMPT,
  NONEMPTYPROMPT,
  FIRSTTYPE,
  SECONDTYPE,
  ActionFactory,
};
