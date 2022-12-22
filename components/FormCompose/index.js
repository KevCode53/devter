import Styles from "./styles.module.css"
import ImgCompose from "components/ImgCompose"
import { useRef, useState } from "react"
import { useAddDevit } from "hooks/useAddDevit"
import { useUser } from "hooks/useUser"
import md5 from "md5"
import { useMessage } from "hooks/useMessage"
import { viewDevitImgsPath } from "supabase/upload"

// Init a Form Component for Devit
const index = ({ handleChange, handleSubmit }) => {
  const refTextArea = useRef()
  const refContainer = useRef()
  const { handleChangeTextArea, devit, removeImg, addImg } = useAddDevit()
  const { user } = useUser()
  const { setMessage } = useMessage()

  // const handleDragEnter = (e) => {
  //   refContainer.current.classList.add(Styles.drag)
  //   e.preventDefault()
  // }
  // const handleDragLeave = (e) => {
  //   refContainer.current.classList.remove(Styles.drag)
  //   e.preventDefault()
  // }

  const handleDrop = (e) => {
    e.preventDefault()
    const selectFiles = e.dataTransfer.files
    if (
      selectFiles.length > 4 ||
      selectFiles.length + devit.images.lenght > 4
    ) {
      return setMessage({
        title: "Error",
        content: "Agregue 1 GIF o hasta 4 imagenes..!",
        show: true,
      })
    }
    const selectFilesArray = Array.from(selectFiles)

    // Manejando las Imagenes como Promesas
    // const imgsArrayPromise = selectFilesArray.map((file) => {
    //   const promise = new Promise((resolve, reject) => {
    //     const reader = new FileReader()
    //     reader.readAsDataURL(file)
    //     reader.onload = (e) => {
    //       const img = {
    //         id: md5(e.target.result),
    //         localPreview: e.target.result,
    //         serverPath: '',
    //         file
    //       }
    //       resolve(img)
    //     }
    //     if(reader.error) { reject(reader.error)}
    //   })
    //   return promise
    // })

    // Este codigo funciona correctamente solo se probara otra manera de hacerlo
    const imagesArray = selectFilesArray.map((file) => {
      const urlObj = URL.createObjectURL(file)
      const img = {
        id: md5(urlObj),
        localPreview: urlObj,
        publicUrl: "",
        file,
      }
      return img
    })
    addImg(imagesArray)
  }

  // console.log(devit)
  return (
    <div
      ref={refContainer}
      className={Styles.container}
      // onDragEnter={handleDragEnter}
      // onDragLeave={handleDragLeave}
    >
      <textarea
        ref={refTextArea}
        className={Styles.textarea}
        onChange={handleChangeTextArea}
        // onDragEnter={handleDragEnter}
        // onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        placeholder="Que esta pasando?"
      />
      <section
        onDrop={handleDrop}
        // onDragEnter={handleDragEnter}
        // onDragLeave={handleDragLeave}
        className={Styles.imgContainer}
      >
        {devit &&
          devit.images.map((img) => (
            <ImgCompose
              obj={img}
              key={img.id}
              src={img.localPreview}
              remove={removeImg}
            />
          ))}
      </section>
    </div>
  )
}

export default index
