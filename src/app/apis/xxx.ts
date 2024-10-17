import { axiosInstance } from "shared/utils";

// just a demo
const queryXxx = async () => {
  return await axiosInstance.get("/xxx");
};

export { queryXxx };
