import { supabase } from "./client"

// Insert a Devit
export const addDevit = async ({
  created_at,
  user_id,
  content,
  email,
  avatar,
  username,
}) => {
  const response = await supabase.from("devits").insert([
    {
      created_at,
      user_id,
      content,
      email,
      avatar,
      username,
      likes_count: 0,
      shared_count: 0,
    },
  ])
  return response
}

// Get last devits
export const fetchLatestDevits = async () => {
  const response = await supabase.from("devits").select("*")
  // const devits = response.then((res) => {})
  return response
}
