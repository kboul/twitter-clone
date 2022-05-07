import type { NextPage } from 'next'
import Head from 'next/head'

import { Feed, Sidebar } from '../components'
import Widgets from '../components/Widgets'

const Home: NextPage = () => {
  return (
    <div className="">
      <Head>
        <title>Twitter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Sidebar />

        <Feed />

        <Widgets />
      </main>
    </div>
  )
}

export default Home
