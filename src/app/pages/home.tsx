import { Avatar, Button, Typography } from "@mui/material";

import logo from "app/assets/img/logo.png";
import { Flex } from "app/layout";
import { useGlobalStore } from "app/stores";

const Home = () => {
  const conut = useGlobalStore((state) => state.count);
  const setCount = useGlobalStore((state) => state.setCount);

  const handleClick = () => {
    setCount(conut + 1);
  };

  return (
    <Flex height={"100vh"} justifyContent={"center"} alignItems={"center"}>
      <Avatar alt="zpm" src={logo} sx={{ width: "15vw", height: "15vh" }} />
      <Flex flexDirection={"column"}>
        <Typography variant="h4">
          {`Welcome to use react-template-next 🎉x${conut}`}
        </Typography>
        <Button onClick={handleClick}>ADD conut</Button>
      </Flex>
    </Flex>
  );
};

export { Home };
