import { FieldError } from "react-hook-form";

import { red } from "@mui/material/colors";
import FormHelperText, {
  FormHelperTextProps,
} from "@mui/material/FormHelperText";

import { useFormUiContext } from "./form-context";

type ErrorHelperProps = FormHelperTextProps & {
  fieldError?: FieldError;
  noLable?: boolean;
};

const LABEL_INPUTER_GAP = 12;
const ErrorHelper = ({
  fieldError,
  noLable = false,
  ...props
}: ErrorHelperProps) => {
  const { alignWidth } = useFormUiContext();

  if (!fieldError) return null;

  const marginLeft = alignWidth
    ? noLable
      ? undefined
      : alignWidth + LABEL_INPUTER_GAP
    : undefined;

  return (
    <FormHelperText
      {...props}
      style={{
        color: red["500"],
        marginLeft,
        ...props.style,
      }}
    >
      {fieldError.message}
    </FormHelperText>
  );
};

export { ErrorHelper };
export type { ErrorHelperProps };
