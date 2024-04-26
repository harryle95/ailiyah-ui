import { describe, test, expect } from "vitest";
import { screen, render } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import React from "react";
import { Root, Trigger, Cancel } from "./Upload";

let user = userEvent.setup();
const file = new File(["hello"], "hello.png", { type: "image/png" });

function Thumbnail() {
  const [thumbnail, setThumbnail] = React.useState("");
  const onFileUploaded = (e) => {
    if (e.currentTarget.files) {
      setThumbnail("uploaded.png");
    }
  };
  const onFileRemoved = () => setThumbnail("");
  return (
    <div>
      {thumbnail ? (
        <img src={thumbnail} alt="thumbnail" title="thumbnail" />
      ) : (
        <></>
      )}
      <Root onFileUploaded={onFileUploaded} onFileRemoved={onFileRemoved}>
        <Trigger title="upload-button">Upload</Trigger>
        <Cancel title="cancel-button">Remove</Cancel>
      </Root>
    </div>
  );
}

describe("Test upload component", () => {
  test("at startup should not have thumbnail", () => {
    render(<Thumbnail />);
    expect(() => screen.getByTitle("thumbnail")).toThrowError();
  });

  test("when cancel after startup should not have thumbnail", async () => {
    render(<Thumbnail />);
    let inputElement = screen.getByTitle("file-upload");
    await user.click(screen.getByTitle("cancel-button"));
    expect(() => screen.getByTitle("thumbnail")).toThrowError();
    // @ts-ignore
    expect(inputElement.files.length).toBe(0);
  });

  test("when upload thumbnail get set", async () => {
    render(<Thumbnail />);
    let inputElement = screen.getByTitle("file-upload");
    await user.upload(inputElement, file);

    expect(screen.getByTitle("thumbnail").getAttribute("src")).toBeDefined();
    // @ts-ignore
    expect(inputElement.files.length).toBe(1);
  });

  test("when upload then cancel, thumbnail should be removed", async () => {
    render(<Thumbnail />);
    let inputElement = screen.getByTitle("file-upload");
    await user.upload(inputElement, file);
    await user.click(screen.getByTitle("cancel-button"));
    expect(() => screen.getByTitle("thumbnail")).toThrowError();
    // @ts-ignore
    expect(inputElement.files.length).toBe(0);
  });
});
