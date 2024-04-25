import { describe, test, expect } from "vitest";
import { Root, Trigger, Content } from "./NavBar";
import React from "react";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";

let user = userEvent.setup();

function NavBar() {
  return (
    <Root>
      <Trigger>
        {(state, handler) => {
          return state ? (
            // @ts-ignore
            <div title="trigger" data-state="active" onClick={handler}>
              Collapse
            </div>
          ) : (
            // @ts-ignore
            <div title="trigger" data-state="inactive" onClick={handler}>
              Expand
            </div>
          );
        }}
      </Trigger>
      <Content twWidth="w-[256px]" title="content">
        Body
      </Content>
    </Root>
  );
}

describe("Test NavBar", () => {
  test("content should be active at render", () => {
    render(<NavBar />);
    let trigger = screen.getByTitle("trigger");
    expect(trigger.getAttribute("data-state")).toBe("active");
    expect(trigger.textContent).toBe("Collapse");

    let content = screen.getByTitle("content");
    expect(content.getAttribute("style")).toBeNull();
    expect(content.getAttribute("data-state")).toBe("active");
  });

  test("content should collapse when click on trigger", async () => {
    render(<NavBar />);
    let trigger = screen.getByTitle("trigger");

    await user.click(trigger);
    expect(trigger.getAttribute("data-state")).toBe("inactive");
    expect(trigger.textContent).toBe("Expand");

    let content = screen.getByTitle("content");
    expect(content.getAttribute("style")).toBe("width: 0px;");
    expect(content.getAttribute("data-state")).toBe("inactive");
  });
});
