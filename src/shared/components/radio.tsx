import { forwardRef, PropsWithChildren } from "react";

import FormControlLabel from "@mui/material/FormControlLabel";
import MuiRadio, { RadioProps as MuiRadioProps } from "@mui/material/Radio";

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
