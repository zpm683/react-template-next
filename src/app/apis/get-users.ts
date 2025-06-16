import { Res } from "models.getUsers";

import { axiosInstance } from "shared/utils";

// just a demo
const getUsers = async () => {
  return await axiosInstance.get<Res>("/users");
};

export { getUsers };
