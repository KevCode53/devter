import styles from "./styles"
import MessageModal from "components/MessageModal"
import { useMessage } from "hooks/useMessage"

const AppLayout = ({ children }) => {
  const { message } = useMessage()

  return (
    <>
      <div>
        <main>
          {children}
          {message && message.show && <MessageModal />}
        </main>
      </div>
      <style jsx>{styles}</style>
    </>
  )
}

export default AppLayout
