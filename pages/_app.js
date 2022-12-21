import { UserContextProvider } from "context/UserContex"
import { MessageContextProvider } from "context/MessageContext"
import "../styles/globals.css"

function MyApp({ Component, pageProps }) {
  return (
    <UserContextProvider>
      <MessageContextProvider>
        <Component {...pageProps} />
      </MessageContextProvider>
    </UserContextProvider>
  )
}

export default MyApp
