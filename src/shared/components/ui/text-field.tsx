import { forwardRef, Ref } from "react";

import { cn } from "shared/utils";

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
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  inputRef?: Ref<HTMLInputElement | HTMLTextAreaElement>;
  multiline?: boolean;
  rows?: number;
  size?: "small" | "medium";
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "onChange"> &
  Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "onChange">;

const TextField = forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  TextFieldProps
>(
  (
    {
      maxLength,
      inputTypes,
      onValChange = () => undefined,
      inputRef,
      multiline = false,
      rows = 3,
      size = "medium",
      className,
      onChange,
      ...props
    },
    ref,
  ) => {
    const handleChange: React.ChangeEventHandler<
      HTMLInputElement | HTMLTextAreaElement
    > = (e) => {
      let val = e.target.value;

      if (!inputTypes) {
        onValChange(val);
        onChange?.(e);
        return;
      }

      // 入力種別から入力内容を処理する
      inputTypes.forEach((type) => {
        val = INPUT_TYPES_SOLVER_MAP[type](val);
      });

      e.target.value = val;
      onValChange(val);
      onChange?.(e);
    };

    const commonProps = {
      ...props,
      maxLength,
      onChange: handleChange,
      className: cn(
        "w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground shadow-xs transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50",
        size === "small" ? "min-h-8" : "min-h-10",
        multiline ? "py-2" : "",
        className,
      ),
    };

    if (multiline) {
      return (
        <textarea
          {...(commonProps as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          ref={(inputRef ?? ref) as Ref<HTMLTextAreaElement>}
          rows={rows}
        />
      );
    }

    return (
      <input
        {...(commonProps as React.InputHTMLAttributes<HTMLInputElement>)}
        ref={(inputRef ?? ref) as Ref<HTMLInputElement>}
      />
    );
  },
);

export { TextField };
export type { TextFieldProps };
