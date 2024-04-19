import * as Form from "../components/primitives/Form";
import * as React from "react";

function Demo() {
  const formRef = React.useRef(null);
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Form.Root
        method="POST"
        onSubmit={(e) => {
          console.log("Submit Form");
          e.preventDefault();
        }}
      >
        <button>Submit</button>
      </Form.Root>
    </div>
  );
}

export { Demo };
