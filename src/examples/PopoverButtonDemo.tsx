import * as React from "react";
import * as Button from "@ailiyah-ui/button";

function Demo() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Button.PopOverButtonGroup className="flex p-2 border-2 gap-x-2">
        <Button.UploadButton twPadding="p-0" />
        <Button.DownloadButton />
      </Button.PopOverButtonGroup>
    </div>
  );
}

export { Demo };
