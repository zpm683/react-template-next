import { Title } from "./title";

type HeaderProps = {
  title?: string;
};

const Header = ({ title = "title" }: HeaderProps) => {
  return (
    <div>
      <Title>{title}</Title>
    </div>
  );
};

export { Header };
