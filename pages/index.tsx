import type { GetServerSideProps } from "next";
import Head from "next/head";

import { Feed, Sidebar } from "../components";
import Widgets from "../components/Widgets";
import fetchTweets from "../api/fetchTweets";
import { Tweet } from "../typings";

export const getServerSideProps: GetServerSideProps = async () => {
  const tweets = await fetchTweets();
  return { props: { tweets } };
};

interface HomeProps {
  tweets: Tweet[];
}

export default function Home({ tweets }: HomeProps) {
  console.log(tweets);
  return (
    <div className="mx-auto max-h-screen overflow-hidden lg:max-w-6xl">
      <Head>
        <title>Twitter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="grid grid-cols-12">
        <Sidebar />

        <Feed />

        <Widgets />
      </main>
    </div>
  );
}
