import Box from "@mui/material/Box";

import { Title } from "./title";

type HeaderProps = {
  title?: string;
};

const Header = ({ title = "title" }: HeaderProps) => {
  return (
    <Box>
      <Title>{title}</Title>
    </Box>
  );
};

export { Header };
