import { describe, test, expect } from "vitest";
import { screen, render } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { createStateBox, getState } from "./Box";
import React from "react";

const user = userEvent.setup();

const [SBox, useStateBoxContext] = createStateBox("Box", undefined, {
  twWidth: "w-10",
  twHeight: "h-10",
  twBackgroundColor: "bg-black",
  twTextColor: "text-white",
});

function BoxContent() {
  const { activeState } = useStateBoxContext();
  return (
    <p title="test-paragraph" data-state={getState(activeState)}>
      Test Header
    </p>
  );
}

let disabledVar = [true, false];
let initialStateVar = [true, false];
let hoverSetActiveVar = [true, false];
let testCallBack = (getComponent) =>
  describe.each(disabledVar)("with disabled: %s", (disabled) => {
    describe.each(initialStateVar)("with initialState: %s", (initialState) => {
      describe.each(hoverSetActiveVar)(
        "with hoverSetActive: %s",
        (hoverSetActive) => {
          let hoverState = !disabled && (initialState || hoverSetActive);
          let unHoverState = !disabled && initialState;
          test("on render data-state should be " + unHoverState, () => {
            let [parent, child] = getComponent(
              disabled,
              initialState,
              hoverSetActive
            );
            expect(parent.getAttribute("data-state")).toBe(
              getState(unHoverState)
            );
            expect(child.getAttribute("data-state")).toBe(
              parent.getAttribute("data-state")
            );
          });
          test("on hover data-state should be " + hoverState, async () => {
            let [parent, child] = getComponent(
              disabled,
              initialState,
              hoverSetActive
            );
            await user.hover(parent);
            expect(parent.getAttribute("data-state")).toBe(
              getState(hoverState)
            );
            expect(child.getAttribute("data-state")).toBe(
              parent.getAttribute("data-state")
            );
            await user.unhover(parent);
            expect(parent.getAttribute("data-state")).toBe(
              getState(unHoverState)
            );
            expect(child.getAttribute("data-state")).toBe(
              parent.getAttribute("data-state")
            );
          });
        }
      );
    });
  });

describe("Test createStateBox", () => {
  let getComponentFunctional = (disabled, initialState, hoverSetActive) => {
    render(
      <SBox
        disabled={disabled}
        initialState={initialState}
        hoverSetActive={hoverSetActive}
        title="test-element"
      >
        {(state) => (
          <p title="test-paragraph" data-state={getState(state)}>
            Test Header
          </p>
        )}
      </SBox>
    );
    return [
      screen.getByTitle("test-element"),
      screen.getByTitle("test-paragraph"),
    ];
  };

  let getComponentWithHook = (disabled, initialState, hoverSetActive) => {
    render(
      <SBox
        disabled={disabled}
        initialState={initialState}
        hoverSetActive={hoverSetActive}
        title="test-element"
      >
        <BoxContent/>
      </SBox>
    );
    return [
      screen.getByTitle("test-element"),
      screen.getByTitle("test-paragraph"),
    ];
  };
  describe("with functional children component", () =>
    testCallBack(getComponentFunctional));
  describe("with react component using hook", () =>
    testCallBack(getComponentWithHook));
});
