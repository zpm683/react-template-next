import Typography from "@mui/material/Typography";

type TitleProps = {} & React.PropsWithChildren;

const Title: React.FC<TitleProps> = ({ children }) => {
  return <Typography variant="h4">{children}</Typography>;
};

export { Title };
