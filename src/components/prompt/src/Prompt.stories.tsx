import React from "react";
import {Meta, StoryObj} from "@storybook/react"
import { Prompt } from "./Prompt";

function TestComponent(){
    return <Prompt/>
}

const meta: Meta<typeof TestComponent> = {
    title: "Prompt",
    component: TestComponent
}

export default meta 

type Story = StoryObj<typeof TestComponent>

export const Default: Story = {

}