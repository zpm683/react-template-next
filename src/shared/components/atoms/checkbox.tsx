import { forwardRef, PropsWithChildren } from "react";

import {
  FormControlLabel,
  Checkbox as MuiCheckbox,
  CheckboxProps as MuiCheckboxProps,
} from "@mui/material";

/** Props */
export type CheckboxProps = MuiCheckboxProps & PropsWithChildren;

/** Checkbox Component */
export const Checkbox = forwardRef<HTMLButtonElement, CheckboxProps>(
  ({ children, ...props }, ref) => {
    return (
      <FormControlLabel
        sx={{
          margin: "0px",
        }}
        control={
          <MuiCheckbox
            ref={ref}
            {...props}
            color="primary"
            className={!children ? "MuiCheckbox-checkboxOnly" : undefined}
          />
        }
        label={children}
      />
    );
  },
);
