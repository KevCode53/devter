import AppLayout from "components/AppLayout"
import Avatar from "components/Avatar"
import Styles from "./styles.module.css"
import { useEffect, useState } from "react"
import Devit from "components/Devit"
import { useUser } from "hooks/useUser"

const HomePage = () => {
  const [timeline, setTimeline] = useState([])
  const { user } = useUser()

  useEffect(() => {
    ;(user !== null) & (user !== undefined) &&
      fetch("/api/statuses/home_timeline")
        .then((res) => res.json())
        .then(setTimeline)
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
          return (
            <Devit
              avatar={devit.avatar}
              name={devit.name}
              key={devit.id}
              timeStamp={devit.timeStamp}
              message={devit.message}
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
