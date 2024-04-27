import { PrimitiveProps, TailwindProps } from "@ailiyah-ui/utils";
import React from "react";
import { styled } from "@ailiyah-ui/factory";
import { TextArea as _TextArea } from "@ailiyah-ui/text";
import { TextAreaOwnProps } from "./TextArea.types";

const TextArea = React.memo(
  React.forwardRef<
    HTMLTextAreaElement | HTMLDivElement,
    Omit<PrimitiveProps.TextAreaProps, "disabled" | "onChange"> &
      TailwindProps &
      TextAreaOwnProps
  >((props, ref) => {
    let { prompt, editing = true, onChange, ...rest } = props;

    const renderedTextArea = (
      <_TextArea.TextArea
        {...rest}
        ref={ref}
        onChange={onChange}
        placeholder={prompt}
        value={prompt}
      />
    );
    const textdisplay = (
      <styled.div
        ref={ref}
        {...(rest as TailwindProps & PrimitiveProps.DivProps)}
      >
        {prompt}
      </styled.div>
    );
    return <>{editing ? renderedTextArea : textdisplay}</>;
  })
);

export { TextArea };
