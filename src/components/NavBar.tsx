import * as React from "react";
import { ITailwindTheme } from "./context/types";
import { styled } from "./context/factory";
import {
  DoubleArrowLeftIcon as LeftIcon,
  DoubleArrowRightIcon as RightIcon,
} from "@radix-ui/react-icons";

type DivProps = React.ComponentPropsWithoutRef<"div">;
type DivRef = React.ElementRef<"div">;

interface NavBarProps extends ITailwindTheme, DivProps {
  /**
   * Width of the element - set as inline-style
   */
  width: string;
  iconProps?: ITailwindTheme;
  buttonProps?: ITailwindTheme;
  triggerProps?: ITailwindTheme;
}

const NavBar = React.forwardRef<DivRef, NavBarProps>((props, ref) => {
  const {
    width,
    children,
    iconProps = { themeName: "icons" },
    buttonProps = { themeName: "NavBarToggleButton" },
    triggerProps = { themeName: "NavBarTrigger" },
    ...rest
  } = props;
  const [visible, setVisible] = React.useState(false);
  const [displayWidth, setDisplayWidth] = React.useState(width);
  const onPressedChange = () => {
    if (visible) {
      setDisplayWidth("0px");
    } else {
      setDisplayWidth(width);
    }
    setVisible(!visible);
  };

  const SLeftIcon = styled(LeftIcon);
  const SRightIcon = styled(RightIcon);

  return (
    <styled.div ref={ref} style={{ width: displayWidth }}>
      <styled.div {...triggerProps} ref={null}>
        {visible ? (
          <styled.button {...buttonProps} ref={null} onClick={onPressedChange}>
            <SLeftIcon {...iconProps} ref={null} />
          </styled.button>
        ) : (
          <styled.button {...buttonProps} ref={null}>
            <SRightIcon {...iconProps} ref={null} />
          </styled.button>
        )}
      </styled.div>
      {children}
    </styled.div>
  );
});

function NavBarTrigger() {}
