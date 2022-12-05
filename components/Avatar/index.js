import Styles from "./styles.module.css"
const Avatar = ({ alt, src, text, withText }) => {
  return (
    <div className={Styles.container}>
      <img className={Styles.avatar} alt={alt} src={src} title={alt} />
      {withText && <strong>{text || alt}</strong>}
    </div>
  )
}

export default Avatar
