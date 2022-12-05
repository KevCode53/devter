import Styles from "./styles.module.css"

const Loading = () => {
  return (
    <div className={Styles.loader}>
      <svg className={Styles.circleOuter} viewBox="0 0 86 86">
        <circle className={Styles.back} cx="43" cy="43" r="40"></circle>
        <circle className={Styles.front} cx="43" cy="43" r="40"></circle>
        <circle className={Styles.new} cx="43" cy="43" r="40"></circle>
      </svg>
      <svg className={Styles.circleMiddle} viewBox="0 0 60 60">
        <circle className={Styles.back} cx="30" cy="30" r="27"></circle>
        <circle className={Styles.front} cx="30" cy="30" r="27"></circle>
      </svg>
      <svg className={Styles.circleInner} viewBox="0 0 34 34">
        <circle className={Styles.back} cx="17" cy="17" r="14"></circle>
        <circle className={Styles.front} cx="17" cy="17" r="14"></circle>
      </svg>
      {/* <div className={Styles.text} data-text="Cargando..!"></div> */}
    </div>
  )
}

export default Loading
