import { AddButton, CrossButton } from "@ailiyah-ui/button";
import * as Dialog from "@ailiyah-ui/dialog";
import React from "react";
import { PromptForm } from "./Prompt.helper";

function PromptDialog() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <AddButton/>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Content themeName="DialogContent">
          <Dialog.Title themeName="DialogTitle">Edit Prompt</Dialog.Title>
          <Dialog.Description themeName="DialogDescription">
            Make your request by submitting image(s) or write prompt(s)
          </Dialog.Description>
          <PromptForm editing={true} />
          <Dialog.Close asChild>
            <CrossButton />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export { PromptDialog };
