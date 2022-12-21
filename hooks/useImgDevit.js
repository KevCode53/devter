import { useState } from "react"
import { useAddDevit } from "./useAddDevit"

export const useImgDevit = () => {
  const [imgList, setImgList] = useState([])

  const addImg = (data) => {
    if (imgList.length >= 4) {
      return alert("Agregue 1 GIF o hasta 4 imagenes!")
    }
    if (imgList.find((el) => el.id === data.id)) {
      return alert("Este elemento ya se encuentra en el Devit!")
    } else {
      setImgList([...imgList, data])
    }
  }
  const removeImg = (data) => {
    const newList = imgList.filter((img) => img.id !== data.id)
    setImgList(newList)
  }

  return {
    imgList,
    addImg,
    removeImg,
  }
}
