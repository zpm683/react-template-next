import {
  TextField as MuiTextField,
  TextFieldProps as MuiTextFieldProps,
  styled,
} from "@mui/material";

type TextFieldProps = MuiTextFieldProps;
const TextField = styled(MuiTextField)();

export { TextField };
export type { TextFieldProps };
