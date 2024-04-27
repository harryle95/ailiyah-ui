import { TailwindComponentProps } from "@ailiyah-ui/factory";
import * as Thumbnail from "./Thumbnail";
import React from "react";
import { styled } from "@ailiyah-ui/factory";
import * as Upload from "@ailiyah-ui/upload";
import * as Button from "@ailiyah-ui/button";

interface UploadThumbnailOwnProps {
  thumbnail?: Blob | MediaSource;
  setThumbnail: Function;
  disabled?:boolean,
}

const UploadThumbnail = React.memo(
  React.forwardRef<
    HTMLDivElement,
    UploadThumbnailOwnProps & Omit<TailwindComponentProps<"div">, "children">
  >((props, ref) => {
    const { thumbnail, setThumbnail, disabled=false, ...rest } = props;
    const displayThumbnail = thumbnail ? URL.createObjectURL(thumbnail) : "";
    const onFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.currentTarget.files) setThumbnail(e.currentTarget.files[0]);
    };
    const onFileRemoved = () => setThumbnail(null);
    return (
      <styled.div {...rest} ref={ref}>
        <Thumbnail.Root themeName="UploadThumbnailRoot" initialState={false}>
          <Thumbnail.Content themeName="UploadThumbnailContent">
            <Upload.Root
              disabled={disabled}
              onFileUploaded={onFileUpload}
              onFileRemoved={onFileRemoved}
            >
              {!displayThumbnail ? (
                <Upload.Trigger themeName="UploadCanvas">Upload</Upload.Trigger>
              ) : (
                <>
                  <Thumbnail.Image
                    src={displayThumbnail}
                    themeName="UploadCanvas"
                  />
                  {disabled? <></>: <Thumbnail.Component
                    themeName="UploadThumbnailButtonGroup"
                    compLocation="bottom-right"
                  >
                    <Upload.Trigger themeName="UploadThumbnailUploadButton" tooltipContent="Upload">
                      <Button.UploadIcon />
                    </Upload.Trigger>
                    <Upload.Cancel themeName="UploadThumbnailDeleteButton" tooltipContent="Remove">
                      <Button.DeleteIcon />
                    </Upload.Cancel>
                  </Thumbnail.Component>}
                </>
              )}
            </Upload.Root>
          </Thumbnail.Content>
        </Thumbnail.Root>
      </styled.div>
    );
  })
);

export { UploadThumbnail };
