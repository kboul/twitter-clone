import create from "zustand";

import { Comment, Tweet } from "../typings";

const useStore = create<{
  comments: Comment[];
  imageUrlBoxOpen: boolean;
  tweetInput: string;
  tweets: Tweet[];
  setGlobalState: (data: any) => void;
  uploadedImage: string;
}>(set => ({
  comments: [] as Comment[],
  imageUrlBoxOpen: false,
  tweetInput: "",
  tweets: [] as Tweet[],
  setGlobalState: (data: any) => set({ ...data }),
  uploadedImage: ""
}));

export default useStore;
