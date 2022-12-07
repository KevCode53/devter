import AppLayout from "components/AppLayout"
import Avatar from "components/Avatar"
import Styles from "./styles.module.css"
import { useEffect, useState } from "react"
import Devit from "components/Devit"
import { useUser } from "hooks/useUser"
import { fetchLatestDevits } from "supabase/devit"
import { getUsers } from "supabase/users"
import { getTimeGo } from "utils/timeGo"

const HomePage = () => {
  const [timeline, setTimeline] = useState([])
  const { user } = useUser()

  useEffect(() => {
    if (user !== null || user !== undefined) {
      // fetch("/api/statuses/home_timeline")
      //   .then((res) => res.json())
      //   .then(setTimeline)
      fetchLatestDevits().then((res) => {
        setTimeline(res.data)
      })
    }
  }, [])

  return (
    <AppLayout>
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
          console.log(getTimeGo(devit.created_at))
          return (
            <Devit
              avatar={devit.avatar}
              name={devit.name}
              key={devit.id}
              timeStamp={devit.created_at}
              message={devit.content}
              username={devit.username}
            />
          )
        })}
      </section>
      <nav className={Styles.nav}></nav>
    </AppLayout>
  )
}

export default HomePage
