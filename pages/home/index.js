import AppLayout from "components/AppLayout"
import Avatar from "components/Avatar"
import Styles from "./styles.module.css"
import { useEffect, useState } from "react"
import Devit from "components/Devit"
import { useUser } from "hooks/useUser"
import { fetchLatestDevits } from "supabase/devit"
import { getUsers } from "supabase/users"
import { getTimeGo } from "utils/timeGo"
import Link from "next/link"
import Home from "components/Icons/Home"
import Search from "components/Icons/Search"
import Notify from "components/Icons/Notify"
import Message from "components/Icons/Message"
import Create from "components/Icons/Create"
import Head from "next/head"

const HomePage = () => {
  const [timeline, setTimeline] = useState([])
  const { user } = useUser()

  useEffect(() => {
    if (user !== null || user !== undefined) {
      fetchLatestDevits().then((res) => {
        setTimeline(res.data)
      })
    }
  }, [])

  return (
    <AppLayout>
      <Head>
        <title>Inicio | Devter</title>
      </Head>
      <header className={Styles.header}>
        {(user !== undefined) & (user !== null) ? (
          <Avatar src={user.avatar} alt={user.username} />
        ) : (
          <Avatar />
        )}
        <h2>Inicio</h2>
      </header>
      <section className={Styles.section}>
        {timeline.map((devit) => {
          return (
            <Devit
              avatar={devit.avatar}
              name={devit.name}
              key={devit.id}
              created_at={devit.created_at}
              content={devit.content}
              username={devit.username}
              images={devit.images}
            />
          )
        })}
      </section>
      <nav className={Styles.nav}>
        <Link href="/">
          <Home />
        </Link>
        <Link href="/search">
          <Search />
        </Link>
        <Link href="/notifications">
          <Notify />
        </Link>
        <Link href="/messages">
          <Message />
        </Link>
        <div className={Styles.btnContianer}>
          <Link className={Styles.devitBtn} href="/compose/tweet">
            <Create />
          </Link>
        </div>
      </nav>
    </AppLayout>
  )
}

export default HomePage
