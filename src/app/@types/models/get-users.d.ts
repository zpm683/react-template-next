declare module "models.getUsers" {
  type Data = {
    name: string;
    id: number;
  };

  type Req = unknown;
  type Res = Data[];
}
