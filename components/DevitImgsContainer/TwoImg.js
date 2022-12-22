import Styles from "./styles.module.css"
const TwoImg = ({ imgs }) => {
  return (
    <section className={Styles.containerTwo}>
      {imgs.map((img) => (
        <div className={Styles.twoImgs} key={img.id}>
          <img src={img.publicUrl} />
        </div>
      ))}
    </section>
  )
}

export default TwoImg
