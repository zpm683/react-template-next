import { FC } from "react";

import Box, { BoxProps } from "@mui/material/Box";

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
