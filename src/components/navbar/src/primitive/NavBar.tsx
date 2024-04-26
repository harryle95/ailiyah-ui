import * as React from "react";
import { styled, createElement } from "@ailiyah-ui/factory";
import { createContext } from "@ailiyah-ui/context";
import {
  NavBarContextValue,
  NavBarProps,
  NavBarTriggerProps,
} from "./NavBar.types";

const [NavBarProvider, useNavBarContext] =
  createContext<NavBarContextValue>("NavBar");

function getState(state: boolean): string {
  return state ? "active" : "inactive";
}

const Root = React.forwardRef<HTMLDivElement, NavBarProps>((props, ref) => {
  const { children, ...rest } = props;
  const [visible, setVisible] = React.useState(() => true);
  return (
    <NavBarProvider
      value={{ activeState: visible, setActiveState: setVisible }}
    >
      <styled.div ref={ref} {...rest} data-state={getState(visible)}>
        {children}
      </styled.div>
    </NavBarProvider>
  );
});

Root.displayName = "Root";

/**
 * Trigger to expand/collapse navigation bar
 */
const Trigger = React.forwardRef<HTMLDivElement, NavBarTriggerProps>(
  (props, ref) => {
    const { children, onClick = (e) => {}, ...rest } = props;
    const { activeState, setActiveState } = useNavBarContext();
    const onClickHandler = (e) => {
      setActiveState(!activeState);
      onClick(e);
    };
    return (
      <styled.div {...rest} ref={ref} data-state={getState(activeState)}>
        {typeof children === "function"
          ? children(activeState, onClickHandler)
          : children}
      </styled.div>
    );
  }
);
Trigger.displayName = "Trigger";

const Content = React.forwardRef<HTMLDivElement, NavBarProps>((props, ref) => {
  const { children, ...rest } = props;
  const { activeState } = useNavBarContext();

  return activeState ? (
    <styled.div ref={ref} {...rest} data-state={getState(activeState)}>
      {children}
    </styled.div>
  ) : (
    <styled.div
      ref={ref}
      {...rest}
      style={{ width: "0px" }}
      data-state={getState(activeState)}
    >
      {children}
    </styled.div>
  );
});
Content.displayName = "Content";
const Header = createElement("div", "Header");
const Footer = createElement("div", "Footer");
const Body = createElement("div", "Body");

export { Root, Trigger, Content, Header, Body, Footer };
