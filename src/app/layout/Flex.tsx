import { FC } from "react";

import { Box } from "@mui/material";
import { BoxProps } from "@mui/system";

export const Flex: FC<BoxProps> = ({ children, ...props }) => {
  return (
    <Box
      display="flex"
      flexDirection="row"
      flexWrap="wrap"
      overflow="hidden auto"
      {...props}
    >
      {children}
    </Box>
  );
};
