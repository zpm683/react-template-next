import { forwardRef } from "react";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  DatePicker as MuiDatePicker,
  DatePickerProps as MuiDatePickerProps,
} from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Dayjs } from "dayjs";
import "dayjs/locale/ja";

export type DatePickerProps = MuiDatePickerProps<Dayjs> & {
  placeholder?: string;
};

export const DatePicker = forwardRef<HTMLDivElement, DatePickerProps>(
  ({ placeholder, slots = {}, ...restProps }, ref) => {
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ja">
        <MuiDatePicker
          ref={ref}
          views={["year", "month", "day"]}
          reduceAnimations
          slots={{ ...slots }}
          slotProps={{
            openPickerButton: {
              sx: {
                "&:hover": {
                  backgroundColor: "transparent",
                },
              },
              disableRipple: true,
            },
            day: {
              sx: {
                "&:hover": {
                  borderRadius: "50%",
                },
                "&.Mui-selected": {
                  borderRadius: "50%",
                },
                "&:not(.Mui-selected)": {
                  borderRadius: "50%",
                },
              },
            },
            textField: (params) => ({
              sx: {
                "& .MuiInput-root": {
                  height: 32,
                  width: 160,
                  padding: "0px",
                  border: `1px solid transparent`,
                  borderBottom: `1px dashed`,
                  borderRadius: "0px",
                  "&:after": {
                    borderBottom: 0,
                  },
                  "&:before": {
                    borderBottom: 0,
                  },

                  "&:hover": {},
                },
                "& .MuiInput-input": {
                  minWidth: 114,
                  padding: "0px 8px",
                },
                "& .MuiButtonBase-root": {
                  padding: "0px ",
                  margin: "0px ",
                },
              },
              variant: "standard",
              inputProps: { ...params.inputProps, placeholder },
            }),
          }}
          {...restProps}
        />
      </LocalizationProvider>
    );
  },
);
