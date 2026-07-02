import { useController, useFormContext } from "react-hook-form";

import { Checkbox, CheckboxProps, Label } from "../../ui";
import { ErrorHelper } from "../error-helper";
import { useFormUiContext } from "../form-context";
import { CommonControllerProps, OmitRenderProps } from "./type";

type CheckboxGroupControllerProps = CommonControllerProps & {
  options: CheckboxProps[];
} & OmitRenderProps<React.HTMLAttributes<HTMLDivElement>>;

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
        <div
          {...rest}
          {...formGroupProps}
          className={`flex flex-row flex-wrap items-center gap-x-4 gap-y-2 ${formGroupProps.className ?? ""}`.trim()}
        >
          {options.map((op) => {
            const { value: optionValue, ...optionProps } = op;
            const optionKey = String(optionValue);

            return (
              <Checkbox
                {...optionProps}
                key={optionKey}
                value={optionValue}
                checked={checkedVal.includes(optionValue as string)}
                disabled={disabled}
                onChange={handleChange}
              />
            );
          })}
        </div>
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
