import * as Form from "../components/primitives/Form";
import * as React from "react";

function Demo() {
  const formRef = React.useRef(null);
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Form.Root
        onSubmit={(e) => {
          e.preventDefault;
          console.log("Submit Form");
        }}
      >
        {({ submitForm }) => (
          <Form.Input
            onBlur={submitForm as unknown as React.FocusEventHandler}
            onEnterDown={submitForm as unknown as React.KeyboardEventHandler}
            onEscDown={()=>console.log("Press ESC")}
            autoFocus
          />
        )}
      </Form.Root>
    </div>
  );
}

export { Demo };
