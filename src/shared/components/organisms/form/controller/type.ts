import { ControllerRenderProps } from "react-hook-form";

import { LabelProps } from "../../../atoms";
import { ErrorHelperProps } from "../error-helper";

/**
 * Type to omit render props from a given type.
 */
export type OmitRenderProps<T> = Omit<T, keyof ControllerRenderProps>;

/**
 * Common properties for form controllers.
 */
export type CommonControllerProps = {
  /** The name (key) of the form item */
  name: string;
  /** The label text */
  label?: string;
  /** Whether the form item is disabled */
  disabled?: boolean;
  /** Whether the form item is required */
  required?: boolean;
  /** Props for the error helper component */
  errorHelperProps?: Omit<ErrorHelperProps, "fieldError">;
  /** Props for the label component */
  labelProps?: Omit<LabelProps, "type" | "labelText" | "required">;
  /** Whether to hide the error helper */
  hiddenErrorHelper?: boolean;
};
