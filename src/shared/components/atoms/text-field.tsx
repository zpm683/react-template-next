import {
  TextField as MuiTextField,
  TextFieldProps as MuiTextFieldProps,
} from "@mui/material";

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
};

type TextFieldProps = {
  maxLength?: number;
  inputTypes?: (keyof typeof INPUT_TYPES_SOLVER_MAP)[];
  onValChange?: (val: string) => void;
} & MuiTextFieldProps;

const TextField: React.FC<TextFieldProps> = ({
  maxLength,
  inputTypes,
  onValChange = () => undefined,
  ...props
}) => {
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    let val = e.target.value;

    if (!inputTypes) {
      onValChange(val);
      return;
    }

    // 入力種別から入力内容を処理する
    inputTypes.forEach((tyep) => {
      val = INPUT_TYPES_SOLVER_MAP[tyep](val);
    });

    onValChange(val);
  };

  return (
    <MuiTextField
      slotProps={{ htmlInput: { maxLength } }}
      {...props}
      onChange={handleChange}
    />
  );
};

export { TextField };
export type { TextFieldProps };
