import { useRequest } from "ahooks";

import { Button, Show, useDialoger } from "shared/components";

import { getUsers } from "app/apis";
import { LOGO_PNG, VITE_LOGO } from "app/assets";
import { Card } from "app/features";
import { Flex } from "app/layouts";
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
        <div className="space-y-2">
          <p className="text-lg font-semibold">ID: {target?.id}</p>
          <p className="text-sm text-muted-foreground">Name: {target?.name}</p>
        </div>
      ),
    });
  };

  return (
    <Flex
      sx={{
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        gap: "2rem",
      }}
    >
      <img
        alt="zpm"
        src={LOGO_PNG}
        className="h-[20vh] w-[15vw] rounded-3xl object-cover shadow-lg"
      />
      <Flex sx={{ flexDirection: "column", gap: "1rem" }}>
        <h1 className="flex items-center gap-2 text-4xl font-semibold tracking-tight">
          {`Welcome to use react-template-next`}
          <VITE_LOGO />
          {`x${conut}`}
        </h1>
        <Button onClick={handleClickAdd}>ADD conut</Button>
        <Show
          trigger={!loading}
          fallback={
            <div className="h-[10vh] w-full animate-pulse rounded-2xl bg-muted" />
          }
        >
          <Flex sx={{ gap: "1rem" }}>
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
