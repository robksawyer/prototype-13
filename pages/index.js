import React from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import styles from '../styles/Home.module.css'

const MainScene = dynamic(() => import('../components/MainScene'), {
  ssr: false,
})
import HamburgerMenu from '../components/HamburgerMenu'
import WaveText from '../components/WaveText'

const CursorCircle = dynamic(() => import('../components/CursorCircle'), {
  ssr: false,
})

export default function Home() {
  return (
    <div
      className={`${styles.container} min-h-screen flex flex-col justify-center align-center`}
    >
      <Head>
        <title>prototype</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HamburgerMenu />
      <main className={`${styles.main} flex flex-grow flex-col`}>
        <MainScene />
        {/* <WaveText className="absolute bottom-0 flex items-center justify-center w-screen h-screen pointer-events-none select-none" /> */}
      </main>

      <footer
        className={`${styles.footer} w-full h-50 bg-black text-white px-40 flex align-center items-center justify-center uppercase`}
      >
        Powered by passion
      </footer>
      <CursorCircle />
    </div>
  )
}
