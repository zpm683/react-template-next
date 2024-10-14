import { create, StateCreator } from "zustand";
import { immer } from "zustand/middleware/immer";

type Initializer<T extends object> = StateCreator<
  T,
  [["zustand/immer", never]],
  [],
  T
>;

const createImmerStore = <T extends object>(initializer: Initializer<T>) =>
  create(immer<T>(initializer));

export { createImmerStore };
