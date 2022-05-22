import type { GetServerSideProps } from "next";
import Head from "next/head";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";

import { Feed, Sidebar } from "../components";
import Widgets from "../components/Widgets";
import fetchTweets from "../api/fetchTweets";
import { Tweet } from "../typings";
import { useStore } from "../hooks";

export const getServerSideProps: GetServerSideProps = async () => {
  const tweets = await fetchTweets();
  return { props: { tweets } };
};

interface HomeProps {
  tweets: Tweet[];
}

export default function Home({ tweets }: HomeProps) {
  const setGlobalState = useStore(state => state.setGlobalState);

  useEffect(() => {
    setGlobalState({ tweets });
  }, []);

  return (
    <div className="mx-auto max-h-screen overflow-hidden lg:max-w-6xl">
      <Head>
        <title>Twitter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Toaster />

      <main className="grid grid-cols-12">
        <Sidebar />

        <Feed />

        <Widgets />
      </main>
    </div>
  );
}
