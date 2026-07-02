import { useController, useFormContext } from "react-hook-form";

import { Label, Select, SelectOption, SelectProps } from "../../ui";
import { ErrorHelper } from "../error-helper";
import { useFormUiContext } from "../form-context";
import { CommonControllerProps, OmitRenderProps } from "./type";

type SelectControllerProps = CommonControllerProps & {
  options: SelectOption[];
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
    field: { value, onChange, onBlur },
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
          value={value ?? ""}
          onChange={onChange}
          onBlur={onBlur}
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
