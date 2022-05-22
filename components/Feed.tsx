import { RefreshIcon } from "@heroicons/react/outline";

import Tweet from "./Tweet";
import TweetBox from "./TweetBox";
import { useStore } from "../hooks";

export default function Feed() {
  const tweets = useStore(state => state.tweets);

  return (
    <div className="col-span-9 border-x lg:col-span-6">
      <div className="flex items-center justify-between">
        <h1 className="p-5 pb-0 text-xl font-bold">Home</h1>
        <RefreshIcon className="mr-5 mt-5 h-8 w-8 cursor-pointer text-twitter transition-all duration-100 ease-out hover:rotate-180 active:scale-125" />
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
