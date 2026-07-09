type GetUsersData = {
  name: string;
  id: number;
};

type GetUsersReq = unknown;
type GetUsersRes = GetUsersData[];

export type { GetUsersData, GetUsersReq, GetUsersRes };
