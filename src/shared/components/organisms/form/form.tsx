/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import {
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
} from "react-hook-form";

import Box, { BoxProps } from "@mui/material/Box";

import { FormUiContext, FormUiProvider } from "./form-context";

type FormBoxProps = BoxProps & React.FormHTMLAttributes<HTMLFormElement>;
const FormBox = ({ children, ...props }: FormBoxProps) => {
  return (
    <Box {...props} component="form">
      {children}
    </Box>
  );
};

type FormBaseProps = React.PropsWithChildren<{
  form: any;
  onSuccess?: SubmitHandler<any>;
  onError?: SubmitErrorHandler<any>;
}> &
  FormUiContext;

type FormProps = FormBaseProps &
  Omit<FormBoxProps, "component" | "onSubmit" | "onError">;

/**
 * Form
 */
const Form = ({
  form,
  onSuccess,
  onError,
  children,
  alignWidth,
  hiddenAllErrorHelper,
  ...rootProps
}: FormProps) => {
  const { handleSubmit } = form;

  return (
    <FormUiProvider
      alignWidth={alignWidth}
      hiddenAllErrorHelper={hiddenAllErrorHelper}
    >
      <FormProvider {...form}>
        <FormBox
          autoComplete="off"
          {...rootProps}
          onSubmit={handleSubmit(onSuccess, onError)}
        >
          {children}
        </FormBox>
      </FormProvider>
    </FormUiProvider>
  );
};

export { Form };
export type { FormProps, FormBaseProps };
