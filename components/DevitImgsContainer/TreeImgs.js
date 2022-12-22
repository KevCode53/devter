import { useState, useEffect } from "react"
import Styles from "./styles.module.css"

const TreeImgs = ({ imgs }) => {
  const [leftSide, setLefSide] = useState([])
  const [rightSide, setRightSide] = useState([])

  useEffect(() => {
    setLefSide([imgs[0]])
    setRightSide([imgs[1], imgs[2]])
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

export default TreeImgs
