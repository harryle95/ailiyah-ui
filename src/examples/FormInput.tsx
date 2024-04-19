import * as Form from "../components/primitives/Form";
import * as React from "react";

function Demo() {
  const formRef = React.useRef(null);
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Form.Input
        type="text"
        autoFocus
        onEscDown={() => console.log("Press ESC")}
        onEnterDown={() => console.log("Press Enter")}
      />
    </div>
  );
}

export { Demo };
