import { useController, useFormContext } from "react-hook-form";

import dayjs from "dayjs";

import { toDateString } from "shared/utils";

import { DatePicker, DatePickerProps, Label } from "../../ui";
import { ErrorHelper } from "../error-helper";
import { useFormUiContext } from "../form-context";
import { CommonControllerProps, OmitRenderProps } from "./type";

export type DatePickerControllerProps = CommonControllerProps &
  OmitRenderProps<DatePickerProps>;

const DatePickerController: React.FC<DatePickerControllerProps> = ({
  name,
  errorHelperProps,
  disabled,
  label,
  required,
  hiddenErrorHelper = false,
  labelProps,
  ...datePickerProps
}) => {
  const { control } = useFormContext();
  const {
    field: { value, onChange, ref: controlRefCallBack, ...restRenderProps },
    fieldState: { error },
  } = useController({ name, control });

  const { alignWidth, hiddenAllErrorHelper = false } = useFormUiContext();
  const showErrorHelper = !hiddenErrorHelper && !hiddenAllErrorHelper;

  const handleChange = (date: Date | null) => {
    if (!date) {
      onChange(null);
      return;
    }

    onChange(toDateString(date));
  };

  return (
    <>
      <Label
        required={required}
        labelText={label}
        alignWidth={alignWidth}
        {...labelProps}
      >
        <DatePicker
          value={value}
          onChange={handleChange}
          disabled={disabled}
          {...restRenderProps}
          {...datePickerProps}
        />
      </Label>
      {showErrorHelper && (
        <ErrorHelper
          noLable={!label}
          fieldError={error}
          {...errorHelperProps}
        />
      )}
    </>
  );
};

export { DatePickerController };
