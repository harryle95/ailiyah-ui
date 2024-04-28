import { screen, render } from "@testing-library/react";
import { expect, test, describe, beforeEach, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import {
  TestComponent,
  theme,
  InitialFormData,
  mockPrompt,
} from "./PromptElement.helper";
import React = require("react");

global.URL.createObjectURL = vi.fn(() => "testImage.png");

const Actions = {
  render: async () => {
    render(
      <TestComponent
        value={theme}
        initialEditing={true}
        initialFormData={InitialFormData}
      />
    );
  },
  renderInactive: async () => {
    render(
      <TestComponent
        value={theme}
        initialEditing={false}
        initialFormData={InitialFormData}
      />
    );
  },
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
  },
  hoverOnUpload: async () => {
    await userEvent.hover(screen.getByText("Upload"));
  },
  hoverOnThumbnail: async () => {
    await userEvent.hover(document.querySelector(".UploadThumbnailRoot")!);
  },
  clickDelete: async () => {
    await userEvent.click(
      document.querySelector(".UploadThumbnailDeleteButton")!
    );
  },
  clickEdit: async () => {
    await userEvent.click(document.querySelector(".PromptElementEditButton")!);
  },
};

const Tests = {
  promptElementEditButton: {
    isInTheDocument: () => {
      expect(
        document.querySelector(".PromptElementEditButton")
      ).toBeInTheDocument();
    },
    isNotInTheDocument: () => {
      expect(
        document.querySelector(".PromptElementEditButton")
      ).not.toBeInTheDocument();
    },
    isVisible: () => {
      expect(document.querySelector(".PromptElementEditButton")).toBeVisible();
    },
    isInvisible: () => {
      expect(
        document.querySelector(".PromptElementEditButton")
      ).not.toBeVisible();
    },
  },
  uploadThumbnailButton: {
    isInTheDocument: () => {
      expect(
        document.querySelector(".UploadThumbnailButtonGroup")
      ).toBeInTheDocument();
      expect(
        document.querySelector(".UploadThumbnailDeleteButton")
      ).toBeInTheDocument();
    },
    isNotInTheDocument: () => {
      expect(document.querySelector(".UploadThumbnailButtonGroup")).toBeNull();
      expect(document.querySelector(".UploadThumbnailDeleteButton")).toBeNull();
    },
    isVisible: () => {
      expect(
        document.querySelector(".UploadThumbnailButtonGroup")
      ).toBeVisible();
      expect(
        document.querySelector(".UploadThumbnailDeleteButton")
      ).toBeVisible();
    },
    isInvisible: () => {
      expect(
        document.querySelector(".UploadThumbnailButtonGroup")
      ).not.toBeVisible();
      expect(
        document.querySelector(".UploadThumbnailDeleteButton")
      ).not.toBeVisible();
    },
  },
  uploadThumbnailCanvas: {
    isInTheDocument: () => {
      expect(
        document.querySelector(".UploadThumbnailCanvas")
      ).toBeInTheDocument();
    },
    isAnUploadForm: () => {
      expect(document.querySelector(".UploadThumbnailCanvas")?.tagName).toBe(
        "LABEL"
      );
    },
    isAnImage: () => {
      expect(document.querySelector(".UploadThumbnailCanvas")?.tagName).toBe(
        "IMG"
      );
    },
  },
  promptElementTextArea: {
    isInTheDocument: () => {
      expect(
        document.querySelector(".PromptElementTextArea")
      ).toBeInTheDocument();
    },
    isVisible: () => {
      expect(document.querySelector(".PromptElementTextArea")).toBeVisible();
    },
    isEnabled: () => {
      expect(
        document.querySelector(".PromptElementTextArea")
      ).not.toHaveAttribute("disabled");
    },
    isDisabled: () => {
      expect(document.querySelector(".PromptElementTextArea")?.tagName).toBe(
        "DIV"
      );
    },
    contentIsEmpty: () => {
      expect(
        document.querySelector(".PromptElementTextArea")?.textContent
      ).toBe("");
    },
    contentMatchesTyped: () => {
      expect(
        document.querySelector(".PromptElementTextArea")?.textContent
      ).toBe(mockPrompt);
    },
  },
};

const testActivePromptElement = () => {
  describe("when first rendered", () => {
    test(
      "text area is in the document",
      Tests.promptElementTextArea.isInTheDocument
    );
    test("text area is visible", Tests.promptElementTextArea.isVisible);
    test("text area is enabled", Tests.promptElementTextArea.isEnabled);
    test(
      "text area content is empty",
      Tests.promptElementTextArea.contentIsEmpty
    );
    test(
      "upload thumbnail canvas is in the document",
      Tests.uploadThumbnailCanvas.isInTheDocument
    );
    test(
      "upload thumbnail canvas is an upload form",
      Tests.uploadThumbnailCanvas.isAnUploadForm
    );
    test(
      "upload thumbnail buttons are not in the document",
      Tests.uploadThumbnailButton.isNotInTheDocument
    );
    test(
      "prompt element edit button is not in the document",
      Tests.promptElementEditButton.isNotInTheDocument
    );
    describe("when uploading an image", () => {
      beforeEach(Actions.upload);
      test(
        "upload thumbnail canvas is an image",
        Tests.uploadThumbnailCanvas.isAnImage
      );
      test(
        "text area content is still empty",
        Tests.promptElementTextArea.contentIsEmpty
      );
      test(
        "upload and delete buttons are in the document",
        Tests.uploadThumbnailButton.isInTheDocument
      );
      test(
        "upload and delete buttons are invisible",
        Tests.uploadThumbnailButton.isInvisible
      );
      describe("when hovering on the canvas", () => {
        beforeEach(Actions.hoverOnThumbnail);
        test(
          "upload and delete buttons are visible",
          Tests.uploadThumbnailButton.isVisible
        );
        describe("when clicking on the delete button", () => {
          beforeEach(Actions.clickDelete);
          test(
            "upload thumbnail is an upload button",
            Tests.uploadThumbnailCanvas.isAnUploadForm
          );
          test(
            "upload and delete buttons are not in the document",
            Tests.uploadThumbnailButton.isNotInTheDocument
          );
        });
        describe("when reuploading", () => {
          beforeEach(Actions.reupload);
          test(
            "upload thumbnail is an image",
            Tests.uploadThumbnailCanvas.isAnImage
          );
          test(
            "upload and delete buttons are in the document",
            Tests.uploadThumbnailButton.isInTheDocument
          );
          test(
            "upload and delete buttons are invisible",
            Tests.uploadThumbnailButton.isInvisible
          );
        });
        describe("when typing", () => {
          beforeEach(Actions.type);
          test(
            "upload thumbnail is an image",
            Tests.uploadThumbnailCanvas.isAnImage
          );
          test(
            "upload and delete buttons are in the document",
            Tests.uploadThumbnailButton.isInTheDocument
          );
          test(
            "textarea content is set to correct value",
            Tests.promptElementTextArea.contentMatchesTyped
          );
        });
      });
    });
    describe("when typing", () => {
      beforeEach(Actions.type);
      test(
        "textarea content is correct",
        Tests.promptElementTextArea.contentMatchesTyped
      );
      test(
        "upload thumbnail canvas is an upload form",
        Tests.uploadThumbnailCanvas.isAnUploadForm
      );
      test(
        "upload thumbnail buttons are not in the document",
        Tests.uploadThumbnailButton.isNotInTheDocument
      );
      test(
        "prompt element edit button is not in the document",
        Tests.promptElementEditButton.isNotInTheDocument
      );
      describe("when uploading an image", () => {
        beforeEach(Actions.upload);
        test(
          "upload thumbnail canvas is an image",
          Tests.uploadThumbnailCanvas.isAnImage
        );
        test(
          "text area content matches",
          Tests.promptElementTextArea.contentMatchesTyped
        );
        test(
          "upload and delete buttons are in the document",
          Tests.uploadThumbnailButton.isInTheDocument
        );
        test(
          "upload and delete buttons are invisible",
          Tests.uploadThumbnailButton.isInvisible
        );
      });
    });
  });
};

describe("Given a prompt element initially active", () => {
  beforeEach(Actions.render);
  testActivePromptElement();
});

describe("Given a prompt element initially inactive", () => {
  beforeEach(Actions.renderInactive);
  test("textare is disabled", Tests.promptElementTextArea.isDisabled);
  test(
    "edit button is in the document",
    Tests.promptElementEditButton.isInTheDocument
  );
  test("edit button is invisible", Tests.promptElementEditButton.isInvisible);
  describe("when hover on the upload form", () => {
    beforeEach(Actions.hoverOnUpload);
    test("edit button is visible", Tests.promptElementEditButton.isVisible);
    describe("when click on edit", () => {
      beforeEach(Actions.clickEdit);
      testActivePromptElement();
    });
  });
});
