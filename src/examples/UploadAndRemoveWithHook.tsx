import * as Form from "../components/primitives/Form";
import * as React from "react";
import { UploadIcon, DeleteIcon } from "../components/built/Buttons";

function Demo() {
  return (
    <div className="flex h-screen w-screen items-center justify-center gap-x-4">
      <Form.Upload.Root
        onFileUploaded={(e) => {
          console.log("Upload file");
          console.log(e.currentTarget.files);
        }}
        onFileRemoved={() => {
          console.log("Remove Uploaded File");
        }}
      >
        <Form.Upload.Trigger
          tooltipContent="Upload"
          onClick={() => console.log("Clicked")}
        >
          <UploadIcon themeName="icons" />
        </Form.Upload.Trigger>
        <Form.Upload.Cancel tooltipContent="Remove">
          <DeleteIcon themeName="icons" />
        </Form.Upload.Cancel>
      </Form.Upload.Root>
    </div>
  );
}

export { Demo };
