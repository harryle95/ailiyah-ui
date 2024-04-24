import * as React from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { TailwindProps, styled } from "../context/src";
import "./Accordion.css";

/**
 * @radix-ui accordion Root with tailwind props
 */
const Root = styled(Accordion.Root);

/**
 * @radix-ui accordion Content with tailwind props
 */
const Content = styled(Accordion.Content);

/**
 * @radix-ui accordion Item with tailwind props
 */
const Item = styled(Accordion.Item);

type TriggerProps = Accordion.AccordionTriggerProps & TailwindProps;

/**
 * Combines @radix-ui accordion header and trigger. tailwind props provided are
 * for styling radix-ui accordion's Trigger button.
 *
 * Icons under Trigger can be rotated by setting data-rotate = 45|90|135|180|225|270|315.
 *
 * Transformation will be applied once the data state is set to open
 *
 */
const Trigger = React.forwardRef<HTMLButtonElement, TriggerProps>(
  (props, ref) => {
    const { children, key, ...rest } = props;
    const _Trigger = styled(Accordion.Trigger);
    return (
      <Accordion.Header className="AccordionHeader" key={key}>
        <_Trigger {...rest} ref={ref}>
          {children}
        </_Trigger>
      </Accordion.Header>
    );
  }
);

export { Root, Item, Trigger, Content };
