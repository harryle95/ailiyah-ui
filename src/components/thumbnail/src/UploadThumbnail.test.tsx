import React from "react";
import { screen, render } from "@testing-library/react";
import { expect, describe, test, vi, beforeEach } from "vitest";
import userEvent from "@testing-library/user-event";
import { TestComponent, Default } from "./UploadThumbnail.stories";

const user = userEvent.setup();

const testImage = new File(["hello"], "testImage.png", { type: "image/png" });

// Mock URL createObjectURL function
global.URL.createObjectURL = vi.fn(() => "testImage.png");

describe("Given a disabled upload thumbnail", () => {
  describe("when first rendered", () => {
    beforeEach(async () => {
      render(<TestComponent disabled={true} value={Default.args!.value!} />);
    });
    test("Content Area should be in the document", () => {
      let contentArea = document.querySelector(".UploadThumbnailContent");
      expect(contentArea).toBeInTheDocument();
    });
    test("Upload button should be visible", () => {
      expect(screen.getByText("Upload")).toBeInTheDocument();
      expect(screen.getByText("Upload")).toBeVisible();
    });

    test("Image should not have been rendered", () => {
      expect(() => screen.getByRole("img")).toThrowError();
    });
    test("Button group should not have been rendered", () => {
      let buttonGroup = document.querySelector(".UploadThumbnailButtonGroup");
      expect(buttonGroup).toBeNull();
    });
    test("Hovering on content area should not make button group visible", async () => {
      let contentArea = document.querySelector(".UploadThumbnailContent")!;
      await user.hover(contentArea);
      let buttonGroup = document.querySelector(".UploadThumbnailButtonGroup");
      expect(buttonGroup).toBeNull();
    });
    describe("when a user try to upload", () => {
      beforeEach(async () => {
        let inputComponent = screen.getByTitle("file-upload");
        await user.upload(inputComponent, testImage);
        await user.unhover(inputComponent);
      });
      test("Upload button should be visible", () => {
        expect(screen.getByText("Upload")).toBeInTheDocument();
        expect(screen.getByText("Upload")).toBeVisible();
      });

      test("Image should not have been rendered", () => {
        expect(() => screen.getByRole("img")).toThrowError();
      });
      test("Button group should not have been rendered", () => {
        let buttonGroup = document.querySelector(".UploadThumbnailButtonGroup");
        expect(buttonGroup).toBeNull();
      });
      test("Hovering on content area should not make button group visible", async () => {
        let contentArea = document.querySelector(".UploadThumbnailContent")!;
        await user.hover(contentArea);
        let buttonGroup = document.querySelector(".UploadThumbnailButtonGroup");
        expect(buttonGroup).toBeNull();
      });
    });
  });
});

describe("Given an upload thumbnail", () => {
  describe("when first rendered", () => {
    beforeEach(async () => {
      render(<TestComponent disabled={false} value={Default.args!.value!} />);
    });
    test("Content Area should be in the document", () => {
      let contentArea = document.querySelector(".UploadThumbnailContent");
      expect(contentArea).toBeInTheDocument();
    });
    test("Upload button should be visible", () => {
      expect(screen.getByText("Upload")).toBeInTheDocument();
      expect(screen.getByText("Upload")).toBeVisible();
    });

    test("Image should not have been rendered", () => {
      expect(() => screen.getByRole("img")).toThrowError();
    });
    test("Button group should not have been rendered", () => {
      let buttonGroup = document.querySelector(".UploadThumbnailButtonGroup");
      expect(buttonGroup).toBeNull();
    });
    test("Hovering on content area should not make button group visible", async () => {
      let contentArea = document.querySelector(".UploadThumbnailContent")!;
      await user.hover(contentArea);
      let buttonGroup = document.querySelector(".UploadThumbnailButtonGroup");
      expect(buttonGroup).toBeNull();
    });
    describe("when an image has been uploaded", async () => {
      beforeEach(async () => {
        let inputComponent = screen.getByTitle("file-upload");
        await user.upload(inputComponent, testImage);
        await user.unhover(inputComponent);
      });
      test("Upload button should no longer be rendered", async () => {
        expect(screen.queryByText("Upload")).toBeNull();
      });
      test("Image should be rendered", async () => {
        expect(screen.getByRole("img")).toBeInTheDocument();
      });
      test("Button group should be invisible", async () => {
        let buttonGroup = document.querySelector(".UploadThumbnailButtonGroup");
        expect(buttonGroup).toBeInTheDocument();
        expect(buttonGroup).not.toBeVisible();
      });
      describe("When hovering on the image", () => {
        beforeEach(async () => {
          let contentArea = document.querySelector(".UploadThumbnailContent")!;
          await user.hover(contentArea);
        });
        test("Button group should be visible once hovered", async () => {
          let buttonGroup = document.querySelector(
            ".UploadThumbnailButtonGroup"
          );
          expect(buttonGroup).toBeInTheDocument();
          expect(buttonGroup).toBeVisible();
        });
        test("Delete button should be visible once hovered", async () => {
          let deleteButton = document.querySelector(
            ".UploadThumbnailDeleteButton"
          );
          expect(deleteButton).toBeInTheDocument();
          expect(deleteButton).toBeVisible();
        });
        describe("When clicking on the delete button", () => {
          beforeEach(async () => {
            let deleteButton = document.querySelector(
              ".UploadThumbnailDeleteButton"
            )!;
            await user.click(deleteButton);
          });
          test("Upload button should be visible", () => {
            expect(screen.getByText("Upload")).toBeInTheDocument();
            expect(screen.getByText("Upload")).toBeVisible();
          });

          test("Image should not have been rendered", () => {
            expect(() => screen.getByRole("img")).toThrowError();
          });
          test("Button group should not have been rendered", () => {
            let buttonGroup = document.querySelector(
              ".UploadThumbnailButtonGroup"
            );
            expect(buttonGroup).toBeNull();
          });
          test("Hovering on content area should not make button group visible", async () => {
            let contentArea = document.querySelector(
              ".UploadThumbnailContent"
            )!;
            await user.hover(contentArea);
            let buttonGroup = document.querySelector(
              ".UploadThumbnailButtonGroup"
            );
            expect(buttonGroup).toBeNull();
          });
        });
      });
    });
  });
});
