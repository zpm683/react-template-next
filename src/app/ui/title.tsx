import { ReactNode } from "react";

import Typography from "@mui/material/Typography";

type TitleProps = { children?: ReactNode };

const Title: React.FC<TitleProps> = ({ children }) => {
  return <Typography variant="h4">{children}</Typography>;
};

export { Title };
