import { createImmerStore } from "shared/utils";

type GlobalStore = {
  count: number;
  changeCount: (type: "add" | "dec") => void;
  clearCount: () => void;
};

const useGlobalStore = createImmerStore<GlobalStore>((set) => ({
  count: 0,
  changeCount: (type) =>
    set((state) => {
      if (type === "add") state.count += 1;
      if (type === "dec" && state.count > 0) state.count -= 1;
    }),
  clearCount: () =>
    set((state) => {
      state.count = 0;
    }),
}));

export { useGlobalStore };
export type { GlobalStore };
