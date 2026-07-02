import { ReactNode } from "react";

type TitleProps = { children?: ReactNode };

const Title: React.FC<TitleProps> = ({ children }) => {
  return <h2 className="text-2xl font-semibold tracking-tight">{children}</h2>;
};

export { Title };
