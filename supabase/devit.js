import { supabase } from "./client"

// Insert a Devit
export const addDevit = async ({ created_at, user_id, content }) => {
  const { data, error } = await supabase
    .from("devits")
    .insert([{ created_at, user_id, content, likes_count: 0, shared_count: 0 }])
  console.log(data, error)
  return { data, error }
}
