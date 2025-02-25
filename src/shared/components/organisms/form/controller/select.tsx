import { useController, useFormContext } from "react-hook-form";

import { MenuItemProps } from "@mui/material";

import { Label, Select, SelectProps } from "../../../atoms";
import { ErrorHelper } from "../error-helper";
import { useFormUiContext } from "../form-context";
import { CommonControllerProps, OmitRenderProps } from "./type";

type SelectControllerProps = CommonControllerProps & {
  options: MenuItemProps[];
} & OmitRenderProps<SelectProps>;

const SelectController: React.FC<SelectControllerProps> = ({
  name,
  options,
  errorHelperProps,
  disabled,
  label,
  required,
  hiddenErrorHelper = false,
  labelProps,
  ...selectProps
}) => {
  const { control } = useFormContext();
  const {
    field,
    fieldState: { error },
  } = useController({ name, control });

  const { alignWidth, hiddenAllErrorHelper = false } = useFormUiContext();
  const showErrorHelper = !hiddenErrorHelper && !hiddenAllErrorHelper;

  return (
    <>
      <Label
        required={required}
        labelText={label}
        alignWidth={alignWidth}
        {...labelProps}
      >
        <Select
          {...field}
          size="small"
          options={options}
          disabled={disabled}
          {...selectProps}
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

export { SelectController };
export type { SelectControllerProps };
