import * as React from "react";
import { TextArea } from "../components/primitives";
import { Button } from "../components/themed";
import * as Dialog from "../components/themed/common/Dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import "./styles.css";

function DialogMenu() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button.UploadIcon themeName="Icons" />
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content
          className="DialogContent"
          twBackgroundColor="bg-white"
          twBorderRadius="rounded-md"
          twPadding="p-5"
        >
          <Dialog.Title className="DialogTitle">Edit profile</Dialog.Title>
          <Dialog.Description className="DialogDescription">
            Make changes to your profile here. Click save when you're done.
          </Dialog.Description>
          <fieldset className="Fieldset">
            <label className="Label" htmlFor="name">
              Name
            </label>
            <input className="Input" id="name" defaultValue="Pedro Duarte" />
          </fieldset>
          <fieldset className="Fieldset">
            <label className="Label" htmlFor="username">
              Username
            </label>
            <input className="Input" id="username" defaultValue="@peduarte" />
          </fieldset>
          <div
            style={{
              display: "flex",
              marginTop: 25,
              justifyContent: "flex-end",
            }}
          >
            <Dialog.Close asChild>
              <button className="Button green">Save changes</button>
            </Dialog.Close>
          </div>
          <Dialog.Close asChild>
            <button className="IconButton" aria-label="Close">
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function Demo() {
  return (
    <div className="flex w-screen h-screen items-center justify-center mx-auto">
      <TextArea.Root>
        <TextArea.Content>
          <TextArea.TextArea
            twBorderWidth="border-2"
            twBorderRadius="rounded-lg"
            twResize="resize-none"
            twPadding="p-3"
          />
          <TextArea.Component compLocation="bottom-right">
            <Button.SubmitButton />
          </TextArea.Component>
        </TextArea.Content>
      </TextArea.Root>
    </div>
  );
}

export { Demo };
