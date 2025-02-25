import { forwardRef, PropsWithChildren } from "react";

import {
  FormControlLabel,
  Radio as MuiRadio,
  RadioProps as MuiRadioProps,
} from "@mui/material";

/** Props */
export type RadioProps = MuiRadioProps & PropsWithChildren;

/** Radio Component */
export const Radio = forwardRef<HTMLButtonElement, RadioProps>(
  ({ children, ...props }, ref) => {
    return (
      <FormControlLabel
        control={
          <MuiRadio
            ref={ref}
            {...props}
            color="primary"
            className={!children ? "MuiRadio-radioOnly" : undefined}
          />
        }
        label={children}
      />
    );
  },
);
