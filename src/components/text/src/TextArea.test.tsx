import { expect, describe, test, beforeEach } from "vitest";
import { screen, render } from "@testing-library/react";
import {
  ActionFactory,
  EMPTYPROMPT,
  FIRSTTYPE,
  NONEMPTYPROMPT,
  SECONDTYPE,
  TextAreaWithSubmitAndEdit,
} from "./TextArea.helper";
import React from "react";
import userEvent from "@testing-library/user-event";

const Validate = {
  submitButton: {
    rendered: () => {
      let button = document.querySelector(".TextAreaSubmitButton");
      expect(button).toBeInTheDocument();
      expect(button).toBeVisible();
    },
    isEnabled: () => {
      let button = document.querySelector(".TextAreaSubmitButton");
      expect(button).not.toHaveAttribute("disabled");
    },
    isDisabled: () => {
      let button = document.querySelector(".TextAreaSubmitButton");
      expect(button).toHaveAttribute("disabled");
    },
  },
  textArea: {
    rendered: () => {
      let textArea = document.querySelector(".TextAreaTextArea");
      expect(textArea).toBeInTheDocument();
      expect(textArea).toBeVisible();
    },
    toHaveContent: (content: string) => {
      return () => {
        let textArea = document.querySelector(".TextAreaTextArea");
        expect(textArea?.textContent).toBe(content);
      };
    },
  },
};

let Action = ActionFactory(userEvent);

describe("Given a textarea initially empty", () => {
  beforeEach(() => {
    render(
      <TextAreaWithSubmitAndEdit initPrompt={EMPTYPROMPT} onClick={() => {}} />
    );
  });
  test("textarea rendered correctly", Validate.textArea.rendered);
  test("textarea content is empty", Validate.textArea.toHaveContent(""));
  test("submit button is rendered correctly", Validate.submitButton.rendered);
  test("submit button is disabled", Validate.submitButton.isDisabled);
  describe("when type Hello", () => {
    beforeEach(Action.typeFirstPrompt);
    test(
      "textarea content is Hello",
      Validate.textArea.toHaveContent(FIRSTTYPE)
    );
    test("button is enabled", Validate.submitButton.isEnabled);
    describe("when type World", () => {
      beforeEach(Action.typeSecondPrompt);
      test(
        "textarea content is HelloWorld",
        Validate.textArea.toHaveContent(FIRSTTYPE + SECONDTYPE)
      );
      test("button is enabled", Validate.submitButton.isEnabled);
      describe("when clear", () => {
        beforeEach(Action.clearTextField);
        test("textarea is cleared", Validate.textArea.toHaveContent(""));
        test("button is disabled", Validate.submitButton.isDisabled);
      });
    });
    describe("when clear", () => {
      beforeEach(Action.clearTextField);
      test("textarea is cleared", Validate.textArea.toHaveContent(""));
      test("button is disabled", Validate.submitButton.isDisabled);
    });
  });
});

describe("When given a text form initially not empty", () => {
  beforeEach(() => {
    render(
      <TextAreaWithSubmitAndEdit
        initPrompt={NONEMPTYPROMPT}
        onClick={() => {}}
      />
    );
  });
  test("textarea rendered correctly", Validate.textArea.rendered);
  test(
    "textarea content is correctly initialised",
    Validate.textArea.toHaveContent(NONEMPTYPROMPT)
  );
  test("submit button rendered correctly", Validate.submitButton.rendered);
  test("submit button is disabled", Validate.submitButton.isDisabled);
  describe("when clear", () => {
    beforeEach(Action.clearTextField);
    test("textarea is cleared", Validate.textArea.toHaveContent(""));
    test("button is disabled", Validate.submitButton.isDisabled);
    describe("when retype initial content", () => {
      beforeEach(Action.typeInitialPrompt);
      test("submit button is disabled", Validate.submitButton.isDisabled);
      test(
        "textarea content is correctly set",
        Validate.textArea.toHaveContent(NONEMPTYPROMPT)
      );
    });
  });
});
