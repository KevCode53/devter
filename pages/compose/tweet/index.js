import AppLayout from "components/AppLayout"
import Avatar from "components/Avatar"
import Button from "components/Button"
import { useState } from "react"
import Styles from "./styles.module.css"
import { useUser } from "hooks/useUser"
import { addDevit } from "supabase/devit"

const Tweet = () => {
  const [message, setMessage] = useState("")
  const { user } = useUser()

  const handleChange = (event) => {
    const { value } = event.target
    setMessage(value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    addDevit({
      created_at: new Date().toISOString(),
      user_id: user.id,
      content: message,
    })
  }

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
            <Button disabled={message.length === 0}>Devitear</Button>
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
