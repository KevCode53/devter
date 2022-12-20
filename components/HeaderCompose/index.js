import Styles from "./styles.module.css"
import Button from "components/Button"
import BackArrow from "components/Icons/BackArrow"
import { useAddDevit } from "hooks/useAddDevit"
import { useEffect } from "react"

const index = () => {
  const { btnStatus, uploadDevit } = useAddDevit()

  return (
    <header className={Styles.header}>
      <button>
        <BackArrow />
      </button>
      <div>
        <Button onClick={uploadDevit} disabled={btnStatus}>
          Devitiar
        </Button>
      </div>
    </header>
  )
}

export default index
