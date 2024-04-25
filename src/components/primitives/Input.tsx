import React from "react";
import { InputProps } from "./Input.types";
import { styled } from "@ailiyah-ui/factory";

/**
 * Generic input - does not use Form hooks internally
 *
 * @param onEscDown - handler when ESC key is pressed
 * @param onEnterDown - handler when ENTER key is pressed
 */
const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    onKeyDown = () => {},
    onEscDown = () => {},
    onEnterDown = () => {},
    ...rest
  } = props;

  const keyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const key = e.key;
    switch (key) {
      case "Escape":
        e.preventDefault();
        onEscDown(e);
        return;
      case "Enter":
        e.preventDefault();
        onEnterDown(e);
        return;
      default:
        onKeyDown(e);
        return;
    }
  };

  return <styled.input onKeyDown={keyDownHandler} {...rest} ref={ref} />;
});

Input.displayName = "Input";

export { Input };
