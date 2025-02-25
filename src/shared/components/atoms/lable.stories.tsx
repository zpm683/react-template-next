import type { Meta, StoryObj } from "@storybook/react";

import { Label } from "./lable";

const meta = {
  title: "atoms/Label",
  component: Label,
} satisfies Meta<typeof Label>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Btn: Story = {
  args: {
    required: true,
    labelText: "Label",
    valueText: "Value",
  },
};
