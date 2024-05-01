import { TailwindComponentProps, styled } from "@ailiyah-ui/factory";
import { PromptElementOwnProps } from "./PromptElement.types";
import React from "react";
import { DeleteButton, EditButton } from "@ailiyah-ui/button";
import {
  BaseStateBoxContextValue,
  createBox,
  createStateBox,
  createStateBoxChildren,
  resolveLocation,
} from "@ailiyah-ui/box";
import { CornerLocationProps } from "@ailiyah-ui/utils";
import { UploadThumbnail } from "./UploadThumbnail";
import { TextArea } from "./TextArea";
import { FormDataType } from "./Prompt.types";

const [Root, useRootContext] = createStateBox("Root", undefined, {
  twPosition: "relative",
});
const Content = createBox("Content", { twPosition: "relative" });
const Component = createStateBoxChildren<
  "div",
  BaseStateBoxContextValue,
  TailwindComponentProps<"div"> & CornerLocationProps
>(
  "div",
  "Component",
  useRootContext,
  { twPosition: "absolute" },
  resolveLocation
);

const PromptElement = React.memo(
  React.forwardRef<
    HTMLDivElement,
    PromptElementOwnProps & TailwindComponentProps<"div">
  >((props, ref) => {
    const {
      editing,
      setEditing,
      formData,
      setFormData,
      promptId,
      removeElement = () => {},
      ...rest
    } = props;
    const { thumbnail = undefined, prompt = "" } = formData;

    const setThumbnail = (newThumbnail: File) => {
      setFormData((currentFormData: FormDataType) => {
        return {
          ...currentFormData,
          [promptId]: { ...currentFormData[promptId], thumbnail: newThumbnail },
        };
      });
    };
    const setPrompt = (newPrompt: string) => {
      setFormData((currentFormData: FormDataType) => {
        return {
          ...currentFormData,
          [promptId]: { ...currentFormData[promptId], prompt: newPrompt },
        };
      });
    };

    return (
      <Root initialState={false} themeName="PromptElementRoot" ref={ref}>
        <Content themeName="PromptElementContent">
          <UploadThumbnail
            editing={editing}
            thumbnail={thumbnail}
            setThumbnail={setThumbnail}
            themeName="PromptElementThumbnail"
          />
          <TextArea
            editing={editing}
            prompt={prompt}
            setPrompt={setPrompt}
            themeName="PromptElementTextArea"
          />
        </Content>
        <Component
          compLocation="bottom-right"
          themeName="PromptElementButtonGroup"
        >
          <EditButton
            onClick={(e) => {
              e.preventDefault();
              setEditing();
            }}
            themeName="PromptElementEditButton"
            tooltipContent="Edit"
          />
          <DeleteButton
            onClick={(e) => {
              e.preventDefault();
              removeElement(e);
            }}
            themeName="PromptElementDeleteButton"
            tooltipContent="Delete"
          />
        </Component>
      </Root>
    );
  })
);

export { PromptElement };
