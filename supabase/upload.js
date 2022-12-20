import { supabase } from "./client"

export const uploadImage = async (file) => {
  const ref = supabase.storage.from("images")
  const { data, error } = await ref.upload(`images/${file.name}`, file)
  if (error) {
    const { statusCode } = error
    statusCode !== "409" && console.error("algo salio mal")
    return downloadImage(`images/${file.name}`)
  }
  return downloadImage(data.path)
}

export const downloadImage = async (path) => {
  const ref = await supabase.storage.from("images")
  const img = ref.getPublicUrl(path)
  return img
}
