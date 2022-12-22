import { useContext, useEffect, useState } from "react"
import { DevitContext } from "context/DevitContext"
import { useUser } from "./useUser"
import { addDevit, updateDevit, updateImagesPath } from "supabase/devit"
import { uploadImage, viewDevitImgsPath } from "supabase/upload"
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
    const isButtonDisabled = devit // Si existe el Devit
      ? !devit.content.length & !devit.images.length || // Desactiva el boton si esta vacio
        status === CMOPOSE_STATES.LOADING // Desactiva el botton si esta cargando
      : true // Activa el boton
    setBtnStatus(isButtonDisabled)
  }, [devit])

  // Method for send the devit from supabase
  const uploadDevit = (e) => {
    e.preventDefault() // Prevent event from button submit
    setBtnStatus(!btnStatus) // Disable the button
    setStatus(CMOPOSE_STATES.LOADING) // Chage the status to lading for view progress

    // Call the method for add the devit in supabase
    addDevit(devit)
      .then((res) => {
        if (res.error) {
          return setMessage({
            show: true,
            content: `Ocurrio algo inesperado no se pudo publicar tu devit.!`,
          })
        }

        // Upload the images in the devit
        if (Array.isArray(devit.images)) {
          // Valid the devit.images is a array

          devit.images.forEach((img) =>
            // Call the method for upload the image in the storage in supabase
            uploadImage(res.data[0].id, user.email, img).then((resp) => {
              console.log(resp)
            })
          )
        }
        const imagesPublicUrl = devit.images.map((img) => {
          const updatedImg = img
          const newPublicUrl = `${viewDevitImgsPath}/${devit.email}/${res.data[0].id}/${img.id}`
          updatedImg.publicUrl = newPublicUrl
          return updatedImg
        })

        updateImagesPath(res.data[0].id, { images: imagesPublicUrl })

        setStatus(CMOPOSE_STATES.SUCCESS)
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

// https://smptvlonfdonqyadvhir.supabase.co/storage/v1/object/public/devits/kpalmar@miumg.edu.gt/158/0f9d1fda146bb233b3a8f050841c01c3
// https://smptvlonfdonqyadvhir.supabase.co/storage/v1/object/public/devits/158/0f9d1fda146bb233b3a8f050841c01c3
