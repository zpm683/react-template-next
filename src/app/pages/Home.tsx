import { FC, useMemo } from "react";

import { Avatar, Button, ButtonGroup, Container, Paper } from "@mui/material";
import { useMemoizedFn } from "ahooks";

import logo from "app/assets/img/logo.png";
import { useGlobalStore } from "app/stores";
import { makeItemsByCount } from "app/utils";

/**
 * Home
 */
const Home: FC = () => {
  const count = useGlobalStore((s) => s.count);
  const changeCount = useGlobalStore((s) => s.changeCount);
  const clearCount = useGlobalStore((s) => s.clearCount);

  const handelClickAdd = useMemoizedFn(() => {
    changeCount("add");
  });

  const handleClickDec = useMemoizedFn(() => {
    changeCount("dec");
  });

  const Avatars = useMemo(() => makeItemsByCount(count, Avatar), [count]);

  return (
    <Container>
      <Paper
        sx={{ p: 4, display: "flex", flexWrap: "wrap", minHeight: "40vh" }}
      >
        {Avatars.map((AvatarItem, index) => (
          <AvatarItem key={index} sx={{ width: 100, height: 100 }} src={logo} />
        ))}
      </Paper>
      <ButtonGroup variant="outlined" aria-label="outlined button group">
        <Button onClick={handelClickAdd}>Add</Button>
        <Button onClick={handleClickDec}>Dec</Button>
        <Button onClick={clearCount}>Remove</Button>
      </ButtonGroup>
    </Container>
  );
};

export { Home };
