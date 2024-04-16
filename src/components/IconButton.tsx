import * as React from "react";
import { ITailwindTheme } from "./style";
import { useThemeContext, Theme } from "./ThemeContext";
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;
type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement>;
type ButtonLabelProps = ButtonProps & LabelProps;

export interface IconProps extends ButtonLabelProps, ITailwindTheme {
  icon: React.JSX.Element;
  buttonElement?: "button" | "label";
}

const IconButton = React.forwardRef<
  HTMLButtonElement | HTMLLabelElement,
  IconProps
>((props, ref) => {
  const { icon, buttonElement = "button", ...other } = props;
  const theme = useThemeContext();
  const { className, rest } = Theme.getClassName(other, theme);

  console.log(className);
  const RenderButton = (
    <button
      className={className}
      {...rest}
      ref={ref as React.Ref<HTMLButtonElement>}
    >
      {icon}
    </button>
  );

  const RenderedLabel = (
    <label
      className={className}
      {...rest}
      ref={ref as React.Ref<HTMLLabelElement>}
    >
      {icon}
    </label>
  );
  return <>{buttonElement === "button" ? RenderButton : RenderedLabel}</>;
});

IconButton.displayName = "IconButton";

export default IconButton;

export interface ToggleIconProps extends ButtonProps, ITailwindTheme {
  state: boolean;
  onIcon: React.JSX.Element;
  offIcon: React.JSX.Element;
}

export const ToggleButton = React.forwardRef<HTMLButtonElement, ToggleIconProps>(
  (props, ref) => {
    const { state, onIcon, offIcon, ...other } = props;
    const theme = useThemeContext();
    const { className, rest } = Theme.getClassName(other, theme);
    const button = state ? (
      <button className={className} {...rest} ref={ref}>
        {onIcon}
      </button>
    ) : (
      <button className={className} {...rest} ref={ref}>
        {offIcon}
      </button>
    );
    return button;
  }
);

