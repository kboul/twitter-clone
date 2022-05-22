import TimeAgo from "react-timeago";
import {
  ChatAlt2Icon,
  HeartIcon,
  SwitchHorizontalIcon,
  UploadIcon
} from "@heroicons/react/outline";

import { useStore } from "../hooks";

const replaceAllSpacesWithEmptyString = (username: string) => {
  return username.replace(/\s+/g, "").toLowerCase();
};

const iconsStyle = "h-5 w-5";
const iconsWrapper = "flex cursor-pointer items-center space-x-3 text-gray-400";

export default function Tweet() {
  const tweets = useStore(state => state.tweets);

  return (
    <div className="flex flex-col space-x-3 border-y border-gray-100 p-5">
      {tweets.map(tweet => (
        <div className="flex space-x-3" key={tweet._id}>
          <div>
            <img
              className="h-10 w-10 rounded-full object-cover"
              src={tweet.profileImg}
              alt=""
            />
          </div>

          <div>
            <div className="flex items-center space-x-1">
              <p className="mr-1 font-bold">{tweet.username}</p>
              <p className="hidden text-sm text-gray-500 sm:inline">
                @{replaceAllSpacesWithEmptyString(tweet.username)}
              </p>

              <TimeAgo
                className="text-sm text-gray-500"
                date={tweet._createdAt}
              />
            </div>

            <p className="pt-1">{tweet.text}</p>

            {tweet.image && (
              <img
                className="m-5 ml-0 mb-1 max-h-60 rounded-lg object-cover shadow-sm"
                src={tweet.image}
                alt=""
              />
            )}
          </div>
        </div>
      ))}

      <div className="mt-5 flex justify-between">
        <div className={iconsWrapper}>
          <ChatAlt2Icon className={iconsStyle} />
        </div>
        <div className={iconsWrapper}>
          <SwitchHorizontalIcon className={iconsStyle} />
        </div>
        <div className={iconsWrapper}>
          <HeartIcon className={iconsStyle} />
        </div>
        <div className={iconsWrapper}>
          <UploadIcon className={iconsStyle} />
        </div>
      </div>
    </div>
  );
}
