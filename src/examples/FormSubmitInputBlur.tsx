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
          <input
            type="text"
            autoFocus
            onBlur={
              submitForm as unknown as React.FocusEventHandler<HTMLInputElement>
            }
          />
        )}
      </Form.Root>
    </div>
  );
}

export { Demo };
