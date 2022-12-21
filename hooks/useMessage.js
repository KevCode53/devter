import { MessageContext } from "context/MessageContext"
import { useContext, useEffect, useState } from "react"

export const useMessage = () => {
  const { message, setMessage } = useContext(MessageContext)
  const [show, setShow] = useState(false)

  useEffect(() => {
    const view = setTimeout(() => {
      setMessage(null)
    }, 5000)
  }, [])

  return {
    message,
    setMessage,
  }
}
