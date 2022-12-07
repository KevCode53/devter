import AppLayout from "components/AppLayout"
import Avatar from "components/Avatar"
import Button from "components/Button"
import { useState } from "react"
import Styles from "./styles.module.css"
import { useUser } from "hooks/useUser"
import { addDevit } from "supabase/devit"
import { useRouter } from "next/router"

const CMOPOSE_STATES = {
  USER_NOT_KNOWN: 0,
  LOADING: 1,
  SUCCESS: 2,
  ERROR: -1,
}

const Tweet = () => {
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState(CMOPOSE_STATES.USER_NOT_KNOWN)
  const { user } = useUser()
  const router = useRouter()

  const handleChange = (event) => {
    const { value } = event.target
    setMessage(value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setStatus(CMOPOSE_STATES.LOADING)
    addDevit({
      created_at: new Date().toISOString(),
      user_id: user.id,
      content: message,
      email: user.email,
      avatar: user.avatar,
      username: user.username,
    })
      .then(() => {
        router.push("/home")
      })
      .catch((err) => {
        console.error(err)
        setStatus(CMOPOSE_STATES.ERROR)
      })
  }

  const isButtonDisabled = !message.length || status === CMOPOSE_STATES.LOADING

  return (
    <AppLayout>
      <header className={Styles.header}>
        <button>back</button>
        <div className={Styles.div}></div>
      </header>
      <div className={Styles.contianer}>
        {(user !== undefined) & (user !== null) ? (
          <Avatar src={user.avatar} alt={user.username} />
        ) : (
          <Avatar />
        )}
        <div>
          <form onSubmit={handleSubmit}>
            <textarea
              onChange={handleChange}
              className={Styles.textarea}
              placeholder="¿Qué esta pasando?"
            ></textarea>
            <Button disabled={isButtonDisabled}>Devitear</Button>
          </form>
          <section className={Styles.section}>
            <div>
              <span>🌐 Cualquier persona puede responder</span>
            </div>
            <div>
              <ul>
                <li>
                  <button>📷</button>
                </li>
                <li>
                  <button>🌟</button>
                </li>
                <li>
                  <button>😊</button>
                </li>
                <li>
                  <button>⬆️</button>
                </li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </AppLayout>
  )
}

export default Tweet
