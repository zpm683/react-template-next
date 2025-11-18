import { useController, useFormContext } from "react-hook-form";

import FormGroup, { FormGroupProps } from "@mui/material/FormGroup";

import { Checkbox, CheckboxProps, Label } from "../../../atoms";
import { ErrorHelper } from "../error-helper";
import { useFormUiContext } from "../form-context";
import { CommonControllerProps, OmitRenderProps } from "./type";

type CheckboxGroupControllerProps = CommonControllerProps & {
  options: CheckboxProps[];
} & OmitRenderProps<FormGroupProps>;

const CheckboxGroupController = ({
  name,
  options,
  errorHelperProps,
  disabled,
  label,
  required,
  hiddenErrorHelper = false,
  labelProps,
  ...formGroupProps
}: CheckboxGroupControllerProps) => {
  const { control } = useFormContext();
  const {
    field: { ref, onChange, value: checkedVal = [], ...rest },
    fieldState: { error },
  } = useController({ name, control });

  const { alignWidth, hiddenAllErrorHelper = false } = useFormUiContext();
  const showErrorHelper = !hiddenErrorHelper && !hiddenAllErrorHelper;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      onChange([...new Set([...checkedVal, e.target.value])]);
      return;
    }

    onChange([...checkedVal].filter((value) => value !== e.target.value));
  };

  return (
    <>
      <Label
        required={required}
        labelText={label}
        alignWidth={alignWidth}
        {...labelProps}
      >
        <FormGroup
          ref={ref}
          onChange={handleChange}
          {...rest}
          {...formGroupProps}
        >
          {options.map((op) => (
            <Checkbox
              {...op}
              key={op.value as string}
              value={op.value}
              checked={checkedVal.includes(op.value as string)}
              disabled={disabled}
            />
          ))}
        </FormGroup>
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

export { CheckboxGroupController };
export type { CheckboxGroupControllerProps };
