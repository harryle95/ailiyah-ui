import * as React from "react";
import { Accordion } from "../components/primitives";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { styled } from "../components/context";
const TAGS = Array.from({ length: 10 }).map((_, i, a) => `${a.length - i}`);

export function Demo() {
  return (
    <Accordion.Root type="multiple">
      {TAGS ? (
        TAGS.map((item) => (
          <Accordion.Item value={item}>
            <Accordion.Trigger twWidth="w-[125px]" twBorderWidth="border" twFlex="flex" twAlignItems="items-center">
              <styled.p twWidth="w-fit" twPadding="px-3" twFlexGrow="flex-grow">{item}</styled.p>
              <ChevronDownIcon data-rotate="180" />
            </Accordion.Trigger>
            <Accordion.Content>{`v1.2.0-beta.${item}`}</Accordion.Content>
          </Accordion.Item>
        ))
      ) : (
        <></>
      )}
    </Accordion.Root>
  );
}
