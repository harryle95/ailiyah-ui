import * as SButton from "../components/built/Buttons";
import * as React from "react";

function Demo() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <SButton.PopOverButtonGroup className="flex p-0">
        <SButton.UploadButton tooltipContent="Upload" twPadding="p-0" />
        <SButton.DownloadButton tooltipContent="Download" />
      </SButton.PopOverButtonGroup>
    </div>
  );
}

export { Demo };
