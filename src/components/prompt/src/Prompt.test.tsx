import { PromptForm } from "./Prompt.helper";
import { render, screen } from "@testing-library/react";
import { FormDataType } from "./Prompt.types";
import React from "react";
import { SetupAction, StateTest, submitSpy } from "./helper";
import { FIRSTTYPE, SECONDTYPE } from "@ailiyah-ui/text/src/TextArea.helper";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { mockPrompt } from "./PromptElement.helper";

const renderAction = (initialFormData: FormDataType, editing: boolean) => {
  render(
    <PromptForm
      initialFormData={initialFormData}
      editing={editing}
      onSubmit={submitSpy}
    />
  );
};

const first = new File(["hello"], "testImage.png", { type: "image/png" });
global.URL.createObjectURL = vi.fn(() => "testImage.png");

const renderWithNoThumbnail = async () => {
  const initialFormData = {};
  renderAction(initialFormData, true);
};

const renderWithTwoThumbnails = async () => {
  const initialFormData = {
    0: { thumbnail: first, prompt: FIRSTTYPE },
    1: { thumbnail: first, prompt: SECONDTYPE },
  };
  renderAction(initialFormData, true);
};

const renderWithOneThumbnail = async () => {
  const initialFormData = {
    1: { thumbnail: first, prompt: FIRSTTYPE },
    0: { thumbnail: undefined, prompt: "" },
  };
  renderAction(initialFormData, true);
};

describe("When render without content", async () => {
  beforeEach(renderWithNoThumbnail);
  test("Prompt components should be rendered", StateTest.PromptForm.rendered);
  test(
    "There should be no prompt yet",
    StateTest.PromptForm.havePromptCount(0)
  );
  describe("when click on new prompt", async () => {
    beforeEach(SetupAction.clickNewPrompt);
    test("Form should not be submitted", StateTest.PromptForm.wasNotSubmitted);
    test(
      "There should be one more prompt element",
      StateTest.PromptForm.havePromptCount(1)
    );
    test(
      "Prompt textarea should be empty",
      StateTest.PromptForm.hasPromptElementTextAreaContent(0, "")
    );
    test(
      "Prompt thumbnail should be an upload button",
      StateTest.PromptForm.hasPromptElementThumbnailBeAnUploadForm(0)
    );
    describe("when click on prompt element delete button", () => {
      beforeEach(SetupAction.clickDeletePromptElement);
      test(
        "There should be one less prompt element",
        StateTest.PromptForm.havePromptCount(0)
      );
      test(
        "Form should not be submitted",
        StateTest.PromptForm.wasNotSubmitted
      );
    });
  });
});

describe("when render with one thumbnail", async () => {
  beforeEach(renderWithOneThumbnail);
  test("Prompt components should be rendered", StateTest.PromptForm.rendered);
  test("Prompt count should be 2", StateTest.PromptForm.havePromptCount(2));
  test(
    "First thumbnail an upload",
    StateTest.PromptForm.hasPromptElementThumbnailBeAnUploadForm(0)
  );
  test(
    "First content is empty",
    StateTest.PromptForm.hasPromptElementTextAreaContent(0, "")
  ),
    test(
      "Second thumbnail an image",
      StateTest.PromptForm.hasPromptElementThumbnailBeAnImage(1)
    );
  test(
    "Second textarea is not empty",
    StateTest.PromptForm.hasPromptElementTextAreaContent(1, FIRSTTYPE)
  );
  describe("when click on new prompt", async () => {
    beforeEach(SetupAction.clickNewPrompt);
    test("Form should not be submitted", StateTest.PromptForm.wasNotSubmitted);
    test(
      "There should be one more prompt element",
      StateTest.PromptForm.havePromptCount(3)
    );
    test(
      "Prompt textarea should be empty",
      StateTest.PromptForm.hasPromptElementTextAreaContent(2, "")
    );
    test(
      "Prompt thumbnail should be an upload button",
      StateTest.PromptForm.hasPromptElementThumbnailBeAnUploadForm(2)
    );
  });
  describe("when delete first prompt", () => {
    beforeEach(SetupAction.clickDeletePromptElement);
    test(
      "There should be one less prompt element",
      StateTest.PromptForm.havePromptCount(1)
    );
    test("Form should not be submitted", StateTest.PromptForm.wasNotSubmitted);
    test(
      "Second thumbnail an image",
      StateTest.PromptForm.hasPromptElementThumbnailBeAnImage(0)
    );
    test(
      "Second textarea is not empty",
      StateTest.PromptForm.hasPromptElementTextAreaContent(0, FIRSTTYPE)
    ),
      describe("when delete the second prompt", () => {
        beforeEach(SetupAction.clickDeletePromptElement);
        test(
          "There should be one less prompt element",
          StateTest.PromptForm.havePromptCount(0)
        );
      });
  });
  describe("when update first prompt", async () => {
    beforeEach(async () => {
      await SetupAction.upload();
      await SetupAction.type();
    });
    test(
      "There should be the same number of prompt elements",
      StateTest.PromptForm.havePromptCount(2)
    );
    test("Form should not be submitted", StateTest.PromptForm.wasNotSubmitted);
    test(
      "Second thumbnail an image",
      StateTest.PromptForm.hasPromptElementThumbnailBeAnImage(1)
    );
    test("Second prompt element is not modified", () => {
      StateTest.PromptForm.hasPromptElementThumbnailBeAnImage(1)();
      StateTest.PromptForm.hasPromptElementTextAreaContent(1, FIRSTTYPE)();
    });
    test("First prompt should be updated", () => {
      StateTest.PromptForm.hasPromptElementThumbnailBeAnImage(0)();
      StateTest.PromptForm.hasPromptElementTextAreaContent(0, mockPrompt)();
    });
  });
});

describe("when render with two thumbnails", async () => {
  beforeEach(renderWithTwoThumbnails);
  test("Prompt components should be rendered", StateTest.PromptForm.rendered);
  test("Prompt count should be 2", StateTest.PromptForm.havePromptCount(2));
  test(
    "First thumbnail an image",
    StateTest.PromptForm.hasPromptElementThumbnailBeAnImage(0)
  );
  test(
    "First content is set",
    StateTest.PromptForm.hasPromptElementTextAreaContent(0, FIRSTTYPE)
  ),
    test(
      "Second thumbnail an image",
      StateTest.PromptForm.hasPromptElementThumbnailBeAnImage(1)
    );
  test(
    "Second textarea is not empty",
    StateTest.PromptForm.hasPromptElementTextAreaContent(1, SECONDTYPE)
  );
  describe("when click on new prompt", async () => {
    beforeEach(SetupAction.clickNewPrompt);
    test("Form should not be submitted", StateTest.PromptForm.wasNotSubmitted);
    test(
      "There should be one more prompt element",
      StateTest.PromptForm.havePromptCount(3)
    );
    test(
      "Prompt textarea should be empty",
      StateTest.PromptForm.hasPromptElementTextAreaContent(2, "")
    );
    test(
      "Prompt thumbnail should be an upload button",
      StateTest.PromptForm.hasPromptElementThumbnailBeAnUploadForm(2)
    );
  });
  describe("when delete first prompt", () => {
    beforeEach(SetupAction.clickDeletePromptElement);
    test(
      "There should be one less prompt element",
      StateTest.PromptForm.havePromptCount(1)
    );
    test("Form should not be submitted", StateTest.PromptForm.wasNotSubmitted);
    test(
      "Second thumbnail an image",
      StateTest.PromptForm.hasPromptElementThumbnailBeAnImage(0)
    );
    test(
      "Second textarea is not empty",
      StateTest.PromptForm.hasPromptElementTextAreaContent(0, SECONDTYPE)
    ),
      describe("when delete the second prompt", () => {
        beforeEach(SetupAction.clickDeletePromptElement);
        test(
          "There should be one less prompt element",
          StateTest.PromptForm.havePromptCount(0)
        );
      });
  });
  describe("when update first prompt", async () => {
    beforeEach(async () => {
      await SetupAction.upload();
      await SetupAction.type();
    });
    test(
      "There should be the same number of prompt elements",
      StateTest.PromptForm.havePromptCount(2)
    );
    test("Form should not be submitted", StateTest.PromptForm.wasNotSubmitted);
    test(
      "Second thumbnail an image",
      StateTest.PromptForm.hasPromptElementThumbnailBeAnImage(1)
    );
    test("Second prompt element is not modified", () => {
      StateTest.PromptForm.hasPromptElementThumbnailBeAnImage(1)();
      StateTest.PromptForm.hasPromptElementTextAreaContent(1, SECONDTYPE)();
    });
    test("First prompt should be updated", () => {
      StateTest.PromptForm.hasPromptElementThumbnailBeAnImage(0)();
      StateTest.PromptForm.hasPromptElementTextAreaContent(
        0,
        FIRSTTYPE + mockPrompt
      )();
    });
  });
});
