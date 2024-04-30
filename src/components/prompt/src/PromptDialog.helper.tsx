import { AddButton, CrossButton } from "@ailiyah-ui/button";
import * as Dialog from "@ailiyah-ui/dialog";
import React from "react";
import { PromptForm } from "./Prompt.helper";
import { createBox, createLocationBox } from "@ailiyah-ui/box";

const Container = createBox("Container", { twPosition: "relative" });
const Box = createLocationBox("Box");

function PromptDialog() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <AddButton />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay/>
        <Dialog.Content themeName="DialogContent">
          <Container themeName="DialogContainer">
            <Dialog.Title themeName="DialogTitle">Edit Prompt</Dialog.Title>
            <Dialog.Description themeName="DialogDescription">
              Make your request by submitting image(s) or write prompt(s)
            </Dialog.Description>
            <PromptForm editing={true} />
            <Box compLocation="top-right" themeName="DialogCloseButton">
              <Dialog.Close asChild>
                <CrossButton />
              </Dialog.Close>
            </Box>
          </Container>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export { PromptDialog };
