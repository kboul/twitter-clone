import create from "zustand";

import { Tweet } from "../typings";

const useStore = create<{
  tweets: Tweet[];
  setGlobalState: (data: any) => void;
}>(set => ({
  tweets: [] as Tweet[],
  setGlobalState: (data: any) => set({ ...data })
}));

export default useStore;
