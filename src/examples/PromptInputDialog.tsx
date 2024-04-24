import * as Form from "../components/primitives/Form";
import * as React from "react";
import { Button } from "../components/themed";
import { createBox } from "../components/primitives/Box";
import { styled } from "../components/context";
import { ITailwindTheme } from "../components/context";
const [Box, useBoxContext] = createBox("ThumbnailBox");

interface PromptEntry {
  files?: File;
  prompt: string;
}

interface PromptData {
  [key: number]: PromptEntry;
}

const PromptInput = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div"> & ITailwindTheme
>((props, ref) => {
  const [formData, setFormData] = React.useState<PromptEntry>({
    files: undefined,
    prompt: "",
  });
  const [thumbnail, setThumbnail] = React.useState<string>("");

  const onFileUploaded = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files) {
      setThumbnail(URL.createObjectURL(e.currentTarget.files[0]));
      setFormData({
        ...formData,
        files: e.currentTarget.files[0],
      });
      console.log("Upload file: ", formData);
    }
  };
  const onFileRemoved = (e: React.MouseEvent<HTMLButtonElement>) => {
    setThumbnail("");
    setFormData({
      ...formData,
      files: undefined,
    });
    console.log("Remove file", formData);
  };
  const onTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      prompt: e.currentTarget.value,
    });
    console.log("Update Text", formData);
  };
  return (
    <Box activeState={false} hoverSetActive={true} {...props} ref={ref} twPosition="relative" twPadding="pb-6">
      {(rootState)=> {return (
        <>
      <Form.Upload.Root
        accept="image/*"
        onFileUploaded={onFileUploaded}
        onFileRemoved={onFileRemoved}
      >
        <Box
          activeState={false}
          hoverSetActive={true}
          twWidth="w-[150px]"
          twHeight="h-[150px]"
          twPosition="relative"
          twBorderRadius="rounded-md"
          twFlexShrink="flex-shrink-0"
        >
          {(state) => {
            return thumbnail === "" ? (
              <Form.Upload.Trigger
                onClick={() => console.log("Clicked")}
                twWidth="w-full"
                twHeight="h-full"
                twFlex="flex"
                twAlignItems="items-center"
                twJustifyContent="justify-center"
                twFontWeight="font-bold"
                twFontSize="text-xl"
                twBackgroundColor="bg-gray-100"
                twBorderRadius="rounded-md"
              >
                Upload
              </Form.Upload.Trigger>
            ) : (
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
                    <Form.Upload.Trigger onClick={() => console.log("Clicked")}>
                      <Button.UploadIcon themeName="Icons" />
                    </Form.Upload.Trigger>
                    <Form.Upload.Cancel>
                      <Button.DeleteIcon themeName="Icons" />
                    </Form.Upload.Cancel>
                  </Button.PopOverButtonGroup>
                </Box>
              </>
            );
          }}
        </Box>
      </Form.Upload.Root>
      <styled.textarea
        twBorderWidth="border-2"
        twWidth="w-full"
        twBorderRadius="rounded-md"
        twPadding="p-4"
        onChange={onTextChange}
        placeholder={formData.prompt}
      />
      <Box activeState={rootState} twPosition="absolute" twTopRightBottomLeft="bottom-0 right-0">
          <Button.CrossButton tooltipContent="Remove"/>
      </Box>
      </>)}}
    </Box>
  );
});

function addPromptInputNode(
  data: React.ReactNode[],
  setData: Function,
  index: number
) {
  let newData = [...data];
  newData.push(
    <PromptInput key={index} twFlex="flex" twGap="gap-x-4"/>
  );
  setData(newData);
}

function Demo() {
  const [data, setData] = React.useState<React.ReactNode[]>([]);
  const [index, setIndex] = React.useState<number>(0);

  const addButton = (
    <Button.AddButton
      twWidth="w-10"
      onClick={() => {
        addPromptInputNode(data, setData, index);
        setIndex(index + 1);
      }}
    />
  );
  return (
    <styled.div twPadding="p-10" twFlex="flex" twFlexDirection="flex-col">
      {data}
      {addButton}
    </styled.div>
  );
}

export { Demo };
