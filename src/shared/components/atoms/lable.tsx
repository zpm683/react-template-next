import { Box, Typography } from "@mui/material";

export type LabelProps = {
  labelText?: string;
  alignWidth?: number;
  hiddenLable?: boolean;
  valueText?: string;
  required?: boolean;
  color?: "primary" | "secondary";
} & React.PropsWithChildren;

export const Label: React.FC<LabelProps> = ({
  color = "primary",
  labelText,
  alignWidth,
  hiddenLable = false,
  valueText,
  required = false,
  children,
}) => {
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
