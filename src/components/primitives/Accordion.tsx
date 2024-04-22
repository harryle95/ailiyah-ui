import * as React from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { ITailwindTheme, styled } from "../context";
import "./Accordion.css"

const Root = styled(Accordion.Root);
const Content = styled(Accordion.Content);
const Item = styled(Accordion.Item);

type TriggerProps = Accordion.AccordionTriggerProps & ITailwindTheme;


/**
 * Icons under Trigger can be rotated by setting data-rotate = 45|90|135|180|225|270|315
 * Transformation will be applied once the data state is set to open 
 */
const Trigger = React.forwardRef<HTMLButtonElement, TriggerProps>(
  (props, ref) => {
    const { children, ...rest } = props;
    const _Trigger = styled(Accordion.Trigger)
    return (
      <Accordion.Header className="AccordionHeader">
        <_Trigger {...rest} ref={ref}>
          {children}
        </_Trigger>
      </Accordion.Header>
    );
  }
);

export { Root, Item, Trigger, Content };
