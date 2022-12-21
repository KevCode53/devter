import { useMessage } from "hooks/useMessage"
import Styles from "./styles.module.css"

const index = ({ icon, title, content }) => {
  const { message } = useMessage()

  return (
    <div className={`${Styles.container} ${message.show && Styles.show}`}>
      <h3>{message.content}</h3>
    </div>
  )
}

export default index
