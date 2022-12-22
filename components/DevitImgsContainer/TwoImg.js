import Styles from "./styles.module.css"
const TwoImg = ({ imgs }) => {
  return (
    <>
      {imgs.map((img) => (
        <div className={Styles.twoImgs} key={img.id}>
          <img src={img.serverPath} />
        </div>
      ))}
    </>
  )
}

export default TwoImg
