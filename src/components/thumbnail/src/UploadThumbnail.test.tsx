import React from "react";
import { PresetTheme } from "@ailiyah-ui/utils";
import { ThemeProvider } from "@ailiyah-ui/context";
import { UploadThumbnail } from "./UploadThumbnail";

export function TestComponent({ value }: { value: PresetTheme }) {
  const [thumbnail, setThumbnail] = React.useState<Blob | MediaSource>();

  return (
    <ThemeProvider value={value}>
      <UploadThumbnail thumbnail={thumbnail} setThumbnail={setThumbnail} />
    </ThemeProvider>
  );
}
