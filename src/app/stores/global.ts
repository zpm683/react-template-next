import { createImmerStore } from "shared/utils";

type GlobalStore = {};

const useGlobalStore = createImmerStore<GlobalStore>((set) => ({}));

export { useGlobalStore };
export type { GlobalStore };
