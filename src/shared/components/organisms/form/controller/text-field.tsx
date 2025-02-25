import { useController, useFormContext } from "react-hook-form";

import { TextField, TextFieldProps } from "../../../atoms";
import { Label } from "../../../atoms";
import { ErrorHelper } from "../error-helper";
import { useFormUiContext } from "../form-context";
import { CommonControllerProps, OmitRenderProps } from "./type";

const INPUT_TYPES_SOLVER_MAP = {
  /** 数字 */
  number: (val: string) => val.replace(/[^0-9０-９]/g, ""),
  /** 半角 */
  halfAngle: (val: string) => val.replace(/[！-～]/g, ""),
  /** 全角 */
  fullAngle: (val: string) => val.replace(/[!-~]/g, ""),
  /** 片仮名 */
  katakana: (val: string) => val.replace(/[^ァ-ヶ]/g, ""),
  /** 平仮名 */
  hiragana: (val: string) => val.replace(/[^ぁ-ん]/g, ""),

  // TODO：add more
};

type TextFieldControllerProps = CommonControllerProps & {
  /** 入力可能の最大長さ */
  maxLength?: number;
  /**
   * 入力種別
   * @note ルールは重ねて適用することができる
   * @example inputTypes=["number"] ==> 半角/全角数字入力可能
   * @example inputTypes=["halfAngle","number"] ==> 半角数字だけ入力可能
   */
  inputTypes?: (keyof typeof INPUT_TYPES_SOLVER_MAP)[];
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
  inputTypes,
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

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    let val = e.target.value;
    if (!inputTypes) {
      onChange(val);
      return;
    }

    inputTypes.forEach((tyep) => {
      val = INPUT_TYPES_SOLVER_MAP[tyep](val);
    });

    onChange(val);
  };

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
          inputRef={controlRefCallBack}
          slotProps={{
            htmlInput: { maxLength: maxLength },
          }}
          onChange={handleChange}
          disabled={disabled}
          size="small"
          style={{
            backgroundColor: error ? "red" : "white",
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
