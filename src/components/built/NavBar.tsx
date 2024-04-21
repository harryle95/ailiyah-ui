import * as React from "react";
import * as Button from "./Buttons"
import * as NavBar from "../primitives/NavBar";
import { ITailwindTheme } from "../context/types";

const Root: React.FC<NavBar.NavBarProps> = (props)=>{
  const {children, themeName, ...rest} = props;
  let appliedTheme = themeName?themeName:"NavBarRoot";
  return (
    <NavBar.Root {...rest} themeName={appliedTheme}>
      {children}
    </NavBar.Root>
  )
}

const Trigger: React.FC<ITailwindTheme> = (props)=>{
  const {themeName,...rest} = props
  let appliedTheme = themeName?themeName:"NavBarTrigger"
  return (
  <NavBar.Trigger {...rest} themeName={appliedTheme}> 
    {(state, onClick) => (state ? 
    (
        <Button.LeftButton tooltipContent="Collapse"
            twTopRightBottomLeft="top-1/2"
            onClick={onClick}
        /> 
      ) : (
        <Button.RightButton tooltipContent="Expand"
            twTopRightBottomLeft="top-1/2"
            onClick={onClick}
        />
    ))}
</NavBar.Trigger>)
}

const Content = React.forwardRef<NavBar.DivRef, NavBar.NavBarProps>((props, ref=null)=>{
  const {children, themeName, ...rest} = props; 
  let appliedThemeName = themeName?themeName:"NavBarContent";
  return (
    <NavBar.Content ref={ref} {...rest} themeName={appliedThemeName}>
      {children}
    </NavBar.Content>
  )
})

export {
  Root,
  Trigger,
  Content
}