import create from "zustand";

import { Comment, Tweet } from "../typings";

const useStore = create<{
  comments: Comment[];
  tweets: Tweet[];
  setGlobalState: (data: any) => void;
}>(set => ({
  comments: [] as Comment[],
  tweets: [] as Tweet[],
  setGlobalState: (data: any) => set({ ...data })
}));

export default useStore;
