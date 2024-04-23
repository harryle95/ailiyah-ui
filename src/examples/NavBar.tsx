import * as React from "react";
import { Primitive, Themed, Context } from "../index";

import { Link } from "react-router-dom";

const NavBar = Themed.NavBar;
const Text = Primitive.TextBox;
const Button = Themed.Button;
const Form = Primitive.Form;
const styled = Context.styled;
const ThemeProvider = Context.ThemeProvider;

const theme = {
  ...Context.defaultTheme,
  NavBarFormInput: {
    twWidth: "w-full",
    twHeight: "h-full",
    twBackgroundColor: "bg-transparent",
    twBorderWidth: "border-none",
    twOutlineColor: "outline-none",
  },
  NavBarTextBoxRoot: {
    // Different bg color for active/inactive and light/dark modes
    twBackgroundColor:
      "data-[state=active]:bg-neutral-300 dark:data-[state=active]:bg-neutral-700",
    twBorderRadius: "rounded-md",
    twPadding: "px-2",
  },
  NavBarTextBoxMask: {
    twPosition: "absolute",
    twHeight: "max-h-full",
    twTopRightBottomLeft: "top-0 bottom-0 right-0", // Placed at the end of the text box on the right
    twWidth: "w-8 data-[state=active]:w-20", // Larger width when active to hold text box buttons
    // Gradient starting color must match bg. Different active/non-active and light modes
    twGradientColorStops:
      "from-neutral-100 data-[state=active]:from-neutral-300 from-60% dark:from-neutral-900 dark:data-[state=active]:from-neutral-700",
    twBackgroundColor: "bg-gradient-to-l",
  },
  NavBarInvisibleTextBoxButtons: {
    twDisplay: "hidden data-[state=active]:flex", // Hidden by default, shown when active
    twPosition: "absolute",
    twTopRightBottomLeft: "top-0 bottom-0 right-0", // Placed at the end of text box on the right
  },
  InvisibleButtonsLayout: {
    twFlex: "flex",
    twPadding: "py-1",
    twGap: "gap-x-1",
  },
};

const IconPanel: React.FC<{}> = () => {
  return (
    <div className="flex items-center gap-4">
      <div className="font-sans font-bold text-xl">AILYAH</div>
    </div>
  );
};

interface ProjectDTO {
  id: string;
  name: string;
}

const TAGS = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
);

export const Demo = () => {
  return <Root projects={TAGS} />;
};

const Root = (props) => {
  const { projects, ...rest } = props;
  return (
    <ThemeProvider {...theme}>
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
        </NavBar.Content>
      </NavBar.Root>
    </ThemeProvider>
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
      console.log("Submiting Form");
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
                    console.log("Deleting");
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
