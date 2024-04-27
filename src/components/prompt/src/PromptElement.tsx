import { TailwindComponentProps, styled } from "@ailiyah-ui/factory";
import { PromptElementOwnProps, PromptDataType } from "./PromptElement.types";
import React from "react";
import { EditButton } from "@ailiyah-ui/button";
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

const [Root, useRootContext] = createStateBox("Root");
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
    const { editing, setEditing, formData, setFormData, promptId, ...rest } =
      props;
    const { thumbnail=undefined, prompt="" } = formData;
    const setThumbnail = (newThumbnail: File) => {
      setFormData((currentFormData: PromptDataType) => {
        return {
          ...currentFormData,
          [promptId]: { ...currentFormData[promptId], thumbnail: newThumbnail },
        };
      });
    };
    const setPrompt = (newPrompt: string) => {
      setFormData((currentFormData: PromptDataType) => {
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
          />
          <TextArea editing={editing} prompt={prompt} setPrompt={setPrompt} />
        </Content>
        {!editing ? (
          <Component
            compLocation="bottom-right"
            themeName="PromptElementButtonGroup"
          >
            <EditButton
              onClick={() => setEditing(true)}
              themeName="PromptElementEditButton"
            />
          </Component>
        ) : (
          <></>
        )}
      </Root>
    );
  })
);

export { PromptElement };
