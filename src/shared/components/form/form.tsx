/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { CSSProperties } from "react";
import {
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
} from "react-hook-form";

import { FormUiContext, FormUiProvider } from "./form-context";

type FormBoxProps = React.FormHTMLAttributes<HTMLFormElement> & {
  display?: CSSProperties["display"];
  flexDirection?: CSSProperties["flexDirection"];
  width?: CSSProperties["width"];
  gap?: CSSProperties["gap"];
  alignItems?: CSSProperties["alignItems"];
  justifyContent?: CSSProperties["justifyContent"];
};

const FormBox = ({ children, ...props }: FormBoxProps) => {
  const {
    display,
    flexDirection,
    width,
    gap,
    alignItems,
    justifyContent,
    style,
    ...restProps
  } = props;

  return (
    <form
      {...restProps}
      style={{
        display,
        flexDirection,
        width,
        gap,
        alignItems,
        justifyContent,
        ...style,
      }}
    >
      {children}
    </form>
  );
};

type FormBaseProps = React.PropsWithChildren<{
  form: any;
  onSuccess?: SubmitHandler<any>;
  onError?: SubmitErrorHandler<any>;
}> &
  FormUiContext;

type FormProps = FormBaseProps & Omit<FormBoxProps, "onSubmit" | "onError">;

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
