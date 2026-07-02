import { FC } from "react";

import { Button } from "shared/components";

import { Header } from "app/ui";

type CardProps = {
  id: number;
  name: string;
  onClick?: (id: number) => void;
};

const Card: FC<CardProps> = ({ id, name, onClick }) => {
  const handleClick = () => {
    onClick?.(id);
  };

  return (
    <article className="min-w-[275px] rounded-2xl bg-[linear-gradient(to_right,rgb(9,193,235),rgb(211,176,150))] p-5 text-white shadow-lg">
      <div className="space-y-3">
        <Header title={`ID: ${id}`} />
        <p className="text-base/6">{name}</p>
      </div>
      <div className="mt-4 flex justify-end">
        <Button variant="secondary" size="sm" onClick={handleClick}>
          More
        </Button>
      </div>
    </article>
  );
};

export { Card };
