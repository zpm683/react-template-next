import { useController, useFormContext } from "react-hook-form";

import { RadioGroup as RadioGroupPrimitive } from "radix-ui";

import { Label, Radio, RadioProps } from "../../ui";
import { ErrorHelper } from "../error-helper";
import { useFormUiContext } from "../form-context";
import { CommonControllerProps, OmitRenderProps } from "./type";

type RadioGroupControllerProps = CommonControllerProps & {
  options: RadioProps[];
} & OmitRenderProps<RadioGroupPrimitive.RadioGroupProps>;

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
    field: { value, onChange, name: fieldName },
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
        <RadioGroupPrimitive.Root
          value={value ?? ""}
          onValueChange={onChange}
          className={`flex flex-row flex-wrap items-center gap-x-4 gap-y-2 ${radioGroupProps.className ?? ""}`.trim()}
          {...radioGroupProps}
        >
          {options.map((el, index) => (
            <Radio
              {...el}
              key={index}
              name={fieldName}
              disabled={disabled || el.disabled}
            />
          ))}
        </RadioGroupPrimitive.Root>
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
