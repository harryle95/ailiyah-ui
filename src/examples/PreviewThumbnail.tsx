import * as Form from "../components/primitives/Form";
import * as React from "react";
import { Button } from "../components/themed";
import { createStateBox } from "../components/primitives/Box";
import { ThemeProvider, defaultTheme, styled } from "../components/context";
import { Thumbnail } from "../components/themed";

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
          <Thumbnail.Root
            activeState={false}
            hoverSetActive={true}
            twWidth="w-[500px]"
            twHeight="h-[500px]"
            twBorderWidth="border-2"
            twPosition="relative"
          >
            <Thumbnail.Content
              twBackgroundColor="bg-transparent"
              twPadding="pb-14"
              twPosition="relative"
            >
              <Thumbnail.Image
                src={thumbnail}
                twWidth="w-full"
                twHeight="h-full"
                twAspectRatio="aspect-square"
              />
              <ThemeProvider
                value={{
                  ...defaultTheme,
                  Icons: { twWidth: "w-9", twHeight: "h-9" },
                }}
              >
                <Thumbnail.Component
                  compLocation="bottom-right"
                  twDisplay="data-[state=inactive]:hidden"
                >
                  <styled.div
                    twFlex="flex"
                    twPadding="p-2"
                    twBorderRadius="rounded-md"
                    twGap="gap-x-2"
                    twWidth="w-fit"
                    twHeight="h-fit"
                  >
                    <Form.Upload.Trigger
                      tooltipContent="Upload"
                      onClick={() => console.log("Clicked")}
                    >
                      <Button.UploadIcon themeName="Icons" />
                    </Form.Upload.Trigger>
                    <Form.Upload.Cancel tooltipContent="Remove">
                      <Button.DeleteIcon themeName="Icons" />
                    </Form.Upload.Cancel>
                  </styled.div>
                </Thumbnail.Component>
              </ThemeProvider>
            </Thumbnail.Content>
          </Thumbnail.Root>
        )}
      </Form.Upload.Root>
    </div>
  );
}

export { Demo };
