import { screen, render } from "@testing-library/react";
import { expect, test, describe, beforeEach, vi } from "vitest";
import { TestComponent, InitialFormData } from "./PromptElement.helper";
import React = require("react");
import { theme } from "./theme";
import { SetupAction, StateTest } from "./helper";

global.URL.createObjectURL = vi.fn(() => "testImage.png");

const EmptyStateDisabled = () => {
  describe("Empty state disabled - no thumbnail, no prompt", () => {
    test("textarea should be rendered correctly", () => {
      StateTest.TextArea.renderDisabled();
    });
    test("upload canvas rendered correctly", StateTest.Thumnail.rendered);
    test(
      "prompt element buttons should be rendered",
      StateTest.PromptButtons.rendered
    );
    test(
      "thumbnail buttons should not be rendered",
      StateTest.Thumnail.unUploaded
    );
    test("text area content should be empty", StateTest.TextArea.empty);
    test(
      "upload canvas should be an upload button",
      StateTest.Thumnail.isNotAnImage
    );
    test(
      "prompt element buttons should be invisible",
      StateTest.PromptButtons.unhovered
    );
  });
};

const EmptyStateDisabledHovered = () => {
  describe("Hovered + Empty state disabled - no thumbnail, no prompt", () => {
    test(
      "textarea should be rendered correctly",
      StateTest.TextArea.renderDisabled
    );
    test("upload canvas rendered correctly", StateTest.Thumnail.rendered);
    test(
      "prompt element buttons should be rendered",
      StateTest.PromptButtons.rendered
    );
    test(
      "thumbnail buttons should not be rendered",
      StateTest.Thumnail.unUploaded
    );
    test("text area content should be empty", StateTest.TextArea.empty);
    test(
      "upload canvas should be an upload button",
      StateTest.Thumnail.isNotAnImage
    );
    test(
      "prompt element buttons should be invisible",
      StateTest.PromptButtons.unhovered
    );
  });
};

const EmptyState = () => {
  describe("Empty state - no thumbnail, no prompt", () => {
    test(
      "textarea should be rendered correctly",
      StateTest.TextArea.renderEnabled
    );
    test("upload canvas rendered correctly", StateTest.Thumnail.rendered);
    test(
      "prompt element buttons should be rendered",
      StateTest.PromptButtons.rendered
    );
    test(
      "thumbnail buttons should not be rendered",
      StateTest.Thumnail.unUploaded
    );
    test("text area content should be empty", StateTest.TextArea.empty);
    test(
      "upload canvas should be an upload button",
      StateTest.Thumnail.isNotAnImage
    );
    test(
      "prompt element buttons should be invisible",
      StateTest.PromptButtons.unhovered
    );
  });
};

const EmptyStateHovered = () => {
  describe("Hover + Empty state - no thumbnail, no prompt", () => {
    test(
      "textarea should be rendered correctly",
      StateTest.TextArea.renderEnabled
    );
    test("upload canvas rendered correctly", StateTest.Thumnail.rendered);
    test(
      "prompt element buttons should be rendered",
      StateTest.PromptButtons.rendered
    );
    test(
      "thumbnail buttons should not be rendered",
      StateTest.Thumnail.unUploaded
    );
    test("text area content should be empty", StateTest.TextArea.empty);
    test(
      "upload canvas should be an upload button",
      StateTest.Thumnail.isNotAnImage
    );
    test(
      "prompt element buttons should be visible",
      StateTest.PromptButtons.hovered
    );
  });
};

const ThumbnailNoPrompt = () => {
  describe("Has thumbnail, no prompt", () => {
    test(
      "textarea should be rendered correctly",
      StateTest.TextArea.renderEnabled
    );
    test("upload canvas rendered correctly", StateTest.Thumnail.rendered);
    test(
      "prompt element buttons should be rendered",
      StateTest.PromptButtons.rendered
    );
    test("thumbnail buttons should be rendered", StateTest.Thumnail.uploaded);
    test("text area content should be empty", StateTest.TextArea.empty);
    test("upload canvas should be an image", StateTest.Thumnail.isAnImage);
    test("thumbnail buttons should be invisible", StateTest.Thumnail.unhovered);
    test(
      "prompt element buttons should be invisible",
      StateTest.PromptButtons.unhovered
    );
  });
};

const ThumbnailNoPromptHovered = () => {
  describe("Hover + Has thumbnail, no prompt", () => {
    test(
      "textarea should be rendered correctly",
      StateTest.TextArea.renderEnabled
    );
    test("upload canvas rendered correctly", StateTest.Thumnail.rendered);
    test(
      "prompt element buttons should be rendered",
      StateTest.PromptButtons.rendered
    );
    test("thumbnail buttons should be rendered", StateTest.Thumnail.uploaded);
    test("text area content should be empty", StateTest.TextArea.empty);
    test("upload canvas should be an image", StateTest.Thumnail.isAnImage);
    test("thumbnail buttons should be visible", StateTest.Thumnail.hovered);
    test(
      "prompt element buttons should be visible",
      StateTest.PromptButtons.hovered
    );
  });
};

const ThumbnailPrompt = () => {
  describe("Has thumbnail and prompt", () => {
    test(
      "textarea should be rendered correctly",
      StateTest.TextArea.renderEnabled
    );
    test("upload canvas rendered correctly", StateTest.Thumnail.rendered);
    test(
      "prompt element buttons should be rendered",
      StateTest.PromptButtons.rendered
    );
    test("thumbnail buttons should be rendered", StateTest.Thumnail.uploaded);
    test("text area content should have content", StateTest.TextArea.typed);
    test("upload canvas should be an image", StateTest.Thumnail.isAnImage);
    test("thumbnail buttons should be invisible", StateTest.Thumnail.unhovered);
    test(
      "prompt element buttons should be invisible",
      StateTest.PromptButtons.unhovered
    );
  });
};

const ThumbnailPromptHovered = () => {
  describe("Hover + Has thumbnail and prompt", () => {
    test(
      "textarea should be rendered correctly",
      StateTest.TextArea.renderEnabled
    );
    test("upload canvas rendered correctly", StateTest.Thumnail.rendered);
    test(
      "prompt element buttons should be rendered",
      StateTest.PromptButtons.rendered
    );
    test("thumbnail buttons should be rendered", StateTest.Thumnail.uploaded);
    test("text area content should have content", StateTest.TextArea.typed);
    test("upload canvas should be an image", StateTest.Thumnail.isAnImage);
    test("thumbnail buttons should be visible", StateTest.Thumnail.hovered);
    test(
      "prompt element buttons should be visible",
      StateTest.PromptButtons.hovered
    );
  });
};

const NoThumbnailPrompt = () => {
  describe("No thumbnail, has prompt", () => {
    test(
      "textarea should be rendered correctly",
      StateTest.TextArea.renderEnabled
    );
    test("upload canvas rendered correctly", StateTest.Thumnail.rendered);
    test(
      "prompt element buttons should be rendered",
      StateTest.PromptButtons.rendered
    );
    test(
      "thumbnail buttons should not be rendered",
      StateTest.Thumnail.unUploaded
    );
    test("text area content should have content", StateTest.TextArea.typed);
    test(
      "upload canvas should be an upload button",
      StateTest.Thumnail.isNotAnImage
    );
    test(
      "prompt element buttons should be invisible",
      StateTest.PromptButtons.unhovered
    );
  });
};

const NoThumbnailPromptHovered = () => {
  describe("Empty state - no thumbnail, has prompt", () => {
    test(
      "textarea should be rendered correctly",
      StateTest.TextArea.renderEnabled
    );
    test("upload canvas rendered correctly", StateTest.Thumnail.rendered);
    test(
      "prompt element buttons should be rendered",
      StateTest.PromptButtons.rendered
    );
    test(
      "thumbnail buttons should not be rendered",
      StateTest.Thumnail.unUploaded
    );
    test("text area content should have content", StateTest.TextArea.typed);
    test(
      "upload canvas should be an upload button",
      StateTest.Thumnail.isNotAnImage
    );
    test(
      "prompt element buttons should be visible",
      StateTest.PromptButtons.hovered
    );
  });
};

const TestFromEnabled = () => {
  beforeEach(() => {
    render(
      <TestComponent
        initialEditing={true}
        initialFormData={InitialFormData}
        value={theme}
      />
    );
  });
  describe("when first rendered", EmptyState);
  describe("when hover", () => {
    beforeEach(SetupAction.hoverOnUpload);
    EmptyStateHovered();
  });
  describe("when upload an image", () => {
    beforeEach(SetupAction.upload);
    ThumbnailNoPrompt();
    describe("when hovered", () => {
      beforeEach(SetupAction.hoverOnThumbnail);
      ThumbnailNoPromptHovered();
    });
    describe("when type", () => {
      beforeEach(SetupAction.type);
      ThumbnailPrompt();
      describe("when reupload", () => {
        beforeEach(SetupAction.reupload);
        ThumbnailPrompt();
      });
      describe("when remove", () => {
        beforeEach(SetupAction.clickDelete);
        NoThumbnailPromptHovered();
      });
      describe("when hovered", () => {
        beforeEach(SetupAction.hoverOnThumbnail);
        ThumbnailPromptHovered();
      });
    });
    describe("when reupload", () => {
      beforeEach(SetupAction.reupload);
      ThumbnailNoPrompt();
    });
    describe("when remove", () => {
      beforeEach(SetupAction.clickDelete);
      EmptyStateHovered();
    });
  });
  describe("when type", () => {
    beforeEach(SetupAction.type);
    NoThumbnailPrompt();
    describe("when hovered", () => {
      beforeEach(SetupAction.hoverOnUpload);
      NoThumbnailPromptHovered();
    });
    describe("when upload", () => {
      beforeEach(SetupAction.upload);
      ThumbnailPrompt();
    });
  });
  describe("when click on edit", () => {
    beforeEach(SetupAction.clickEdit);
    EmptyStateDisabled();
  });
};


TestFromEnabled();
