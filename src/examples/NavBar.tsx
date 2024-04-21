import * as Text from "../components/primitives/TextBox";
import * as React from "react";
import * as Button from "../components/built/Buttons";
import { styled } from "../components/context/factory";
import { Link } from "react-router-dom";
import * as Form from "../components/primitives/Form";
import * as NavBar from "../components/built/NavBar";
// @ts-ignore
import ReactLogo from "../assets/react.svg"; 

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

function IconPanel() {
  return (
    <div className="flex items-center gap-4">
      <img className="w-14 h-14" src={ReactLogo} alt="logo" />
      <div className="font-sans font-bold leading-8 text-xl">AILYAH</div>
    </div>
  );
}



const TAGS = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
);

export function Demo() {
  return (
    <div className="flex">
      <NavBar.Root>
        <NavBar.Trigger />
        <NavBar.Content>
          <NavBar.Header>
            <IconPanel />
          </NavBar.Header>
          <NavBar.Body twOther="scrollbar-thin">
            <ListItem activeState={true} projectName={"New Project"} />
            {TAGS ? (
              TAGS.map((item) => <ListItem key={item} projectName={item} />)
            ) : (
              <></>
            )}
          </NavBar.Body>
          <NavBar.Footer>
            <IconPanel/>
          </NavBar.Footer>
        </NavBar.Content>
      </NavBar.Root>
    </div>
  );
}
