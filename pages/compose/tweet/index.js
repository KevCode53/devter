import AppLayout from "components/AppLayout"
import Avatar from "components/Avatar"
import Button from "components/Button"
import { useEffect, useState } from "react"
import Styles from "./styles.module.css"
import { useUser } from "hooks/useUser"
import { addDevit } from "supabase/devit"
import { useRouter } from "next/router"
import Head from "next/head"
import FormCompose from "components/FormCompose"
import HeaderCompose from "components/HeaderCompose"
import { useImgDevit } from "hooks/useImgDevit"
import { DevitContextProvider } from "context/DevitContext"

// Posibles estados del compose
const CMOPOSE_STATES = {
  USER_NOT_KNOWN: 0,
  LOADING: 1,
  SUCCESS: 2,
  ERROR: -1,
}

// Inicio del Componente Devit
const Tweet = () => {
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState(CMOPOSE_STATES.USER_NOT_KNOWN)
  const { user } = useUser()
  const router = useRouter()
  const { imgList } = useImgDevit()

  const handleChange = (event) => {
    const { value } = event.target
    event.target.style.height = `5.8rem`
    const scHeight = event.target.scrollHeight
    event.target.style.height = `${scHeight}px`
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
      images: imgList,
    })
      .then((res) => {
        console.log(res)
        router.push("/home")
      })
      .catch((err) => {
        console.error(err)
        setStatus(CMOPOSE_STATES.ERROR)
      })
  }

  const isButtonDisabled = !message.length || status === CMOPOSE_STATES.LOADING

  useEffect(() => {
    // setDevit({
    //   created_at: new Date().toISOString(),
    //   // user_id: user.id,
    //   content: message,
    //   // email: user.email,
    //   // avatar: user.avatar,
    //   // username: user.username,
    //   images: imgList
    // })
  }, [message])

  return (
    <AppLayout>
      <Head>
        <title>Publica un nuevo Devit | Devter</title>
      </Head>
      <DevitContextProvider>
        <HeaderCompose />
        {/* <header className={Styles.header}>
          <button>
            <BackArrow />
          </button>
          <div className={Styles.div}>
            <Button onClick={handleSubmit} disabled={isButtonDisabled}>
              Devitear
            </Button>
          </div>
        </header> */}
        <div className={Styles.contianer}>
          {(user !== undefined) & (user !== null) ? (
            <Avatar src={user.avatar} alt={user.username} />
          ) : (
            <Avatar />
          )}
          <div>
            <FormCompose
              handleSubmit={handleSubmit}
              handleChange={handleChange}
            />
            <section className={Styles.section}>
              <div>
                <span>🌐 Cualquier persona puede responder</span>
              </div>
              <div className={Styles.formFooter}>
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
                <div>
                  <div className={Styles.letterCount}></div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </DevitContextProvider>
    </AppLayout>
  )
}

export default Tweet
