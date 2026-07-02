import { forwardRef, PropsWithChildren } from "react";

import { CheckIcon } from "lucide-react";
import { Checkbox as CheckboxPrimitive } from "radix-ui";

import { cn } from "shared/utils";

/** Props */
export type CheckboxProps = PropsWithChildren<{
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  value?: string | number;
  className?: string;
  onBlur?: React.FocusEventHandler<HTMLButtonElement>;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}>;

/** Checkbox Component */
export const Checkbox = forwardRef<HTMLButtonElement, CheckboxProps>(
  (
    {
      children,
      checked,
      defaultChecked,
      disabled,
      value,
      onChange,
      className,
      ...props
    },
    ref,
  ) => {
    const handleCheckedChange = (nextChecked: boolean | "indeterminate") => {
      onChange?.({
        target: {
          checked: nextChecked === true,
          value,
        },
      } as React.ChangeEvent<HTMLInputElement>);
    };

    return (
      <label
        className={cn(
          "inline-flex items-center gap-2 text-sm",
          disabled && "cursor-not-allowed opacity-50",
          className,
        )}
      >
        <CheckboxPrimitive.Root
          ref={ref}
          checked={checked}
          defaultChecked={defaultChecked}
          disabled={disabled}
          value={value?.toString()}
          onCheckedChange={handleCheckedChange}
          className="flex size-4 shrink-0 items-center justify-center rounded-[4px] border border-input bg-background text-primary shadow-xs outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
          {...props}
        >
          <CheckboxPrimitive.Indicator>
            <CheckIcon className="size-3.5" />
          </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>
        {children ? <span>{children}</span> : null}
      </label>
    );
  },
);
