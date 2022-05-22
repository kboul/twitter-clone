import { RefreshIcon } from "@heroicons/react/outline";
import toast from "react-hot-toast";

import Tweet from "./Tweet";
import TweetBox from "./TweetBox";
import { useStore } from "../hooks";
import fetchTweets from "../api/fetchTweets";

export default function Feed() {
  const tweets = useStore(state => state.tweets);
  const setGlobalState = useStore(state => state.setGlobalState);

  const handleRefresh = async () => {
    const refreshToast = toast.loading("Refreshing...");
    const newTweets = await fetchTweets();
    setGlobalState({ tweets: newTweets });
    toast.success("Feed Updated!", { id: refreshToast });
  };

  return (
    <div className="col-span-9 border-x lg:col-span-6">
      <div className="flex items-center justify-between">
        <h1 className="p-5 pb-0 text-xl font-bold">Home</h1>
        <RefreshIcon
          className="mr-5 mt-5 h-8 w-8 cursor-pointer text-twitter transition-all duration-100 ease-out hover:rotate-180 active:scale-125"
          onClick={handleRefresh}
        />
      </div>

      <div>
        <TweetBox />
      </div>

      <div>
        {tweets.map(tweet => (
          <Tweet key={tweet._id} tweet={tweet} />
        ))}
      </div>
    </div>
  );
}
