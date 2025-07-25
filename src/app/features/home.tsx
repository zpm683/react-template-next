import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import { useRequest } from "ahooks";

import { Show, useDialoger } from "shared/components";

import { getUsers } from "app/apis";
import { LOGO_PNG } from "app/assets";
import { Card } from "app/components";
import { Flex } from "app/layout";
import { useGlobalStore } from "app/stores";

const Home = () => {
  const conut = useGlobalStore((state) => state.count);
  const setCount = useGlobalStore((state) => state.setCount);
  const dialoger = useDialoger();
  const { loading, data } = useRequest(getUsers);

  const handleClickAdd = () => {
    setCount(conut + 1);
  };

  const handleClickOpen = (id: number) => {
    const target = data?.find((i) => i.id === id);

    dialoger.current?.open({
      title: "ID",
      body: (
        <div>
          <Typography variant="h6">ID: {target?.id}</Typography>
          <Typography variant="body1">Name: {target?.name}</Typography>
        </div>
      ),
    });
  };

  return (
    <Flex height={"100vh"} justifyContent={"center"} alignItems={"center"}>
      <Avatar alt="zpm" src={LOGO_PNG} sx={{ width: "15vw", height: "20vh" }} />
      <Flex flexDirection={"column"}>
        <Typography variant="h4">
          {`Welcome to use react-template-next 🎉x${conut}`}
        </Typography>
        <Button onClick={handleClickAdd}>ADD conut</Button>
        <Show
          trigger={!loading}
          fallback={<Skeleton width={"100%"} height={"10vh"} />}
        >
          <Flex gap={2}>
            {data?.map((item, index) => (
              <Card
                key={index}
                id={item.id}
                name={item.name}
                onClick={handleClickOpen}
              />
            ))}
          </Flex>
        </Show>
      </Flex>
    </Flex>
  );
};

export { Home };
