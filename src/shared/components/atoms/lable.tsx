import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

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
  return (
    <Box display={"flex"} alignItems={"center"} gap={1}>
      {!hiddenLable && (
        <Typography
          sx={{
            textAlign: "right",
          }}
          color={color}
          style={{ minWidth: alignWidth }}
        >
          {required && (
            <span
              style={{
                paddingRight: "4px",
              }}
            >
              *
            </span>
          )}
          <span>{labelText}</span>
        </Typography>
      )}
      {valueText && (
        <Typography
          sx={{
            textAlign: "right",
          }}
          color={color}
        >
          {valueText}
        </Typography>
      )}
      {children}
    </Box>
  );
};
