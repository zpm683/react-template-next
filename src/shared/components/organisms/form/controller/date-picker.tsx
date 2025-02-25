import { useController, useFormContext } from "react-hook-form";

import dayjs from "dayjs";

import { toDateString } from "shared/utils";

import { DatePicker, DatePickerProps, Label } from "../../../atoms";
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

  const handleChange = (e: dayjs.Dayjs | null) => {
    if (!e) {
      onChange(null);
      return;
    }

    onChange(toDateString(e.toDate()));
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
          value={value !== null ? dayjs(value) : null}
          onChange={handleChange}
          disabled={disabled}
          inputRef={controlRefCallBack}
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
