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
    <styled.div {...props} ref={ref}>
      <Form.Upload.Root
        accept="image/*"
        onFileUploaded={onFileUploaded}
        onFileRemoved={onFileRemoved}
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
      <styled.textarea
        twBorderWidth="border-2"
        twWidth="w-[500px]"
        twBorderRadius="rounded-md"
        twPadding="p-4"
        onChange={onTextChange}
        placeholder={formData.prompt}
      />
    </styled.div>
  );
});

function addPromptInputNode(
  data: React.ReactNode[],
  setData: Function,
  index: number
) {
  let newData = [...data];
  newData.push(<PromptInput key={index} />);
  setData(newData);
}

function Demo() {
  const [data, setData] = React.useState<React.ReactNode[]>([]);
  const [index, setIndex] = React.useState<number>(0);

  const addButton = (
    <Button.AddButton
      onClick={() => {
        addPromptInputNode(data, setData, index);
        setIndex(index + 1);
      }}
    />
  );
  return (
    <div>
      {data}
      {addButton}
    </div>
  );
}

export { Demo };
