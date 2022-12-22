import FourImgs from "./FourImgs"
import Styles from "./styles.module.css"
import TreeImgs from "./TreeImgs"
import TwoImg from "./TwoImg"

const index = ({ imgs }) => {
  return (
    <>
      {imgs.length >= 1 && (
        <section className={Styles.containerImgs}>
          {imgs.length === 1 && (
            <div className={Styles.oneImg}>
              <img src={imgs[0].serverPath} alt={imgs[0].name} />
            </div>
          )}
          {imgs.length === 2 && <TwoImg imgs={imgs} />}
          {imgs.length === 3 && <TreeImgs imgs={imgs} />}
          {imgs.length === 4 && <FourImgs imgs={imgs} />}
        </section>
      )}
    </>
  )
}

export default index
