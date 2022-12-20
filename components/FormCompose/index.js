import Styles from "./styles.module.css"
import ImgCompose from "components/ImgCompose"
import { useEffect, useRef, useState } from "react"
import { uploadImage } from "supabase/upload"
import { useImgDevit } from "hooks/useImgDevit"
import { useAddDevit } from "hooks/useAddDevit"
import { useUser } from "hooks/useUser"

// Init a Form Component for Devit
const index = ({ handleChange, handleSubmit }) => {
  const [updateList, setUpdateList] = useState("")
  const refTextArea = useRef()
  const { imgList, addImg, removeImg } = useImgDevit()
  const { handleChangeTextArea, setDevit, btnStatus, devit } = useAddDevit()
  const { user } = useUser()

  const handleDragEnter = (e) => {
    e.preventDefault()
    refTextArea.current.classList.add(Styles.drag)
  }
  const handleDragLeave = (e) => {
    e.preventDefault()
    refTextArea.current.classList.remove(Styles.drag)
  }
  const handleDrop = (e) => {
    e.preventDefault()
    refTextArea.current.classList.remove(Styles.drag)
    const file = e.dataTransfer.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = (e) => {
      // console.log(e.target.result)
      e.preventDefault(e.target.result)
      const newImg = {
        id: e.target.result,
        path: e.target.result,
        serverPath: "",
      }
      if (imgList.lenght >= 3) {
        return alert("Agregue un gif o hasta 4 imagenes!")
      }
      addImg(newImg)
      setUpdateList("update")
    }
  }

  useEffect(() => {
    if (devit !== null) {
      setDevit({ ...devit, images: imgList })
    }
  }, [imgList, updateList])

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        ref={refTextArea}
        className={Styles.textarea}
        onChange={handleChangeTextArea}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        placeholder="Que esta pasando?"
      />
      <section className={Styles.imgContainer}>
        {imgList.map((img) => (
          <ImgCompose
            obj={img}
            key={img.id}
            src={img.path}
            remove={removeImg}
          />
        ))}
      </section>
    </form>
  )
}

export default index
