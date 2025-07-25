import { FC } from "react";

import Button from "@mui/material/Button";
import MuiCard from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import { Header } from "../molecules";

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
    <MuiCard
      sx={{
        color: "white",
        minWidth: 275,
        background:
          "linear-gradient(to right,rgb(9, 193, 235),rgb(211, 176, 150))",
      }}
    >
      <CardContent>
        <Header title={`ID: ${id}`} />
        <Typography>{name}</Typography>
      </CardContent>
      <CardActions>
        <Button color="inherit" size="small" onClick={handleClick}>
          More
        </Button>
      </CardActions>
    </MuiCard>
  );
};

export { Card };
