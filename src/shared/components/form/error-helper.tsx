import { FieldError } from "react-hook-form";

import { useFormUiContext } from "./form-context";

type ErrorHelperProps = React.HTMLAttributes<HTMLParagraphElement> & {
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
    <p
      {...props}
      style={{
        marginLeft,
        ...props.style,
      }}
      className={`text-sm text-destructive ${props.className ?? ""}`.trim()}
    >
      {fieldError.message}
    </p>
  );
};

export { ErrorHelper };
export type { ErrorHelperProps };
