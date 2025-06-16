import { useController, useFormContext } from "react-hook-form";

import { Label, LabelProps } from "../../../atoms";
import { ErrorHelper } from "../error-helper";
import { useFormUiContext } from "../form-context";
import { CommonControllerProps } from "./type";

type DisplayControllerProps = CommonControllerProps & LabelProps;

const DisplayController: React.FC<DisplayControllerProps> = ({
  name,
  children,
  errorHelperProps,
  label,
  required,
  hiddenErrorHelper = false,
  ...labelProps
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
        {...labelProps}
        required={required}
        labelText={label}
        alignWidth={alignWidth}
        valueText={field.value}
      >
        {children}
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

export { DisplayController };
export type { DisplayControllerProps };
