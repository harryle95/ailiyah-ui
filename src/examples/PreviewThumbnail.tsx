import * as Form from "../components/primitives/Form";
import * as React from "react";
import { Button } from "../components/themed";
import { createBox } from "../components/primitives/Box";
import { styled } from "../components/context";

const [Box, useBoxContext] = createBox("ThumbnailBox");

function Demo() {
  const [thumbnail, setThumbnail] = React.useState<string>("");

  return (
    <div className="flex h-screen w-screen items-center justify-center gap-x-4">
      <Form.Upload.Root
        accept="image/*"
        onFileUploaded={(e) => {
          console.log("Upload file");
          console.log(e.currentTarget.files);
          if (e.currentTarget.files) {
            setThumbnail(URL.createObjectURL(e.currentTarget.files[0]));
          }
        }}
        onFileRemoved={() => {
          console.log("Remove Uploaded File");
          setThumbnail("");
        }}
      >
        {thumbnail === "" ? (
          <Form.Upload.Trigger
            onClick={() => console.log("Clicked")}
            twWidth="w-[500px]"
            twHeight="h-[500px]"
            twBorderWidth="border-2"
            twFlex="flex"
            twAlignItems="items-center"
            twJustifyContent="justify-center"
            twFontWeight="font-bold"
            twFontSize="text-2xl"
          >
            Upload
          </Form.Upload.Trigger>
        ) : (
          <Box
            activeState={false}
            hoverSetActive={true}
            twWidth="w-[500px]"
            twHeight="h-[500px]"
            twBorderWidth="border-2"
            twPosition="relative"
          >
            {(state) => (
              <>
                <styled.img
                  src={thumbnail}
                  twWidth="w-full"
                  twHeight="h-full"
                />
                <Button.InvisibleButtonGroup
                  visibleState={state}
                  twPosition="absolute"
                  twTopRightBottomLeft="top-2 right-2"
                >
                  <Button.PopOverButtonGroup
                    twFlex="flex"
                    twPadding="p-2"
                    twBorderWidth="border-2"
                    twBorderRadius="rounded-md"
                    twGap="gap-x-2"
                    twWidth="w-fit"
                    twHeight="h-fit"
                  >
                    <Form.Upload.Trigger onClick={() => console.log("Clicked")}>
                      <Button.UploadIcon themeName="Icons" />
                    </Form.Upload.Trigger>
                    <Form.Upload.Cancel>
                      <Button.DeleteIcon themeName="Icons" />
                    </Form.Upload.Cancel>
                  </Button.PopOverButtonGroup>
                </Button.InvisibleButtonGroup>
              </>
            )}
          </Box>
        )}
      </Form.Upload.Root>
    </div>
  );
}

export { Demo };
