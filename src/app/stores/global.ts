import { createImmerStore } from "shared/utils";

type GlobalStore = {
  count: number;
  setCount: (c: number) => void;
};

const useGlobalStore = createImmerStore<GlobalStore>((set) => ({
  count: 0,
  setCount: (count) => {
    set((state) => {
      state.count = count;
    });
  },
}));

export { useGlobalStore };
export type { GlobalStore };
