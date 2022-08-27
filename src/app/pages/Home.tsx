import {
  Box,
  Paper,
  Container,
  Button,
  ButtonGroup,
  Avatar,
} from "@mui/material";
import { useMemoizedFn } from "ahooks";

import { MyAppBar } from "app/components";
import { useGlobalStore } from "app/stores";
import { useMemo } from "react";
import { makeItemsByCount } from "app/utils";

/**
 * Home
 */
export const Home = () => {
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
    <Box>
      <MyAppBar title="react-template-next" />
      <Container
        sx={{
          mt: 2,
        }}
      >
        <Paper sx={{ height: "70vh", p: 4, display: "flex", flexFlow: "warp" }}>
          {Avatars.map((AvatarItem, index) => (
            <AvatarItem
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              sx={{ width: 100, height: 100 }}
              src="/img/logo.png"
            />
          ))}
        </Paper>
        <ButtonGroup variant="outlined" aria-label="outlined button group">
          <Button onClick={handelClickAdd}>Add</Button>
          <Button onClick={handleClickDec}>Dec</Button>
          <Button onClick={clearCount}>Remove</Button>
        </ButtonGroup>
      </Container>
    </Box>
  );
};
