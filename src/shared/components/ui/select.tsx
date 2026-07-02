import { CSSProperties, forwardRef } from "react";

import { CheckIcon, ChevronDownIcon } from "lucide-react";
import { Select as SelectPrimitive } from "radix-ui";

import { cn } from "shared/utils";

export type SelectOption = {
  value?: string | number;
  children?: React.ReactNode;
  disabled?: boolean;
};

/** Select Props */
export type SelectProps = {
  value?: string;
  defaultValue?: string;
  minWidth?: string | number;
  options?: SelectOption[];
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  name?: string;
  size?: "small" | "medium";
  onBlur?: React.FocusEventHandler<HTMLButtonElement>;
  onChange?: (value: string) => void;
};

/** Select Component */
export const Select = forwardRef<HTMLButtonElement, SelectProps>(
  (
    {
      value = "",
      defaultValue,
      size = "medium",
      minWidth = "160px",
      options = [],
      placeholder,
      disabled,
      className,
      onChange,
      onBlur,
    },
    ref,
  ) => {
    const minWidthStyle: CSSProperties = { minWidth };

    return (
      <SelectPrimitive.Root
        value={value}
        defaultValue={defaultValue}
        disabled={disabled}
        onValueChange={onChange}
      >
        <SelectPrimitive.Trigger
          ref={ref}
          onBlur={onBlur}
          style={minWidthStyle}
          className={cn(
            "inline-flex w-full items-center justify-between gap-2 rounded-md border border-input bg-background px-3 text-sm text-foreground shadow-xs outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50",
            size === "small" ? "h-8" : "h-10",
            className,
          )}
        >
          <SelectPrimitive.Value placeholder={placeholder ?? "Select..."} />
          <SelectPrimitive.Icon>
            <ChevronDownIcon className="size-4 text-muted-foreground" />
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>
        <SelectPrimitive.Portal>
          <SelectPrimitive.Content className="z-50 min-w-[8rem] overflow-hidden rounded-md border border-border bg-popover text-popover-foreground shadow-md">
            <SelectPrimitive.Viewport className="p-1">
              {options.map((option) => (
                <SelectPrimitive.Item
                  key={option.value?.toString()}
                  value={option.value?.toString() ?? ""}
                  disabled={option.disabled}
                  className="relative flex cursor-default items-center rounded-sm py-1.5 pr-8 pl-2 text-sm outline-none select-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                >
                  <span className="absolute right-2 flex size-3.5 items-center justify-center">
                    <SelectPrimitive.ItemIndicator>
                      <CheckIcon className="size-4" />
                    </SelectPrimitive.ItemIndicator>
                  </span>
                  <SelectPrimitive.ItemText>
                    {option.children}
                  </SelectPrimitive.ItemText>
                </SelectPrimitive.Item>
              ))}
            </SelectPrimitive.Viewport>
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>
    );
  },
);
