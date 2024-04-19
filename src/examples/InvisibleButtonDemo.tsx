import * as SButton from "../components/built/Buttons";
import * as React from "react";

function Demo({ state }) {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <SButton.InvisibleButtonGroup visibleState={state}>
        <SButton.UploadButton tooltipContent="Upload" />
        <SButton.DownloadButton tooltipContent="Download" />
      </SButton.InvisibleButtonGroup>
    </div>
  );
}

export { Demo };
