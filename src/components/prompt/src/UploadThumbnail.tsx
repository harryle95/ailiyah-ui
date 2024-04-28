import { TailwindComponentProps } from "@ailiyah-ui/factory";
import * as Thumbnail from "../../thumbnail/src/Thumbnail";
import React from "react";
import { styled } from "@ailiyah-ui/factory";
import * as Upload from "@ailiyah-ui/upload";
import * as Button from "@ailiyah-ui/button";
import { UploadThumbnailOwnProps } from "./UploadThumbnail.types";

const UploadThumbnail = React.memo(
  React.forwardRef<
    HTMLDivElement,
    UploadThumbnailOwnProps & Omit<TailwindComponentProps<"div">, "children">
  >((props, ref) => {
    const { thumbnail, setThumbnail, editing = true, ...rest } = props;
    const displayThumbnail = thumbnail ? URL.createObjectURL(thumbnail) : "";
    const onFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.currentTarget.files) setThumbnail(e.currentTarget.files[0]);
    };
    const onFileRemoved = () => setThumbnail(null);
    return (
      <styled.div
        {...rest}
        themeName="PromptElementUploadThumbnailRoot"
        ref={ref}
      >
        <Thumbnail.Root themeName="UploadThumbnailRoot" initialState={false}>
          <Thumbnail.Content themeName="UploadThumbnailContent">
            <Upload.Root
              disabled={!editing}
              onFileUploaded={onFileUpload}
              onFileRemoved={onFileRemoved}
            >
              {!displayThumbnail ? (
                <Upload.Trigger themeName="UploadThumbnailCanvas">Upload</Upload.Trigger>
              ) : (
                <>
                  <Thumbnail.Image
                    src={displayThumbnail}
                    themeName="UploadThumbnailCanvas"
                  />
                  {!editing ? (
                    <></>
                  ) : (
                    <Thumbnail.Component
                      themeName="UploadThumbnailButtonGroup"
                      compLocation="bottom-right"
                    >
                      <Upload.Trigger
                        themeName="UploadThumbnailUploadButton"
                        tooltipContent="Upload"
                      >
                        <Button.UploadIcon />
                      </Upload.Trigger>
                      <Upload.Cancel
                        themeName="UploadThumbnailDeleteButton"
                        tooltipContent="Remove"
                      >
                        <Button.DeleteIcon />
                      </Upload.Cancel>
                    </Thumbnail.Component>
                  )}
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
