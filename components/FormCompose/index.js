import Styles from "./styles.module.css"
import ImgCompose from "components/ImgCompose"
import { useEffect, useRef, useState } from "react"
import { uploadImage } from "supabase/upload"
import { useAddDevit } from "hooks/useAddDevit"
import { useUser } from "hooks/useUser"
import md5 from "md5"
import { manageFiles } from "utils/manageFiles"

// Init a Form Component for Devit
const index = ({ handleChange, handleSubmit }) => {

  const [imgList, setImgList] = useState([])
  const refTextArea = useRef()
  const {
    handleChangeTextArea,
    setDevit,
    btnStatus,
    devit,
    addImg,
    removeImg
  } = useAddDevit()
  const { user } = useUser()

  const handleDragEnter = (e) => {
    e.preventDefault()
    refTextArea.current.classList.add(Styles.drag)
  }
  const handleDragLeave = (e) => {
    e.preventDefault()
    refTextArea.current.classList.remove(Styles.drag)
  }
  const handleDrop = e => {
    e.preventDefault()
    const files = Object.values(e.dataTransfer.files)
    console.log(files)
    const listImg = files.map(async img => {
      const reader = new FileReader()
      reader.readAsDataURL(img)
      // reader.onload = e => {
      //   e.preventDefault(e.target.result)
        
      //   addImg(...devit.images, {
      //     id: md5(e.target.result),
      //     frontPath: e.target.result,
      //     serverPath: `${user}/${img.name}`,
      //     imgFile: img
      //   })
      // }
      reader.onload = () => {
        return reader.result
      }
      console.log(reader.onload)
    })

  }
  const handleDrop2 = (e) => {
    e.preventDefault()
    refTextArea.current.classList.remove(Styles.drag)

    const files = e.dataTransfer.files

    if (files.length > 4 || (devit.images.length + files.length) > 4) {
      return console.error('Agregue 1 GIF o hasta 4 imagenes!')
    }
    for (let i = 1; i <= files.length; ++i) {
      const reader = new FileReader()
      reader.readAsDataURL(files[i-1])
      reader.onload = (e) => {
          e.preventDefault(e.target.result)
          let newImg = {
              id: md5(e.target.result),
              frontPath: e.target.result,
              serverPath: `${user}/${files.name}`,
              imgFile: files[i-1]
          }
          addImg(newImg)
        }
      }

    // const reader = new FileReader()
    // reader.readAsDataURL(file)
    // reader.onload = (e) => {
    //   e.preventDefault(e.target.result)

    // }
    // const file = e.dataTransfer.files[0]
    // const reader = new FileReader()
    // reader.readAsDataURL(file)
    // reader.onload = (e) => {
    //   e.preventDefault(e.target.result)
    //   console.log(typeof(e.target.result))
    //   uploadImage(e.target.result).then(res=>console.log(res))
    //   const img = e.target.result
    //   const newImg = {
    //     id: md5(`${img}-${new Date().toISOString()}`),
    //     img: img,
    //     serverPath: ``,
    //   }
    //   if (devit.images.lenght >= 3) {
    //     return alert("Agregue un gif o hasta 4 imagenes!")
    //   }
    //   addImg(newImg)
    //   setUpdateList("update")
    // }
  }

  // useEffect(() => {
  //   if (devit !== null) {
  //     setDevit({ ...devit, images: imgList })
  //   }
  // }, [imgList, updateList])

  // console.log(devit)
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
        {devit && devit.images.map((img) => (
          <ImgCompose
            obj={img}
            key={img.id}
            src={img.frontPath}
            remove={removeImg}
          />
        ))}
      </section>
    </form>
  )
}

export default index
