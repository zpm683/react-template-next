import { create, StateCreator } from "zustand";
import { immer } from "zustand/middleware/immer";

type Initializer<T extends Object> = StateCreator<
  T,
  [["zustand/immer", never]],
  [],
  T
>;

const createImmerStore = <T extends Object>(initializer: Initializer<T>) =>
  create(immer<T>(initializer));

export { createImmerStore };
