import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { getGitHubUser } from "supabase/client"

const USER_STATES = {
  NOT_LOGGED: null,
  NOT_KNOWM: undefined,
}

export const useUser = () => {
  const [user, setUser] = useState(USER_STATES.NOT_KNOWM)
  const router = useRouter()

  useEffect(() => {
    getGitHubUser.then((user) => {
      if (!user) {
        setUser(USER_STATES.NOT_LOGGED)
        return user
      }
      setUser(user)
    })
  }, [])

  useEffect(() => {
    user === USER_STATES.NOT_LOGGED && router.push("/")
  }, [user])

  return { user }
}
