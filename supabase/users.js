import { supabase } from "./client"

// Get all users
export const getUsers = async () => {
  const response = await supabase.from("users").select("*")
  // const devits = response.then((res) => {})
  return response
}
