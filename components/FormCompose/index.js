import Styles from "./styles.module.css"
import ImgCompose from "components/ImgCompose"

const index = ({ handleChange, handleSubmit }) => {
  const handleDragEnter = (e) => {
    e.preventDefault()
  }
  const handleDragLeave = (e) => {
    e.preventDefault()
  }
  const handleDrop = (e) => {
    e.preventDefault()
  }

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        className={Styles.textarea}
        onChange={handleChange}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        placeholder="Que esta pasando?"
      />
      <section className={Styles.imgContainer}>
        <ImgCompose src="/1.jfif" />
        <ImgCompose src="/2.jfif" />
        <ImgCompose src="/3.png" />
        <ImgCompose src="/4.jpg" />
      </section>
    </form>
  )
}

export default index
