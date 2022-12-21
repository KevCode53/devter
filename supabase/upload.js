import { supabase } from "./client"

export const uploadImage = async (file) => {
  console.log(typeof(file))
  const ref = supabase.storage.from("images")
  const { data, error } = ref.upload(
    `images/${file.name}`, file
  )
  if (error) {
    const { statusCode } = error
    statusCode !== "409" && console.error("algo salio mal")
    return getUrlImg(`images/${file.name}`)
  }
  return getUrlImg(data)
}

export const getUrlImg = async (path) => {
  const ref = await supabase.storage.from("devits")
  const img = ref.getPublicUrl(path)
  return img
}
