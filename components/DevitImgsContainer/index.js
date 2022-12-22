import Styles from "./styles.module.css"
import FourImgs from "./FourImgs"
import TreeImgs from "./TreeImgs"
import TwoImg from "./TwoImg"

const index = ({ imgs }) => {
  return (
    <>
      {imgs.length >= 1 && imgs.length === 1 && (
        <section className={Styles.containerImgs}>
          <div>
            {imgs.map((img) => (
              <img key={img.id} src={img.publicUrl} alt={img.name} />
            ))}
          </div>
        </section>
      )}
      {imgs.length === 2 && <TwoImg imgs={imgs} />}
      {imgs.length === 3 && <TreeImgs imgs={imgs} />}
      {imgs.length === 4 && <FourImgs imgs={imgs} />}
    </>
  )
}

export default index
