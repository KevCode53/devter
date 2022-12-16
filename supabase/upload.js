import { supabase } from "./client"

export const uploadImage = async (file) => {
  const ref = supabase.storage.from("images")
  const task = ref.upload(`images/${file.name}`, file)
  return task
}

export const downloadImage = async (path) => {
  const ref = await supabase.storage.from("images")
  const img = ref.getPublicUrl(path)
  return img
}
