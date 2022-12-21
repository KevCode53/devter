import { useContext, useEffect, useState } from "react"
import { DevitContext } from "context/DevitContext"
import { useUser } from "./useUser"
import { addDevit } from "supabase/devit"
import { uploadImage } from "supabase/upload"
import { useRouter } from "next/router"
import { useMessage } from "./useMessage"

const CMOPOSE_STATES = {
  NOT_KNOWN: 0,
  LOADING: 1,
  SUCCESS: 2,
  ERROR: -1,
}

export const useAddDevit = () => {
  const { user } = useUser()
  const { devit, setDevit } = useContext(DevitContext)
  const [message, setMessageDevit] = useState("")
  const [status, setStatus] = useState(CMOPOSE_STATES.NOT_KNOWN)
  const [btnStatus, setBtnStatus] = useState(true)
  const router = useRouter()
  const { setMessage } = useMessage()
  const contentMsg = {
    title: "Error",
    content: "Agregue 1 GIF o hasta 4 imagenes..!",
    show: true,
  }

  const handleChangeTextArea = (e) => {
    const { value } = e.target
    e.target.style.height = "5.7rem"
    const scHeight = e.target.scrollHeight
    e.target.style.height = `${scHeight}px`
    setMessageDevit(value)
  }

  useEffect(() => {
    setDevit({
      created_at: new Date().toISOString(),
      user_id: (user && user.id) || "",
      content: message,
      email: (user && user.email) || "",
      avatar: (user && user.avatar) || "",
      username: (user && user.username) || "",
      images: devit ? devit.images : [],
    })
  }, [message])

  useEffect(() => {
    const isButtonDisabled = devit
      ? !devit.content.length || status === CMOPOSE_STATES.LOADING
      : true
    setBtnStatus(isButtonDisabled)
  }, [devit])

  const uploadDevit = (e) => {
    e.preventDefault()
    // console.log("Se enviara el devit a la base de datos")
    console.log(devit)
    addDevit(devit)
      .then((res) => {
        console.log(res)
        if (Array.isArray(devit.images)) {
          Array.isArray(devit.images) &&
            devit.images.map((img) => uploadImage(user.email, img.file))
        }
        router.push("/home")
      })
      .catch((err) => {
        console.error(err)
        setStatus(CMOPOSE_STATES.ERROR)
      })
  }

  const addImg = (imgs) => {
    if (devit.images.length > 4 || imgs.length + devit.images.length > 4)
      return setMessage(contentMsg)

    // Se buscaba como filtrar las imagenes para no repetir

    const newArray = devit.images.concat(imgs)

    console.log(newArray)

    setDevit({ ...devit, images: newArray })
  }
  const removeImg = (ref) => {
    const newImgList = devit.images.filter((img) => img.id !== ref.id)
    setDevit({
      ...devit,
      images: newImgList,
    })
  }

  return {
    devit,
    setDevit,
    handleChangeTextArea,
    message,
    btnStatus,
    uploadDevit,
    addImg,
    removeImg,
  }
}
