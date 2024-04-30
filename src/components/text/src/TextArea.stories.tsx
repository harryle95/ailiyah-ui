import { Meta, StoryObj } from "@storybook/react";
import {
  ActionFactory,
  TextAreaWithSubmitAndEdit,
  EMPTYPROMPT,
  NONEMPTYPROMPT,
} from "./TextArea.helper";
import { userEvent } from "@storybook/test";

const Action = ActionFactory(userEvent);

const meta: Meta<typeof TextAreaWithSubmitAndEdit> = {
  component: TextAreaWithSubmitAndEdit,
  title: "PrimaryTextArea",
  args: {
    initPrompt: EMPTYPROMPT,
    onClick: () => {console.log("Click on Submit")},
  },
};

export default meta;

type Story = StoryObj<typeof TextAreaWithSubmitAndEdit>;

const Empty: Story = {};

const NonEmpty: Story = {
  args: {
    initPrompt: NONEMPTYPROMPT,
  },
};

const EmptyTypeFirst: Story = {
  args: Empty.args,
  play: Action.typeFirstPrompt,
};

const EmptyTypeFirstAndSecond: Story = {
  args: Empty.args,
  play: async () => {
    await Action.typeFirstPrompt();
    await Action.typeSecondPrompt();
  },
};

const EmptyTypeFirstAndSecondThenClear: Story = {
  args: Empty.args,
  play: async (context) => {
    EmptyTypeFirstAndSecond.play &&
      (await EmptyTypeFirstAndSecond.play(context));
    await Action.clearTextField();
  },
};

const NonEmptyClear: Story = {
  args: NonEmpty.args,
  play: Action.clearTextField,
};


export {
  Empty,
  EmptyTypeFirst,
  EmptyTypeFirstAndSecond,
  EmptyTypeFirstAndSecondThenClear,
  NonEmpty,
  NonEmptyClear,
};
