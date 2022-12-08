import Styles from "./styles.module.css"
import Avatar from "components/Avatar"
import { useEffect } from "react"
import { getTimeGo } from "utils/timeGo"

const Devit = ({ avatar, username, created_at, name, content, id }) => {
  const timeGo = getTimeGo(created_at)
  return (
    <>
      <article className={Styles.article} key={id}>
        <div>
          <Avatar src={avatar} alt={username} />
        </div>
        <section>
          <div className={Styles.userInfo}>
            <strong>{name || username}</strong>
            <p>@{username}</p>
            <span>{timeGo}</span>
          </div>
          <p>{content}</p>
        </section>
      </article>
      <style jsx>{`
        div {
          margin-right: 1rem;
        }
      `}</style>
    </>
  )
}

export default Devit
