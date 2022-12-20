import React, { useState } from "react"

export const DevitContext = React.createContext({})

export const DevitContextProvider = ({ children }) => {
  const [devit, setDevit] = useState(null)

  return (
    <DevitContext.Provider value={{ devit, setDevit }}>
      {children}
    </DevitContext.Provider>
  )
}
