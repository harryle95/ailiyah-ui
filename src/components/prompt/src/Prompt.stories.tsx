import React from "react";
import {Meta, StoryObj} from "@storybook/react"
import { Prompt } from "./Prompt";
import { ThemeProvider } from "@ailiyah-ui/context";
import { theme } from "./theme";
import { styled } from "@ailiyah-ui/factory";

function TestComponent(){
    return <ThemeProvider value={theme}><Prompt/></ThemeProvider>
}

const meta: Meta<typeof TestComponent> = {
    title: "Prompt",
    component: TestComponent
}

export default meta 

type Story = StoryObj<typeof TestComponent>

export const Default: Story = {
    decorators: [
        (Story) => (
          <styled.div twWidth="w-[600px]" twHeight="h-[600px]">
            <Story />
          </styled.div>
        ),
      ],
}