import { screen, render } from "@testing-library/react";
import { expect, describe, test } from "vitest";
import userEvent from "@testing-library/user-event";
import React from "react";
import "../../../index.css";
import { TestComponent } from "./Thumbnail.stories";

const user = userEvent.setup();

describe("Given a thumbnail with state set to false", () => {
  test("should have buttons be invisible on render", () => {
    render(<TestComponent />);
    expect(screen.getByTitle("button-group")).not.toBeVisible();
    expect(screen.getByTitle("edit-button")).not.toBeVisible();
    expect(screen.getByTitle("delete-button")).not.toBeVisible();
  });

  test("should be visible on hover and invisible on unhover", async () => {
    render(<TestComponent />);
    await user.hover(screen.getByTitle("thumbnail"));
    expect(screen.getByTitle("button-group")).toBeVisible();
    expect(screen.getByTitle("edit-button")).toBeVisible();
    expect(screen.getByTitle("delete-button")).toBeVisible();

    // unhover - invisible again
    await user.unhover(screen.getByTitle("thumbnail"));
    expect(screen.getByTitle("button-group")).not.toBeVisible();
    expect(screen.getByTitle("edit-button")).not.toBeVisible();
    expect(screen.getByTitle("delete-button")).not.toBeVisible();
  });
});
