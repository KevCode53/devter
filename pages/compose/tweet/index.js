import AppLayout from "components/AppLayout"
import Avatar from "components/Avatar"
import Button from "components/Button"
import { useState, useRef, useEffect } from "react"
import Styles from "./styles.module.css"
import { useUser } from "hooks/useUser"
import { addDevit } from "supabase/devit"
import { useRouter } from "next/router"
import Head from "next/head"
import BackArrow from "components/Icons/BackArrow"
import FormCompose from "components/FormCompose"
import { downloadImage, uploadImage } from "supabase/upload"

const CMOPOSE_STATES = {
  USER_NOT_KNOWN: 0,
  LOADING: 1,
  SUCCESS: 2,
  ERROR: -1,
}

const DRAG_IMAGE_STATES = {
  ERROR: -1,
  NONE: 0,
  DRAG_OVER: 1,
  UPLOADING: 2,
  COMPLETE: 3,
}

const Tweet = () => {
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState(CMOPOSE_STATES.USER_NOT_KNOWN)
  const [drag, setDrag] = useState(null)
  const [task, setTask] = useState(null)
  const [imgUrl, setImgUrl] = useState(null)
  const { user } = useUser()
  const router = useRouter()
  const refTextArea = useRef()

  useEffect(() => {
    if (task) {
      const onProgess = () => {}
      const onError = () => {}
      const onComplete = () => {
        console.log("onComplete")
      }
    }
  }, [task])

  const handleChange = (event) => {
    const { value } = event.target
    event.target.style.height = `5.8rem`
    const scHeight = event.target.scrollHeight
    event.target.style.height = `${scHeight}px`
    setMessage(value)
  }

  const handleDragEnter = (e) => {
    e.preventDefault()
    refTextArea.current.classList.add(Styles.Drag)
    setDrag(DRAG_IMAGE_STATES.DRAG_OVER)
  }
  const handleDragleave = (e) => {
    e.preventDefault()
    refTextArea.current.classList.remove(Styles.Drag)
    setDrag(DRAG_IMAGE_STATES.NONE)
  }
  const hanldeDrop = (e) => {
    e.preventDefault()
    refTextArea.current.classList.remove(Styles.Drag)
    setDrag(DRAG_IMAGE_STATES.NONE)

    const file = e.dataTransfer.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = (e) => {
      // console.log(e.target.result)
      e.preventDefault(e.target.result)
      setImgUrl(e.target.result)
    }

    const task = uploadImage(file)
    task.then(({ data, error }) => {
      console.log(data)
      if (!error) {
        console.log("ingreso a mostrar la imagen")
        downloadImage(data.path)
      }
    })
    setTask(task)
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
      img: imgUrl,
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
      <Head>
        <title>Publica un nuevo Devit | Devter</title>
      </Head>
      <header className={Styles.header}>
        <button>
          <BackArrow />
        </button>
        <div className={Styles.div}>
          <Button onClick={handleSubmit} disabled={isButtonDisabled}>
            Devitear
          </Button>
        </div>
      </header>
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
          {/* <form onSubmit={handleSubmit}>
            <textarea
              ref={refTextArea}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragleave}
              onDrop={hanldeDrop}
              onChange={handleChange}
              className={Styles.textarea}
              placeholder="¿Qué esta pasando?"
            ></textarea>
            <section className={Styles.imgContainer}>
              {imgUrl && (
                <div>
                  <button onClick={() => setImgUrl(null)}>X</button>
                  <img src={imgUrl} />{" "}
                </div>
              )}
            </section>
          </form> */}
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
