import { supabase } from "./client"

// Insert a Devit
export const addDevit = async ({
  created_at,
  user_id,
  content,
  email,
  avatar,
  username,
  images,
}) => {
  const response = await supabase
    .from("devits")
    .insert([
      {
        created_at,
        user_id,
        content,
        email,
        avatar,
        username,
        likes_count: 0,
        shared_count: 0,
        images,
      },
    ])
    .select()
  return response
}

// Get last devits
export const fetchLatestDevits = async () => {
  const response = await supabase
    .from("devits")
    .select()
    .order("created_at", { ascending: false })
  // const devits = response.then((res) => {})
  return response
}

// update publicImagesPath
export const updateImagesPath = (id, { images: array }) => {
  updateDevit(id, { images: array })
}

// Update Devit
export const updateDevit = async (id, values) => {
  const response = await supabase.from("devits").update(values).eq("id", id)

  return response
}
