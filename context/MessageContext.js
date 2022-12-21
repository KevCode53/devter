import React, { useState } from "react"

export const MessageContext = React.createContext({})

export const MessageContextProvider = ({ children }) => {
  const [message, setMessage] = useState(null)

  return (
    <MessageContext.Provider value={{ message, setMessage }}>
      {children}
    </MessageContext.Provider>
  )
}
