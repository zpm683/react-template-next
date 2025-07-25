import { forwardRef, PropsWithChildren } from "react";

import FormControl from "@mui/material/FormControl";
import MenuItem, { MenuItemProps } from "@mui/material/MenuItem";
import MuiSelect, { SelectProps as MuiSelectProps } from "@mui/material/Select";

/** Select Props */
export type SelectProps = MuiSelectProps &
  PropsWithChildren<{ minWidth?: string | number; options?: MenuItemProps[] }>;

/** Select Component */
export const Select = forwardRef<unknown, SelectProps>(
  (
    { value = "", size = "medium", minWidth = "160px", options = [], ...props },
    ref,
  ) => {
    return (
      <FormControl style={{ minWidth: minWidth }}>
        <MuiSelect
          ref={ref}
          {...props}
          variant="standard"
          value={value}
          MenuProps={{
            anchorOrigin: { vertical: "bottom", horizontal: "left" },
            transformOrigin: { vertical: "top", horizontal: "left" },
          }}
        >
          {options.map((props, index) => (
            <MenuItem {...props} key={index} />
          ))}
        </MuiSelect>
      </FormControl>
    );
  },
);
