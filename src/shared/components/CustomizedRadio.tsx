import { Radio, RadioProps } from "@mui/material";
import { indigo, grey } from "@mui/material/colors";
import { FC } from "react";

export const CustomizedRadio: FC<RadioProps> = (children) => (
  <Radio
    {...children}
    sx={{
      color: grey[400],
      "&.Mui-checked": {
        color: indigo[900],
      },
    }}
  />
);
