import { FC } from "react";

import { Avatar, Typography } from "@mui/material";

import logo from "app/assets/img/logo.png";
import { Flex } from "app/layout";

/**
 * Home
 */
const Home: FC = () => {
  return (
    <Flex height={"100vh"} justifyContent={"center"} alignItems={"center"}>
      <Avatar alt="zpm" src={logo} sx={{ width: "15vw", height: "15vh" }} />
      <Flex flexDirection={"column"}>
        <Typography variant="h4">
          Welcome to use react-template-next 🎉
        </Typography>
        <Typography color={"blueviolet"} variant="h5">
          Please read README.md before 👨‍💻
        </Typography>
      </Flex>
    </Flex>
  );
};

export { Home };
