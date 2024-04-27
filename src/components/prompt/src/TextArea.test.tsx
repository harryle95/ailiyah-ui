import { screen, render } from "@testing-library/react";
import { expect, describe, test, vi, beforeEach } from "vitest";
import userEvent from "@testing-library/user-event";
import { TextArea } from "./TextArea";
import React from "react";

const initialPrompt = "Hello";
const addedPrompt = " World";
const user = userEvent.setup();

function TestComponent() {
  const [editing, setEditing] = React.useState(() => false);
  const [prompt, setPrompt] = React.useState(() => initialPrompt);

  const EditButton = (
    <button onClick={(e) => setEditing(!editing)} title="edit-button">
      Edit
    </button>
  );
  return (
    <>
      <TextArea
        title="text-content"
        editing={editing}
        setPrompt={setPrompt}
        prompt={prompt}
      />
      {EditButton}
    </>
  );
}

describe("Given text area initially not in editing mode", () => {
  beforeEach(() => {
    render(<TestComponent />);
  });
  test("text area should be a div element", async () => {
    expect(screen.getByText(initialPrompt).tagName).toBe("DIV");
  });
  test("when not in editing user should not be able to enter text value", async () => {
    await user.type(screen.getByText(initialPrompt), addedPrompt);
    expect(screen.getByTitle("text-content").textContent).toBe(initialPrompt);
  });
  describe("when entering editing mode", async () => {
    beforeEach(() => {
      screen.getByTitle("edit-button").click();
    });
    test("text area should be a div element", async () => {
      expect(screen.getByText(initialPrompt).tagName).toBe("TEXTAREA");
    });
    test("user should be able to enter text value", async () => {
      await user.type(screen.getByText(initialPrompt), addedPrompt);
      expect(screen.getByTitle("text-content").textContent).toBe(
        initialPrompt + addedPrompt
      );
    });
    describe("when finished entering text and setting edit to false", async () => {
      beforeEach(async () => {
        await user.type(screen.getByText(initialPrompt), addedPrompt);
        screen.getByTitle("edit-button").click();
      });
      test("text area should be a div element", async () => {
        expect(screen.getByTitle("text-content").tagName).toBe("DIV");
      });
      test("text area content should be the final value", async () => {
        expect(screen.getByTitle("text-content").textContent).toBe(
          initialPrompt + addedPrompt
        );
      });
    });
  });
});
