import { FieldError } from "react-hook-form";

import { colors, FormHelperText, FormHelperTextProps } from "@mui/material";

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
        color: colors.red["500"],
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
