import React from "react";
import { screen, render } from "@testing-library/react";
import { expect, describe, test } from "vitest";
import userEvent from "@testing-library/user-event";
import { defaultTheme } from "@ailiyah-ui/utils";
import { TestComponent } from "./UploadThumbnail.stories";

const user = userEvent.setup();

describe("Given an upload thumbnail", () => {
  describe("when first rendered", () => {
    test("Content Area should be in the document", () => {
      render(<TestComponent value={defaultTheme} />);
      let contentArea = document.querySelector(".UploadThumbnailContent");
      expect(contentArea).toBeInTheDocument();
    });
    test("Upload button should be visible", () => {
      render(<TestComponent value={defaultTheme} />);
      expect(screen.getByText("Upload")).toBeInTheDocument();
      expect(screen.getByText("Upload")).toBeVisible();
    });

    test("Image should not have been rendered", () => {
      render(<TestComponent value={defaultTheme} />);
      expect(() => screen.getByRole("img")).toThrowError();
    });
    test("Button group should not have been rendered", () => {
      render(<TestComponent value={defaultTheme} />);
      let buttonGroup = document.querySelector(".UploadThumbnailButtonGroup");
      expect(buttonGroup).toBeNull();
    });
    test("Hovering on content area should not make button group visible", async () => {
      render(<TestComponent value={defaultTheme} />);
      let contentArea = document.querySelector(".UploadThumbnailContent")!;
      await user.hover(contentArea)
      let buttonGroup = document.querySelector(".UploadThumbnailButtonGroup");
      expect(buttonGroup).toBeNull();
    });
  });
});
