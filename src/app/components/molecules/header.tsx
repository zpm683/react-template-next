import Box from "@mui/material/Box";

import { Title } from "../atoms";

type HeaderProps = {
  title?: string;
};

const Header: React.FC<HeaderProps> = ({ title = "title" }) => {
  return (
    <Box>
      <Title>{title}</Title>
    </Box>
  );
};

export { Header };
