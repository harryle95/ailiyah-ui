import { describe, test, expect } from "vitest";
import { screen, render } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import {
  createStateBox,
  getState,
  createLocationBox,
  createStateBoxChildren,
  resolveLocation,
} from "./Box";
import React from "react";
import { BaseStateBoxContextValue } from "./Box.types";
import { TailwindComponentProps } from "@ailiyah-ui/factory";
import { CornerLocationProps } from "@ailiyah-ui/utils";

const user = userEvent.setup();

const [SBox, useStateBoxContext] = createStateBox("Box", undefined, {
  twWidth: "w-10",
  twHeight: "h-10",
  twBackgroundColor: "bg-black",
  twTextColor: "text-white",
});

const SBoxChildren = createStateBoxChildren(
  "div",
  "Children",
  useStateBoxContext
);

const SBoxChildrenLocation = createStateBoxChildren<
  "div",
  BaseStateBoxContextValue,
  CornerLocationProps & TailwindComponentProps<"div">
>("div", "location", useStateBoxContext, {}, resolveLocation);

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
        <BoxContent />
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

const LBox = createLocationBox("LocationBox");

describe("Test Location Box", () => {
  test("at default should be 'absolute top-0 right-0'", () => {
    render(<LBox title="test-element"></LBox>);
    let component = screen.getByTitle("test-element");
    expect(component.className).toBe("absolute top-0 right-0");
  });

  test("should have className be 'absolute top-0 left-0'", () => {
    render(<LBox compLocation="top-left" title="test-element"></LBox>);
    let component = screen.getByTitle("test-element");
    expect(component.className).toBe("absolute top-0 left-0");
  });

  test("with overwritten location to be top-2 left-2 should be absolute top-2 left-2", () => {
    render(
      <LBox
        compLocation="top-left"
        title="test-element"
        twTopRightBottomLeft="top-2 left-2"
      ></LBox>
    );
    let component = screen.getByTitle("test-element");
    expect(component.className).toBe("absolute top-2 left-2");
  });
});

describe("Test State Children", () => {
  describe("with parent box intial state being inactive", () => {
    const Component = () => {
      return (
        <SBox initialState={false} title="parent-box">
          <SBoxChildren title="children-box">Content</SBoxChildren>
        </SBox>
      );
    };

    const LocationComponent = () => {
      return (
        <SBox initialState={false} title="parent-box">
          <SBoxChildrenLocation title="children-box" compLocation="top-left">
            Content
          </SBoxChildrenLocation>
        </SBox>
      );
    };
    test("children-box should be inactive on rendering", () => {
      render(<Component />);
      expect(screen.getByTitle("children-box").getAttribute("data-state")).toBe(
        "inactive"
      );
    });
    test("children-box should be active on hover", async () => {
      render(<Component />);
      let parent = screen.getByTitle("parent-box");
      let children = screen.getByTitle("children-box");
      await user.hover(parent);
      expect(children.getAttribute("data-state")).toBe("active");
    });
    test("children location box should be inactive on rendered", () => {
      render(<LocationComponent />);
      expect(screen.getByTitle("children-box").getAttribute("data-state")).toBe(
        "inactive"
      );
    });
    test("children location box should be active on hover", async () => {
      render(<LocationComponent />);
      let parent = screen.getByTitle("parent-box");
      let children = screen.getByTitle("children-box");
      await user.hover(parent);
      expect(children.getAttribute("data-state")).toBe("active");
    });
    test("children-box should be on top-left", async () => {
      render(<LocationComponent />);
      let children = screen.getByTitle("children-box");
      expect(children.className).toBe("top-0 left-0");
    });
  });
});
