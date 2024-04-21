import * as React from "react";
import { Button } from "../components/themed";

function Demo({ state }) {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Button.InvisibleButtonGroup visibleState={state}>
        <Button.UploadButton tooltipContent="Upload" />
        <Button.DownloadButton tooltipContent="Download" />
      </Button.InvisibleButtonGroup>
    </div>
  );
}

export { Demo };
