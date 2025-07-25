import { useController, useFormContext } from "react-hook-form";

import RadioGroup, { RadioGroupProps } from "@mui/material/RadioGroup";

import { Label, Radio, RadioProps } from "../../../atoms";
import { ErrorHelper } from "../error-helper";
import { useFormUiContext } from "../form-context";
import { CommonControllerProps, OmitRenderProps } from "./type";

type RadioGroupControllerProps = CommonControllerProps & {
  options: RadioProps[];
} & OmitRenderProps<RadioGroupProps>;

const RadioGroupController: React.FC<RadioGroupControllerProps> = ({
  name,
  options,
  errorHelperProps,
  disabled,
  required,
  label,
  hiddenErrorHelper = false,
  labelProps,
  ...radioGroupProps
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
        <RadioGroup {...field} {...radioGroupProps}>
          {options.map((el, index) => (
            <Radio {...el} key={index} disabled={disabled} />
          ))}
        </RadioGroup>
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

export { RadioGroupController };
export type { RadioGroupControllerProps };
