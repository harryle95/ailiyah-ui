import { PrimitiveProps } from "./types";
import { TailwindProps } from "@ailiyah-ui/utils";

interface NavBarContextValue {
  activeState: boolean;
  setActiveState: Function;
}

interface NavBarProps extends PrimitiveProps.DivProps, TailwindProps {}

interface NavBarTriggerProps extends Omit<NavBarProps, "children"> {
  children?:
    | React.ReactNode
    | ((
        state: boolean,
        trigger: React.MouseEventHandler<HTMLButtonElement>
      ) => React.ReactNode);
}

export type { NavBarContextValue, NavBarProps, NavBarTriggerProps };
