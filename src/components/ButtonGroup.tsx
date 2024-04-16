import * as React from "react";

interface ButtonGroup extends React.HTMLAttributes<HTMLDivElement> {
  slotProps: React.HTMLAttributes<HTMLDivElement>;
}

const ButtonGroup = React.forwardRef(
  (props: ButtonGroup, ref: React.ForwardedRef<HTMLDivElement>) => {
    let {
      children,
      className = "",
      slotProps = { className: "flex items-center gap-y-4" },
      ...rest
    } = props;
    let classNameValue = `c-button-group ${className}`;
    return (
      <div className={classNameValue} ref={ref} {...rest}>
        <div {...slotProps}>{children}</div>
      </div>
    );
  }
);

ButtonGroup.displayName = "ButtonGroup";
export default ButtonGroup;
