import * as React from "react";
import { Primitive, Themed, Context } from "../index";

import {
  Link,
} from "react-router-dom";


const NavBar = Themed.NavBar;
const Text = Primitive.TextBox;
const Button = Themed.Button;
const Form = Primitive.Form;
const styled = Context.styled;

const IconPanel: React.FC<{}> = () => {
  return (
    <div className="flex items-center gap-4">
      <div className="font-sans font-bold text-xl">AILYAH</div>
    </div>
  );
};

const ProfileButton: React.FC<{}> = () => {
  return (
    <styled.div themeName="NavBarButtons">
      <a href="#" className="flex flex-row gap-2">
        <div>My Profile</div>
      </a>
    </styled.div>
  );
};

const NewProjectButton: React.FC<{}> = () => {
  return (
    <styled.div themeName="NavBarButtons">
      <Form.Root method="POST">
        <button type="submit">
          <div className="flex flex-row gap-2">
            <div>New Project</div>
          </div>
        </button>
      </Form.Root>
    </styled.div>
  );
};

interface ProjectDTO{
    id: string,
    name: string 
}


const TAGS = Array.from({ length: 50 }).map(
    (_, i, a) => `v1.2.0-beta.${a.length - i}`
  );

export const Demo = ()=>{
    return (
        <Root projects={TAGS} />
    )
}

const Root = (props) => {
    const {projects, ...rest} = props 
  return (
    <NavBar.Root>
      <NavBar.Trigger />
      <NavBar.Content>
        <NavBar.Header>
          <IconPanel />
        </NavBar.Header>
        <NavBar.Body twOther="scrollbar-thin">
          {projects ? (
            projects.map((value) => (
              <TextBoxItem key={value} id={value} name={value} />
            ))
          ) : (
            <></>
          )}
        </NavBar.Body>
        <NavBar.Footer twPadding="py-3" twFlex="flex flex-col" twGap="gap-y-3">
          <NewProjectButton />
          <ProfileButton />
        </NavBar.Footer>
      </NavBar.Content>
    </NavBar.Root>
  );
};

interface TextBoxUpdateFormProps
  extends React.ComponentPropsWithoutRef<"form"> {
  id: string;
  projectName: string;
  setProjectName: Function;
  setEditingState: Function;
}

const TextBoxUpdateForm: React.FC<TextBoxUpdateFormProps> = (props) => {
  const { projectName, setProjectName, id, setEditingState } = props;
  const [name, setName] = React.useState(projectName);

  const onSubmit = (e) => {
    e.preventDefault();
    setEditingState(false);
    if (name !== projectName) {
      setProjectName(name);
      console.log("Submiting Form")
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

const TextBoxItem: React.FC<ProjectDTO> = (props) => {
  const { id, name, ...rest } = props;
  const projectURL = `/project/${id}`;
  // States
  const [projectName, setName] = React.useState(name);
  const [editingState, setEditingState] = React.useState(false);

  // Chek if current link is active and set button to appear/disappear  

  return (
    <Text.Root
      themeName="NavBarTextBoxRoot"
      activeState={editingState}
      hoverSetActive={true}
      {...rest}
    >
      <styled.div twPosition="relative" twWidth="w-full" twHeight="h-full">
        {!editingState ? (
          <>
            <Text.Content>
              <Link to={projectURL}>{projectName}</Link>
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
                <Button.DeleteAlertButton
                  tooltipContent="Delete"
                  dialogTitle="Delete Project"
                  dialogDescription="This action is PERMANENT. Are you sure you want to delete this project and all its content?"
                  dialogCancelButtonName="Cancel"
                  dialogSubmitButtonName="Delete"
                  dialogOnCancel={() => {}}
                  dialogOnSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData();
                    formData.append("id", id);
                    console.log("Deleting")
                  }}
                />
              </Button.InvisibleButtonGroup>
            </Text.Component>
          </>
        ) : (
          <TextBoxUpdateForm
            id={id}
            projectName={projectName}
            setProjectName={setName}
            setEditingState={setEditingState}
          />
        )}
      </styled.div>
    </Text.Root>
  );
};

