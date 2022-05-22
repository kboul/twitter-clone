import { useEffect } from "react";
import TimeAgo from "react-timeago";
import {
  ChatAlt2Icon,
  HeartIcon,
  SwitchHorizontalIcon,
  UploadIcon
} from "@heroicons/react/outline";

import fetchComments from "../api/fetchComments";
import { Tweet as TweetModel } from "../typings";
import { useStore } from "../hooks";

const replaceAllSpacesWithEmptyString = (username: string) => {
  return username.replace(/\s+/g, "").toLowerCase();
};

const iconsStyle = "h-5 w-5";
const iconsWrapper = "flex cursor-pointer items-center space-x-3 text-gray-400";

interface TweetProps {
  tweet: TweetModel;
}

export default function Tweet({ tweet }: TweetProps) {
  const comments = useStore(state => state.comments);
  const setGlobalState = useStore(state => state.setGlobalState);

  const refreshComments = async () => {
    const comments = await fetchComments(tweet._id);
    setGlobalState({ comments });
  };

  useEffect(() => {
    refreshComments();
  }, []);

  return (
    <div className="flex flex-col space-x-3 border-y border-gray-100 p-5">
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
              alt=""
              className="m-5 ml-0 mb-1 max-h-60 rounded-lg object-cover shadow-sm"
              src={tweet.image}
            />
          )}
        </div>
      </div>

      <div className="mt-5 flex justify-between">
        <div className={iconsWrapper}>
          <ChatAlt2Icon className={iconsStyle} />
          <p>{comments.length}</p>
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

      <div className="my-2 mt-5 max-h-44 space-y-5 overflow-y-scroll border-t border-gray-100 p-5">
        {comments?.map(comment => (
          <div className="relative flex space-x-2" key={comment._id}>
            <hr className="absolute left-5 top-10 h-8 border-x border-twitter/30" />
            <img
              alt=""
              className="mt-2 h-7 w-7 rounded-full object-cover"
              src={comment.profileImg}
            />

            <div>
              <div className="flex items-center space-x-1">
                <p className="mr-1 font-bold">{comment.username}</p>
                <p className="hidden text-sm text-gray-500 lg:inline">
                  @{replaceAllSpacesWithEmptyString(comment.username)}
                </p>
                <TimeAgo
                  className="text-sm text-gray-500"
                  date={comment._createdAt}
                />
              </div>
              <p>{comment.comment}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
