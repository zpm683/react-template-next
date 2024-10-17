import { createImmerStore } from "shared/utils";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type GlobalStore = {};

const useGlobalStore = createImmerStore<GlobalStore>((set) => ({}));

export { useGlobalStore };
export type { GlobalStore };
