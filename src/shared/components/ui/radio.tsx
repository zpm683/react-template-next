import { forwardRef, PropsWithChildren } from "react";

import { CircleIcon } from "lucide-react";
import { RadioGroup as RadioGroupPrimitive } from "radix-ui";

import { cn } from "shared/utils";

/** Props */
export type RadioProps = PropsWithChildren<{
  checked?: boolean;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  value?: string | number;
  className?: string;
}>;

/** Radio Component */
export const Radio = forwardRef<HTMLButtonElement, RadioProps>(
  ({ children, disabled, value, className, ...props }, ref) => {
    return (
      <label
        className={cn(
          "inline-flex items-center gap-2 text-sm",
          disabled && "cursor-not-allowed opacity-50",
          className,
        )}
      >
        <RadioGroupPrimitive.Item
          ref={ref}
          disabled={disabled}
          value={value?.toString() ?? ""}
          className="flex size-4 shrink-0 items-center justify-center rounded-full border border-input bg-background text-primary shadow-xs outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50"
          {...props}
        >
          <RadioGroupPrimitive.Indicator>
            <CircleIcon className="size-2.5 fill-current" />
          </RadioGroupPrimitive.Indicator>
        </RadioGroupPrimitive.Item>
        {children ? <span>{children}</span> : null}
      </label>
    );
  },
);
