import { FormEvent, useEffect, useState } from "react";
import TimeAgo from "react-timeago";
import {
  ChatAlt2Icon,
  HeartIcon,
  SwitchHorizontalIcon,
  UploadIcon
} from "@heroicons/react/outline";
import toast from "react-hot-toast";

import fetchComments from "../api/fetchComments";
import { Comment, CommentBody, Tweet as TweetModel } from "../typings";
import { useSession } from "next-auth/react";
import { avatarImg } from "../constants";

const replaceAllSpacesWithEmptyString = (username: string) => {
  return username.replace(/\s+/g, "").toLowerCase();
};

const truncateString = (str: string, num: number) => {
  if (str.length > num) return str.slice(0, num) + "...";
  return str;
};

const getUsername = (name: string) => {
  const splitted = name.split(" ");
  console.log(splitted);
  return `${truncateString(splitted[0], 1)} ${splitted[1]}`;
};

const iconsStyle = "h-5 w-5";
const iconsWrapper = "flex cursor-pointer items-center space-x-3 text-gray-400";

interface TweetProps {
  tweet: TweetModel;
}

export default function Tweet({ tweet }: TweetProps) {
  const { data: session } = useSession();

  const [comments, setComments] = useState<Comment[]>([]);
  const [commentBoxVisible, setCommentBoxVisible] = useState<boolean>(false);
  const [commentBoxInputValue, setCommentBoxInputValue] = useState<string>("");

  const refreshComments = async () => {
    const comments: Comment[] = await fetchComments(tweet._id);
    setComments(comments);
  };

  useEffect(() => {
    refreshComments();
  }, []);

  const handleChatIconClick = () =>
    session && setCommentBoxVisible(prevState => !prevState);

  const handleCommentSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const commentToast = toast.loading("Posting Comment...");

    const comment: CommentBody = {
      comment: commentBoxInputValue,
      tweetId: tweet._id,
      username: session?.user?.name || "Unknown User",
      profileImg: session?.user?.image || avatarImg
    };

    const result = await fetch(`/api/addComment`, {
      body: JSON.stringify(comment),
      method: "POST"
    });

    console.log("WOOHOO we made it", result);
    toast.success("Comment Posted!", {
      id: commentToast
    });

    setCommentBoxInputValue("");
    setCommentBoxVisible(false);
    refreshComments();
  };

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
        <div className={iconsWrapper} onClick={handleChatIconClick}>
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

      {commentBoxVisible && (
        <form className="mt-3 flex space-x-3" onSubmit={handleCommentSubmit}>
          <input
            className="flex-1 rounded-lg bg-gray-100 p-2 outline-none"
            onChange={e => setCommentBoxInputValue(e.target.value)}
            placeholder="Write a comment..."
            type="text"
            value={commentBoxInputValue}
          />
          <button
            className="text-twitter disabled:text-gray-200"
            disabled={!commentBoxInputValue}>
            Post
          </button>
        </form>
      )}

      {comments?.length > 0 && (
        <div className="my-2 mt-5 max-h-44 space-y-5 overflow-y-scroll border-t border-gray-100 p-5 scrollbar-hide">
          {comments.map(comment => (
            <div className="relative flex space-x-2" key={comment._id}>
              <hr className="absolute left-5 top-10 h-8 border-x border-twitter/30" />
              <img
                alt=""
                className="mt-2 h-7 w-7 rounded-full object-cover"
                src={comment.profileImg}
              />

              <div>
                <div className="flex items-center space-x-1">
                  <p className="mr-1 font-bold" title={comment.username}>
                    {getUsername(comment.username)}
                  </p>
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
      )}
    </div>
  );
}
