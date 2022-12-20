import React, { useState, useEffect } from "react"

export const USER_STATES = {
  NOT_LOGGED: null,
  NOT_KNOWM: undefined,
}
export const UserContext = React.createContext({})

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(USER_STATES.NOT_KNOWM)

  useEffect(() => {
    const getUser =
      JSON.parse(
        window.localStorage.getItem("sb-smptvlonfdonqyadvhir-auth-token")
      ).user || USER_STATES.NOT_LOGGED
    const { user_metadata, id } = getUser
    const { user_name, avatar_url, email } = user_metadata
    setUser({
      id,
      avatar: avatar_url,
      username: user_name,
      email,
    })
  }, [])

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}
