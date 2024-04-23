import * as React from "react";
import { TextArea } from "../components/primitives";
import { Button } from "../components/themed";

function Demo() {
  return (
    <div className="flex w-screen h-screen items-center justify-center mx-auto">
      <TextArea.Root>
        <TextArea.Content>
          <TextArea.TextArea twBorderWidth="border-2" twResize="resize-none" twPadding="p-3"/>
          <TextArea.Component compLocation="bottom-right">
            <Button.InvisibleButtonGroup twPadding="p-[2px] pb-0">
              <Button.UploadButton/>
              <Button.SubmitButton/>
            </Button.InvisibleButtonGroup>
          </TextArea.Component>
        </TextArea.Content>
      </TextArea.Root>
    </div>
  );
}

export { Demo };
