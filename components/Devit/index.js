import Styles from "./styles.module.css"
import Avatar from "components/Avatar"
import { useEffect } from "react"
import { getTimeGo } from "utils/timeGo"
import { useTimeAgo } from "hooks/useTimeAgo"
import DevitImgsContainer from "components/DevitImgsContainer"

const Devit = ({ avatar, username, created_at, name, content, id, images }) => {
  const timeGo = useTimeAgo(created_at)

  const templateImgs = () => {
    switch (images.length) {
      case 2:
        return <></>
      case 3:
        return <div></div>
      case 4:
        return <div></div>
      default:
        return (
          <div>
            {images.map((img) => (
              <img key={img.id} src={img.serverPath} />
            ))}
          </div>
        )
    }
  }
  return (
    <>
      <article className={Styles.article} key={id}>
        <div>
          <Avatar src={avatar} alt={username} />
        </div>
        <section>
          <div className={Styles.userInfo}>
            <strong>{name || username}</strong>
            <p>@{username}</p>
            <span>{timeGo}</span>
          </div>
          <div>
            <p>{content}</p>
            <span>Imagenes: {images.length}</span>
            {images && <DevitImgsContainer imgs={images} />}
            {/* <section className={Styles.section}> */}
            {/* {(images !== null) & Array.isArray(images) &&
              images.length === 1 ? (
                <div>
                  <img src={images[0].serverPath} />
                </div>
              ) : images.length === 2 ? (
                <>
                  <div>
                    <img src={images[0].serverPath} />
                  </div>
                  <div>
                    <img src={images[1].serverPath} />
                  </div>
                </>
              ) : images.length === 3 ? (
                <>
                  <div>
                    <img src={images[0].serverPath} />
                  </div>
                  <div>
                    <img src={images[1].serverPath} />
                    <img src={images[2].serverPath} />
                  </div>
                </>
              ) : (
                images.length &&
                4(
                  <>
                    <div>
                      <img src={images[0].serverPath} />
                      <img src={images[1].serverPath} />
                    </div>
                    <div>
                      <img src={images[2].serverPath} />
                      <img src={images[3].serverPath} />
                    </div>
                  </>
                )
              )} */}
            {/* </section> */}
          </div>
        </section>
      </article>
      <style jsx>{`
        div {
          margin-right: 1rem;
        }
      `}</style>
    </>
  )
}

export default Devit
