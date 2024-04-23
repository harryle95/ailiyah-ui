import * as React from "react";
import { ITailwindTheme } from "../context/types";
import { styled, createElement } from "../context/factory";
import * as Primitive from "./types";
import { createContext } from "../context";

type DivRef = React.ElementRef<"div"> | null;

interface NavBarProps extends Primitive.DivProps, ITailwindTheme {}

/**
 * ------------------------------------------------------------------------------------------------
 * NavBar
 * ------------------------------------------------------------------------------------------------
 */

interface NavBarState {
  activeState: boolean;
  setActiveState: Function;
}

const [NavBarProvider, useNavBarContext] = createContext<NavBarState>("NavBar");
function getStateName(state: boolean): string {
  return state ? "active" : "inactive";
}

const NavBar = React.forwardRef<DivRef, NavBarProps>((props, ref) => {
  const { children, ...rest } = props;
  const [visible, setVisible] = React.useState(true);
  return (
    <NavBarProvider value={{activeState: visible, setActiveState: setVisible}}>
      <styled.div ref={ref} {...rest} data-state={getStateName(visible)}>
        {children}
      </styled.div>
    </NavBarProvider>
  );
});

NavBar.displayName = "NavBar";

/**
 * ------------------------------------------------------------------------------------------------
 * NavBarTrigger
 * ------------------------------------------------------------------------------------------------
 */

interface NavBarTriggerProps extends Omit<NavBarProps, "children"> {
  children?:
    | React.ReactNode
    | ((
        state: boolean,
        trigger: React.MouseEventHandler<HTMLButtonElement>
      ) => React.ReactNode);
}

/**
 * Trigger to expand/collapse navigation bar
 */
const NavBarTrigger = React.forwardRef<DivRef, NavBarTriggerProps>(
  (props, ref) => {
    const { children, onClick = (e) => {}, ...rest } = props;
    const { activeState, setActiveState } = useNavBarContext();
    const onClickHandler = (e) => {
      setActiveState(!activeState);
      onClick(e);
    };
    return (
      <styled.div {...rest} ref={ref} data-state={getStateName(activeState)}>
        {typeof children === "function"
          ? children(activeState, onClickHandler)
          : children}
      </styled.div>
    );
  }
);
NavBarTrigger.displayName = "NavBarTrigger";

/**
 * ------------------------------------------------------------------------------------------------
 * NavBarContent
 * ------------------------------------------------------------------------------------------------
 */
const NavBarContent = React.forwardRef<DivRef, NavBarProps>((props, ref) => {
  const { children, ...rest } = props;
  const { activeState } = useNavBarContext();

  return activeState ? (
    <styled.div ref={ref} {...rest} data-state={getStateName(activeState)}>
      {children}
    </styled.div>
  ) : (
    <styled.div
      ref={ref}
      {...rest}
      style={{ width: "0px" }}
      data-state={getStateName(activeState)}
    >
      {children}
    </styled.div>
  );
});
NavBarContent.displayName = "NavBarContent";

/**
 * ------------------------------------------------------------------------------------------------
 * NavBarHeader
 * ------------------------------------------------------------------------------------------------
 */
const NavBarHeader = createElement("div", "NavBarContent");

/**
 * ------------------------------------------------------------------------------------------------
 * NavBarFooter
 * ------------------------------------------------------------------------------------------------
 */
const NavBarFooter = createElement("div", "NavBarContent");

/**
 * ------------------------------------------------------------------------------------------------
 * NavBarBody
 * ------------------------------------------------------------------------------------------------
 */
const NavBarBody = createElement("div", "NavBarContent");

/**
 * ------------------------------------------------------------------------------------------------
 * Export
 * ------------------------------------------------------------------------------------------------
 */
const Root = NavBar;
const Trigger = NavBarTrigger;
const Content = NavBarContent;
const Header = NavBarHeader;
const Footer = NavBarFooter;
const Body = NavBarBody;

export {
  NavBar,
  NavBarTrigger,
  NavBarContent,
  NavBarHeader,
  NavBarFooter,
  NavBarBody,
  //
  Root,
  Trigger,
  Content,
  Header,
  Body,
  Footer,
  //
};
export type { NavBarProps, DivRef };
