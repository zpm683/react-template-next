import { useController, useFormContext } from "react-hook-form";

import { Checkbox, CheckboxProps, Label } from "../../../atoms";
import { ErrorHelper } from "../error-helper";
import { useFormUiContext } from "../form-context";
import { CommonControllerProps, OmitRenderProps } from "./type";

type CheckboxControllerProps = CommonControllerProps &
  OmitRenderProps<CheckboxProps>;

const CheckboxController: React.FC<CheckboxControllerProps> = ({
  name,
  children,
  errorHelperProps,
  disabled,
  label,
  required,
  hiddenErrorHelper = false,
  labelProps,
  ...checkboxProps
}) => {
  const { control } = useFormContext();
  const { alignWidth, hiddenAllErrorHelper = false } = useFormUiContext();
  const showErrorHelper = !hiddenErrorHelper && !hiddenAllErrorHelper;

  const {
    field,
    fieldState: { error },
  } = useController({ name, control });

  return (
    <>
      <Label
        required={required}
        labelText={label}
        alignWidth={alignWidth}
        {...labelProps}
      >
        <Checkbox
          {...field}
          {...checkboxProps}
          disabled={disabled}
          checked={field.value === true}
        >
          {children}
        </Checkbox>
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

export { CheckboxController };
export type { CheckboxControllerProps };
