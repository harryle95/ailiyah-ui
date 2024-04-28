import { screen } from "@testing-library/react";
import { expect } from "vitest";
import userEvent from "@testing-library/user-event";
import { mockPrompt } from "./PromptElement.helper";

const SetupAction = {
  upload: async () => {
    const file = new File(["hello"], "testImage.png", { type: "image/png" });
    await userEvent.upload(screen.getByTitle("file-upload")!, file);
    await userEvent.unhover(screen.getByTitle("file-upload")!);
  },
  reupload: async () => {
    const file = new File(["hello world"], "testImage.png", {
      type: "image/png",
    });
    await userEvent.upload(screen.getByTitle("file-upload")!, file);
    await userEvent.unhover(screen.getByTitle("file-upload")!);
  },
  type: async () => {
    await userEvent.type(
      document.querySelector(".PromptElementTextArea")!,
      mockPrompt
    );
    await userEvent.unhover(document.querySelector(".PromptElementTextArea")!)
  },
  hoverOnUpload: async () => {
    await userEvent.hover(screen.getByText("Upload"));
  },
  hoverOnThumbnail: async () => {
    await userEvent.hover(document.querySelector(".PromptElementThumbnail")!);
  },
  clickDelete: async () => {
    await userEvent.click(document.querySelector(".ThumbnailDeleteButton")!);
  },
  clickEdit: async () => {
    await userEvent.click(document.querySelector(".PromptElementEditButton")!);
    await userEvent.unhover(document.querySelector(".PromptElementEditButton")!);

  },
};

function createComponentTestSuite(selectorKey: string) {
  return {
    isInTheDocument: () => {
      expect(document.querySelector(selectorKey)).toBeInTheDocument();
    },
    isNotInTheDocument: () => {
      expect(document.querySelector(selectorKey)).not.toBeInTheDocument();
    },
    isVisible: () => {
      expect(document.querySelector(selectorKey)).toBeVisible();
    },
    isInvisible: () => {
      expect(document.querySelector(selectorKey)).not.toBeVisible();
    },
  };
}

function createIsATest(selectorKey: string, tagName: string) {
  return () => {
    expect(document.querySelector(selectorKey)!.tagName).toBe(tagName);
  };
}

function createTextContentTest(selectorKey: string, textContent: string) {
  return () => {
    expect(document.querySelector(selectorKey)!.textContent).toBe(textContent);
  };
}

const ComponentTest = {
  promptElementEditButton: createComponentTestSuite(".PromptElementEditButton"),
  promptElementDeleteButton: createComponentTestSuite(
    ".PromptElementDeleteButton"
  ),
  promptElementTextArea: {
    ...createComponentTestSuite(".PromptElementTextArea"),
    isEnabled: createIsATest(".PromptElementTextArea", "TEXTAREA"),
    isDisabled: createIsATest(".PromptElementTextArea", "P"),
    hasNullContent: createTextContentTest(".PromptElementTextArea", ""),
    hasTypedContent: createTextContentTest(
      ".PromptElementTextArea",
      mockPrompt
    ),
  },
  thumbnailCanvas: {
    ...createComponentTestSuite(".ThumbnailCanvas"),
    isAnImage: createIsATest(".ThumbnailCanvas", "IMG"),
    isNotAnImage: createIsATest(".ThumbnailCanvas", "LABEL"),
  },
  thumbnailUploadButton: createComponentTestSuite(".ThumbnailUploadButton"),
  thumbnailDeleteButton: createComponentTestSuite(".ThumbnailDeleteButton"),
};

const StateTest = {
  PromptButtons: {
    rendered: () => {
      ComponentTest.promptElementEditButton.isInTheDocument();
      ComponentTest.promptElementDeleteButton.isInTheDocument();
    },
    unhovered: () => {
      ComponentTest.promptElementEditButton.isInvisible();
      ComponentTest.promptElementDeleteButton.isInvisible();
    },
    hovered: () => {
      ComponentTest.promptElementEditButton.isVisible();
      ComponentTest.promptElementDeleteButton.isVisible();
    },
  },
  TextArea: {
    renderEnabled: () => {
      ComponentTest.promptElementTextArea.isInTheDocument();
      ComponentTest.promptElementTextArea.isVisible();
      ComponentTest.promptElementTextArea.isEnabled();
    },
    renderDisabled: () => {
      ComponentTest.promptElementTextArea.isInTheDocument();
      ComponentTest.promptElementTextArea.isVisible();
      ComponentTest.promptElementTextArea.isDisabled();
    },
    typed: ComponentTest.promptElementTextArea.hasTypedContent,
    empty: ComponentTest.promptElementTextArea.hasNullContent,
  },
  Thumnail: {
    isAnImage: ComponentTest.thumbnailCanvas.isAnImage,
    isNotAnImage: ComponentTest.thumbnailCanvas.isNotAnImage,
    rendered: () => {
      ComponentTest.thumbnailCanvas.isInTheDocument();
      ComponentTest.thumbnailCanvas.isVisible();
    },
    unUploaded: () => {
      ComponentTest.thumbnailCanvas.isNotAnImage();
      ComponentTest.thumbnailUploadButton.isNotInTheDocument();
      ComponentTest.thumbnailDeleteButton.isNotInTheDocument();
    },
    uploaded: () => {
      ComponentTest.thumbnailCanvas.isAnImage();
      ComponentTest.thumbnailDeleteButton.isInTheDocument();
      ComponentTest.thumbnailUploadButton.isInTheDocument();
    },
    hovered: () => {
      ComponentTest.thumbnailUploadButton.isVisible();
      ComponentTest.thumbnailDeleteButton.isVisible();
    },
    unhovered: () => {
      ComponentTest.thumbnailUploadButton.isInvisible();
      ComponentTest.thumbnailDeleteButton.isInvisible();
    },
  },
};

export { SetupAction, StateTest, ComponentTest };