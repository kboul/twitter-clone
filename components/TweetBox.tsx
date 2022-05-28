import { MouseEvent, useRef, useState } from "react";
import {
  CalendarIcon,
  EmojiHappyIcon,
  LocationMarkerIcon,
  PhotographIcon,
  SearchCircleIcon
} from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

import { TweetBody } from "../typings";
import { useStore } from "../hooks";
import fetchTweets from "../api/fetchTweets";
import { avatarImg } from "../constants";

export default function TweetBox() {
  const { data: session } = useSession();

  const imageUrlBoxOpen = useStore(state => state.imageUrlBoxOpen);
  const setGlobalState = useStore(state => state.setGlobalState);
  const tweetInput = useStore(state => state.tweetInput);
  const uploadedImage = useStore(state => state.uploadedImage);

  const imageInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoIconClick = () =>
    setGlobalState({ imageUrlBoxOpen: !imageUrlBoxOpen });

  const handleImageAddToTweet = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!imageInputRef.current?.value) return;

    setGlobalState({
      uploadedImage: imageInputRef.current.value,
      imageUrlBoxOpen: false
    });
    imageInputRef.current.value = "";
  };

  const postTweet = async () => {
    const tweetBody: TweetBody = {
      text: tweetInput,
      username: session?.user?.name || "Unknown user",
      profileImg: session?.user?.image || avatarImg,
      image: uploadedImage
    };
    const result = await fetch(`/api/addTweet`, {
      body: JSON.stringify(tweetBody),
      method: "POST"
    });
    await result.json();

    const newTweets = await fetchTweets();
    setGlobalState({ tweets: newTweets });

    toast("Tweet just added!");
  };

  const handleTweetAdd = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    postTweet();

    setGlobalState({
      tweetInput: "",
      uploadedImage: "",
      imageUrlBoxOpen: false
    });
  };

  return (
    <div className="flex space-x-2 p-5">
      <img
        alt=""
        className="mt-4 h-14 w-14 rounded-full object-cover"
        src={session?.user?.image || avatarImg}
      />

      <div className="flex flex-1 items-center pl-2">
        <div className="flex flex-1 flex-col">
          <input
            className="h-24 w-full text-xl outline-none placeholder:text-xl"
            onChange={e => setGlobalState({ tweetInput: e.target.value })}
            type="text"
            placeholder="What's happening?"
            value={tweetInput}
          />

          <div className="flex items-center">
            <div className="flex flex-1 space-x-2 text-twitter">
              <PhotographIcon
                className="transition-transdiv h-5 w-5 cursor-pointer duration-150 ease-out hover:scale-150"
                onClick={handlePhotoIconClick}
              />
              <SearchCircleIcon className="h-5 w-5" />
              <EmojiHappyIcon className="h-5 w-5" />
              <CalendarIcon className="h-5 w-5" />
              <LocationMarkerIcon className="h-5 w-5" />
            </div>

            <button
              className="rounded-full bg-twitter px-5 py-2 font-bold text-white disabled:opacity-40"
              disabled={!tweetInput || !session}
              onClick={handleTweetAdd}>
              Tweet
            </button>
          </div>

          {imageUrlBoxOpen && (
            <form className="mt-5 flex rounded-lg bg-twitter/80 py-2 px-4 ">
              <input
                className="flex-1 bg-transparent p-2 text-white outline-none placeholder:text-white"
                placeholder="Enter image url..."
                ref={imageInputRef}
                type="text"
              />
              <button
                className="font-bold text-white"
                onClick={handleImageAddToTweet}>
                Add image
              </button>
            </form>
          )}

          {uploadedImage && (
            <img
              alt="uploaded image"
              className="mt-10 h-40 w-full rounded-xl object-contain shadow-lg"
              src={uploadedImage}
            />
          )}
        </div>
      </div>
    </div>
  );
}
