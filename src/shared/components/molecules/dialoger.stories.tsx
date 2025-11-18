import Button from "@mui/material/Button";
import type { Meta } from "@storybook/react";

import { Dialoger, DialogerProvider, useDialoger } from "./dialogger";

const meta = {
  title: "molecules/Dialoger",
  component: Dialoger,
} satisfies Meta<typeof Dialoger>;

export default meta;

const Comp = () => {
  const dialoger = useDialoger();
  const handleClick = () => {
    dialoger.current?.open();
  };

  return <Button onClick={handleClick}>Open Dialog</Button>;
};

export const DialogerDemo = () => {
  return (
    <DialogerProvider>
      <Comp />
    </DialogerProvider>
  );
};
