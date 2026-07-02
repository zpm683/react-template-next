import { cn } from "shared/utils";

export type LabelProps = {
  labelText?: string;
  alignWidth?: number;
  hiddenLable?: boolean;
  valueText?: string;
  required?: boolean;
  color?: "primary" | "secondary";
} & React.PropsWithChildren;

export const Label = ({
  color = "primary",
  labelText,
  alignWidth,
  hiddenLable = false,
  valueText,
  required = false,
  children,
}: LabelProps) => {
  const textColorClass =
    color === "secondary" ? "text-secondary" : "text-primary";
  const keyColorClass = "text-label-key";
  const hasChildren = children !== undefined && children !== null;
  const isKeyValueOnly = !hiddenLable && !hasChildren && Boolean(valueText);

  return (
    <div className="flex items-start gap-3">
      {!hiddenLable ? (
        <div className="shrink-0 text-right" style={{ minWidth: alignWidth }}>
          <p className="text-base leading-6">
            {required && <span className="pr-[4px] text-destructive">*</span>}
            <span className={keyColorClass}>{labelText}</span>
          </p>
          {valueText && !isKeyValueOnly ? (
            <p className={cn("text-base leading-6", textColorClass)}>
              {valueText}
            </p>
          ) : null}
        </div>
      ) : null}
      <div className="min-w-0 flex-1">
        {isKeyValueOnly ? (
          <p className={cn("text-base leading-6", textColorClass)}>
            {valueText}
          </p>
        ) : (
          children
        )}
      </div>
      {hiddenLable && valueText ? (
        <p className={cn("text-base leading-6", textColorClass)}>{valueText}</p>
      ) : null}
    </div>
  );
};
