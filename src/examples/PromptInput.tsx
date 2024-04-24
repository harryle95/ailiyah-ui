import * as Form from "../components/primitives/Form";
import * as React from "react";
import { Button } from "../components/themed";
import { createStateBox } from "../components/primitives/Box";
import { styled } from "../components/context/src";

const [Box, useBoxContext] = createStateBox("ThumbnailBox");

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
        <Box
          activeState={true}
          hoverSetActive={false}
          twFlex="flex"
          twWidth="w-fit"
          twHeight="h-fit"
          twGap="gap-x-6"
          twPadding="p-6"
        >
          {thumbnail === "" ? (
            <Form.Upload.Trigger
              onClick={() => console.log("Clicked")}
              twWidth="w-[200px]"
              twHeight="h-[200px]"
              twFlex="flex"
              twAlignItems="items-center"
              twJustifyContent="justify-center"
              twFontWeight="font-bold"
              twFontSize="text-2xl"
              twBackgroundColor="bg-gray-100"
              twBorderRadius="rounded-md"
            >
              Upload
            </Form.Upload.Trigger>
          ) : (
            <Box
              activeState={false}
              hoverSetActive={true}
              twWidth="w-[200px]"
              twHeight="h-[200px]"
              twPosition="relative"
              twBorderRadius="rounded-md"
            >
              {(state) => (
                <>
                  <styled.img
                    src={thumbnail}
                    twWidth="w-full"
                    twHeight="h-full"
                  />
                  <Box
                    activeState={state}
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
                      <Form.Upload.Trigger
                        onClick={() => console.log("Clicked")}
                      >
                        <Button.UploadIcon themeName="Icons" />
                      </Form.Upload.Trigger>
                      <Form.Upload.Cancel>
                        <Button.DeleteIcon themeName="Icons" />
                      </Form.Upload.Cancel>
                    </Button.PopOverButtonGroup>
                  </Box>
                </>
              )}
            </Box>
          )}
          <styled.textarea twBorderWidth="border-2" twWidth="w-[500px]" twBorderRadius="rounded-md" twPadding="p-4" />
        </Box>
      </Form.Upload.Root>
    </div>
  );
}

export { Demo };
