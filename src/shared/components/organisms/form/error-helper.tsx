import { FieldError } from "react-hook-form";

import { FormHelperText, FormHelperTextProps } from "@mui/material";

import { useFormUiContext } from "./form-context";

type ErrorHelperProps = FormHelperTextProps & {
  fieldError?: FieldError;
  noLable?: boolean;
};

const LABEL_INPUTER_GAP = 12;
const ErrorHelper: React.FC<ErrorHelperProps> = ({
  fieldError,
  noLable = false,
  ...props
}) => {
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
