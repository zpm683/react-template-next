import { createImmerStore } from "./createImmerStore";

interface GlobalStore {
  count: number;
  changeCount: (type: "add" | "dec") => void;
  clearCount: () => void;
}

export const useGlobalStore = createImmerStore<GlobalStore>((set) => ({
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
