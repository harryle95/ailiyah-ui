import React from "react";
import { Input } from "./Input";
import { describe, test, expect } from "vitest";
import { userEvent } from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";

const user = userEvent.setup();

function TestElement({defaultText}: {defaultText: string}) {
  const [edit, setEdit] = React.useState(() => true);
  const [text, setText] = React.useState(() => defaultText);
  const onEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    setText(e.currentTarget.value);
    setEdit(!edit);
  };
  const onEsc = (e: React.KeyboardEvent<HTMLInputElement>) => {
    setText(defaultText), setEdit(!edit);
  };

  return (
    <div>
      {edit ? (
        <Input
          type="text"
          defaultValue={text}
          onEscDown={onEsc}
          onEnterDown={onEnter}
          title="input-field"
          autoFocus
        />
      ) : (
        <p title="display-paragraph">{text}</p>
      )}
    </div>
  );
}

describe("Test Input", () => {
  const defaultText = "start";
  test(`should render input on mount`, () => {
    render(<TestElement defaultText={defaultText} />);
    let component: HTMLInputElement = screen.getByTitle("input-field");
    expect(component.value).toBe(defaultText);
  });

  test(`should not have paragraph on mount`, () => {
    render(<TestElement defaultText={defaultText} />);
    expect(() => screen.getByTitle("display-paragraph")).toThrowError();
  });

  describe(`with defaultText: ${defaultText}`, () => {
    test.each([
      ["aab{Enter}", defaultText + "aab"],
      ["aab{Enter}cd", defaultText + "aab"],
      ["aab{Enter}{Esc}", defaultText + "aab"],
      ["aab{Enter}asdas{Enter}asd", defaultText + "aab"],
      ["aab{Escape}", defaultText],
    ])(
      "with keyboard sequence: %s should yield `%s`",
      async (keyboardValue, expValue) => {
        render(<TestElement defaultText={defaultText} />);
        await user.keyboard(keyboardValue);
        expect(screen.getByTitle("display-paragraph").textContent).toBe(
          expValue
        );
      }
    );
  });
});
