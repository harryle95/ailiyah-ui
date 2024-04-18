import * as React from "react";
import { ITailwindTheme } from "../context/types";
import {
  TrashIcon,
  Pencil1Icon,
  UploadIcon as _UploadIcon,
  DownloadIcon as _DownloadIcon,
  ThickArrowUpIcon,
  PlusIcon,
  DotsHorizontalIcon as _DotsHorizontalIcon,
  DotsVerticalIcon as _DotsVerticalIcon,
} from "@radix-ui/react-icons";
import { Tooltip } from "@radix-ui/themes";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import { styled } from "../context/factory";
import { Popover } from "@radix-ui/themes";

export type ButtonProps = React.ComponentPropsWithoutRef<"button">;

export type TailwindButtonProps = ButtonProps & ITailwindTheme;

export interface TooltipTailwindButtonProps extends TailwindButtonProps {
  tooltipContent?: string;
}

interface DeleteAlertProps extends TooltipTailwindButtonProps {
  dialogTitle: string;
  dialogDescription: string;
  dialogCancelButtonName: string;
  dialogSubmitButtonName: string;
  dialogOnCancel: (event: React.MouseEvent<HTMLButtonElement>) => void;
  dialogOnSubmit: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const DeleteIcon = styled(TrashIcon);

const DeleteAlertButton = React.forwardRef<HTMLButtonElement, DeleteAlertProps>(
  (props, ref) => {
    const {
      tooltipContent = "Delete",
      dialogTitle,
      dialogDescription,
      dialogCancelButtonName = "Cancel",
      dialogSubmitButtonName = "OK",
      dialogOnCancel,
      dialogOnSubmit,
      ...rest
    } = props;

    return (
      <AlertDialog.Root>
        <Tooltip content={tooltipContent}>
          <AlertDialog.Trigger>
            <styled.button {...rest} ref={ref}>
              <DeleteIcon themeName="icons" />
            </styled.button>
          </AlertDialog.Trigger>
        </Tooltip>

        <AlertDialog.Content maxWidth="450px">
          <AlertDialog.Title>{dialogTitle}</AlertDialog.Title>
          <AlertDialog.Description size="2">
            {dialogDescription}
          </AlertDialog.Description>

          <Flex gap="3" mt="4" justify="end">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray" onClick={dialogOnCancel}>
                {dialogCancelButtonName}
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button variant="solid" color="red" onClick={dialogOnSubmit}>
                {dialogSubmitButtonName}
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
    );
  }
);

DeleteAlertButton.displayName = "DeleteAlertButton";

const createButton = (buttonName: string, icon: React.JSX.Element) => {
  const ButtonComponent = React.forwardRef<
    HTMLButtonElement,
    TooltipTailwindButtonProps
  >((props, ref) => {
    const { tooltipContent, ...rest } = props;
    const rendered = tooltipContent ? (
      <Tooltip content={tooltipContent}>
        <styled.button ref={ref} {...rest}>
          {icon}
        </styled.button>
      </Tooltip>
    ) : (
      <styled.button ref={ref} {...rest}>
        {icon}
      </styled.button>
    );
    return rendered;
  });
  ButtonComponent.displayName = buttonName;
  return ButtonComponent;
};

const EditIcon = styled(Pencil1Icon);
const AddIcon = styled(PlusIcon);
const UploadIcon = styled(_UploadIcon);
const DownloadIcon = styled(_DownloadIcon);
const SubmitIcon = styled(ThickArrowUpIcon);
const DotsHorizontalIcon = styled(_DotsHorizontalIcon);
const DotsVerticalIcon = styled(_DotsVerticalIcon);

const EditButton = createButton("EditButton", <EditIcon themeName="icons" />);
const AddButton = createButton("AddButton", <AddIcon themeName="icons" />);
const UploadButton = createButton(
  "UploadButton",
  <UploadIcon themeName="icons" />
);
const DownloadButton = createButton(
  "DownloadButton",
  <DownloadIcon themeName="icons" />
);
const SubmitButton = createButton(
  "SubmitButton",
  <SubmitIcon themeName="icons" />
);
const DeleteButton = createButton(
  "DeleteButton",
  <DeleteIcon themeName="icons" />
);
const DotsHorizontalButton = createButton(
  "DotsHorizontalButton",
  <DotsHorizontalIcon themeName="icons" />
);
const DotsVerticalButton = createButton(
  "DotsVerticalButton",
  <DotsVerticalIcon themeName="icons" />
);

interface PopOverButtonContentProps
  extends Omit<Popover.ContentProps, "asChild">,
    ITailwindTheme {
  icon?: React.JSX.Element;
}

const PopOverButtonGroup = React.forwardRef<
  HTMLDivElement,
  PopOverButtonContentProps
>((props, ref) => {
  const { icon = <DotsHorizontalButton />, children, ...rest } = props;
  const Content = styled(Popover.Content);
  return (
    <Popover.Root>
      <Popover.Trigger>{icon}</Popover.Trigger>
      <Content {...rest} ref={ref}>
        {children}
      </Content>
    </Popover.Root>
  );
});

type DivProps = React.ComponentPropsWithoutRef<"div">;

interface InvisibleButtonGroupProps extends DivProps, ITailwindTheme {
  state?: boolean;
  defaultState?: boolean;
}

const InvisibleButtonGroup = React.forwardRef<
  HTMLDivElement,
  InvisibleButtonGroupProps
>((props, ref) => {
  const { state = null, defaultState = true, children, style, ...rest } = props;
  const displayState = state !== null ? state : defaultState;
  const displayStyle = displayState ? style : { ...style, display: "none" };
  return (
    <styled.div ref={ref} {...rest} style={displayStyle}>
      {children}
    </styled.div>
  );
});

InvisibleButtonGroup.displayName = "InvisibleButtonGroup";

export {
  AddButton,
  DeleteButton,
  EditButton,
  UploadButton,
  DownloadButton,
  SubmitButton,
  DeleteAlertButton,
  DotsHorizontalButton,
  DotsVerticalButton,
  PopOverButtonGroup,
  InvisibleButtonGroup,
};
