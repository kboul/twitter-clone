import create from "zustand";

import { Tweet } from "../typings";

const useStore = create<{
  imageUrlBoxOpen: boolean;
  tweetInput: string;
  tweets: Tweet[];
  setGlobalState: (data: any) => void;
  uploadedImage: string;
}>(set => ({
  imageUrlBoxOpen: false,
  tweetInput: "",
  tweets: [] as Tweet[],
  setGlobalState: (data: any) => set({ ...data }),
  uploadedImage: ""
}));

export default useStore;
