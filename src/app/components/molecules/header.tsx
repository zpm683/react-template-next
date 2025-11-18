import Box from "@mui/material/Box";

import { Title } from "../atoms";

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
