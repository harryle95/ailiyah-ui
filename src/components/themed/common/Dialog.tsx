import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { styled } from "../../context/factory";
import "../css/Dialog.css"

const Root = Dialog.Root;

const Trigger = styled(Dialog.Trigger);

const Portal = Dialog.Portal;

const Overlay = React.forwardRef<
  HTMLDivElement,
  Omit<Dialog.DialogOverlayProps, "children" | "asChild">
>((props, ref) => {
  return <Dialog.Overlay className="DialogOverlay" ref={ref} {...props} />;
});

const Content = styled(Dialog.Content);

const Title = styled(Dialog.Title);

const Description = styled(Dialog.Description);

const Close = styled(Dialog.Close);

export {
  Root, 
  Trigger, 
  Portal,
  Overlay,
  Content,
  Title,
  Description,
  Close
}