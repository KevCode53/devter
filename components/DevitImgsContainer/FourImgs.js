import { useEffect, useState } from "react"
import Styles from "./styles.module.css"

const FourImgs = ({ imgs }) => {
  const [leftSide, setLefSide] = useState([])
  const [rightSide, setRightSide] = useState([])

  useEffect(() => {
    setLefSide([imgs[0], imgs[1]])
    setRightSide([imgs[2], imgs[3]])
  }, [])

  return (
    <section>
      <div>
        {leftSide.map((img) => (
          <img key={img.id} src={img.publicUrl} alt={img.name} />
        ))}
      </div>
      <div>
        {rightSide.map((img) => (
          <img key={img.id} src={img.publicUrl} alt={img.name} />
        ))}
      </div>
    </section>
  )
}

export default FourImgs
