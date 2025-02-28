import { useController, useFormContext } from "react-hook-form";

import { colors } from "@mui/material";

import { TextField, TextFieldProps } from "../../../atoms";
import { Label } from "../../../atoms";
import { ErrorHelper } from "../error-helper";
import { useFormUiContext } from "../form-context";
import { CommonControllerProps, OmitRenderProps } from "./type";

type TextFieldControllerProps = CommonControllerProps & {
  /** 計量単位 */
  unit?: React.ReactNode;
} & OmitRenderProps<TextFieldProps>;

const TextFieldController: React.FC<TextFieldControllerProps> = ({
  name,
  label,
  labelProps,
  errorHelperProps,
  required,
  disabled,
  maxLength,
  hiddenErrorHelper = false,
  unit,
  ...textFieldProps
}) => {
  const { control } = useFormContext();
  const {
    field: { onChange, ref: controlRefCallBack, ...restRenderProps },
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
        <TextField
          {...restRenderProps}
          {...textFieldProps}
          maxLength={maxLength}
          inputRef={controlRefCallBack}
          onValChange={onChange}
          disabled={disabled}
          size="small"
          style={{
            backgroundColor: error ? colors.red[100] : "white",
            ...textFieldProps.style,
          }}
        />
        <span>{unit}</span>
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

export { TextFieldController };
export type { TextFieldControllerProps };
