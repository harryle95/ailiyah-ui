import * as Form from "../components/primitives/Form";
import * as React from "react";
import { Button } from "../components/themed";

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
        {({ onFileRemoved }) => {
          return (
            <>
              <Button.DeleteButton tooltipContent="Delete" onClick={onFileRemoved} />
              <Form.Upload.Trigger
                tooltipContent="Upload"
                onClick={() => console.log("Clicked")}
              >
                <Button.UploadIcon themeName="Icons" />
              </Form.Upload.Trigger>
            </>
          );
        }}
      </Form.Upload.Root>
    </div>
  );
}

export { Demo };
