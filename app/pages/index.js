import Head from 'next/head'
import Mixer from '../components/mixer'
import styles from "./index.module.css"


export default function Home() {
  return (
    <div className={styles.everything}>
      <Head>
        <title>StepIt</title>
        <link href="https://fonts.googleapis.com/css2?family=Comfortaa&display=swap" rel="stylesheet"></link>
      </Head>
      <Mixer/>
    </div>
  )
}
