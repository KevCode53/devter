import Styles from "./styles.module.css"
import Avatar from "components/Avatar"

const Devit = ({ avatar, username, timeStamp, name, message, id }) => {
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
            <span>{timeStamp}</span>
          </div>
          <p>{message}</p>
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
