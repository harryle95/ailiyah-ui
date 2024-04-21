import * as React from "react";
import { Button } from "../components/themed";

function Demo() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Button.PopOverButtonGroup className="flex p-0">
        <Button.UploadButton tooltipContent="Upload" twPadding="p-0" />
        <Button.DownloadButton tooltipContent="Download" />
      </Button.PopOverButtonGroup>
    </div>
  );
}

export { Demo };
