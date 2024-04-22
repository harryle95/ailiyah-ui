import * as React from "react";
import { Button } from "../components/themed";
import { TextBox as Text } from "../components/primitives";
import { styled } from "../components/context/factory";
import { Link } from "react-router-dom";
import * as Form from "../components/primitives/Form";

interface NameUpdateFormProps extends React.ComponentPropsWithoutRef<"form"> {
  id: string;
  projectName: string;
  setProjectName: Function;
  setEditingState: Function;
}

const NameUpdateForm: React.FC<NameUpdateFormProps> = (props) => {
  const { projectName, setProjectName, id, setEditingState } = props;
  const [name, setName] = React.useState(projectName);
  const onSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting Form Event received");
    setEditingState(false);
    if (name === projectName) {
      console.log("Name was not changed");
    } else {
      console.log("Name was changed -> Submit");
      setProjectName(name);
    }
  };

  return (
    <Form.Root onSubmit={onSubmit}>
      <input name="id" value={id} className="hidden" readOnly />
      <Form.Input
        twWidth="w-full"
        twHeight="h-full"
        twBackgroundColor="bg-transparent"
        twBorderWidth="border-none"
        twOutlineColor="outline-none"
        name="name"
        type="text"
        key={id}
        value={name}
        placeholder={name}
        autoFocus
        onEnterDown={onSubmit}
        onChange={(e) => setName(e.currentTarget.value)}
        onEscDown={() => {
          setName(projectName);
          setEditingState(false);
        }}
        onBlur={onSubmit}
      />
    </Form.Root>
  );
};

function ListItem({ projectName, projectURL = "#", activeState = false }) {
  const [editingState, setEditingState] = React.useState(false);
  const [name, setName] = React.useState(projectName);
  return (
    <Text.Root
      activeState={activeState}
      hoverSetActive={true}
      twTextColor="text-gray-800 data-[state=active]:text-white"
      twBackgroundColor="data-[state=active]:bg-slate-400"
      twBorderRadius="rounded-md"
      twPadding="px-2"
    >
      <styled.div twPosition="relative" twWidth="w-full" twHeight="h-full">
        {!editingState ? (
          <>
            <Text.Content>
              <Link to={projectURL}>{name}</Link>
            </Text.Content>

            <Text.Component
              compLocation="right"
              twPosition="absolute"
              twHeight="max-h-full"
              twTopRightBottomLeft="top-0 bottom-0 right-0"
              twWidth="w-8 data-[state=active]:w-20"
              twGradientColorStops="from-slate-500 data-[state=active]:from-slate-400 from-60%"
              twBackgroundColor="bg-gradient-to-l"
            ></Text.Component>

            <Text.Component
              compLocation="right"
              twDisplay="hidden data-[state=active]:flex"
              twPosition="absolute"
              twTopRightBottomLeft="top-0 bottom-0 right-0"
            >
              <Button.InvisibleButtonGroup
                twFlex="flex"
                twPadding="py-1"
                twGap="gap-x-1"
              >
                <Button.EditButton
                  twHeight="h-full"
                  tooltipContent="Edit"
                  onClick={() => setEditingState(!editingState)}
                />
                <Button.DeleteButton
                  twHeight="h-full"
                  tooltipContent="Delete"
                />
              </Button.InvisibleButtonGroup>
            </Text.Component>
          </>
        ) : (
          <NameUpdateForm
            id="#"
            projectName={name}
            setProjectName={setName}
            setEditingState={setEditingState}
          />
        )}
      </styled.div>
    </Text.Root>
  );
}

const TAGS = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
);

/**
 * Text box with delete button that appears when hovered over and gradient masking at the end
 * @returns
 */
function Demo() {
  return (
    <div className="flex flex-col h-screen w-[256px] border rounded-lg bg-slate-500 items-center justify-center pl-3 py-2">
      <div className="w-full h-full overflow-y-scroll scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-500 scrollbar-thumb-rounded-lg scrollbar-track-rounded-lg">
        <ListItem activeState={true} projectName={"New Project"} />
        {TAGS ? TAGS.map((item) => <ListItem projectName={item} />) : <></>}
      </div>
    </div>
  );
}

export { Demo };
