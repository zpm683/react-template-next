import { FC } from "react";

import Box, { BoxProps } from "@mui/material/Box";

export const Flex: FC<BoxProps> = ({ children, sx, ...props }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        overflow: "hidden auto",
        ...sx,
      }}
      {...props}
    >
      {children}
    </Box>
  );
};
