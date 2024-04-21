import * as Text from "../components/primitives/TextBox";
import * as React from "react";
import * as Button from "../components/built/Buttons";
import { styled } from "../components/context/factory";
import { Link } from "react-router-dom";
import * as Form from "../components/primitives/Form";
import * as NavBar from "../components/built/NavBar";

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
        themeName="NavBarFormInput"
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
      themeName="NavBarTextBoxRoot"
      activeState={activeState}
      hoverSetActive={true}
    >
      <styled.div twPosition="relative" twWidth="w-full" twHeight="h-full">
        {!editingState ? (
          <>
            <Text.Content>
              <Link to={projectURL}>{name}</Link>
            </Text.Content>

            <Text.Component
              compLocation="right"
              themeName="NavBarTextBoxMask"
            ></Text.Component>

            <Text.Component
              compLocation="right"
              themeName="NavBarInvisibleTextBoxButtons"
            >
              <Button.InvisibleButtonGroup themeName="InvisibleButtonsLayout">
                <Button.EditButton
                  tooltipContent="Edit"
                  onClick={() => setEditingState(!editingState)}
                />
                <Button.DeleteButton tooltipContent="Delete" />
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

const TAGS = Array.from({ length: 10 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
);

export function Demo() {
  return (
    <div className="flex">
      <NavBar.Root>
        <NavBar.Trigger />
        <NavBar.Content>
          <NavBar.Body>
            <ListItem activeState={true} projectName={"New Project"} />
            {TAGS ? (
              TAGS.map((item) => <ListItem key={item} projectName={item} />)
            ) : (
              <></>
            )}
          </NavBar.Body>
        </NavBar.Content>
      </NavBar.Root>
    </div>
  );
}
