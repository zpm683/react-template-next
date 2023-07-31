import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "./button";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "atoms/Button",
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Btn: Story = {
  args: {
    label: "Button",
  },
};
