import { axiosInstance } from "shared/utils";

import { GetUsersRes } from "app/@types";

// just a demo
const getUsers = async () => {
  return await axiosInstance.get<GetUsersRes>("/users");
};

export { getUsers };
