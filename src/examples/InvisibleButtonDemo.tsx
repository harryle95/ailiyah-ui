import * as React from "react";
import { Button } from "../components/themed";
import { createBox } from "../components/primitives/Box";

const [Box,_] = createBox("Box", null)

function Demo({ state }) {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Box activeState={state}>
        <Button.UploadButton tooltipContent="Upload" />
        <Button.DownloadButton tooltipContent="Download" />
      </Box>
    </div>
  );
}

export { Demo };
