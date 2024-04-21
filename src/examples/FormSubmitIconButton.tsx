import { Button } from "../components/themed";
import {Form} from "../components/primitives"
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
        <Button.SubmitButton type="submit" />
      </Form.Root>
    </div>
  );
}

export { Demo };
