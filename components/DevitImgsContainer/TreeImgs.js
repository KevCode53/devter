import Styles from "./styles.module.css"

const TreeImgs = ({ imgs }) => {
  const leftImg = imgs.slice(0, 1)
  const rightImgs = imgs.slice(1)

  console.log("Left")
  console.log(leftImg)
  console.log("right")
  console.log(rightImgs)
  return (
    <>
      <div className={Styles.twoImgs}>
        <img src={leftImg[0].serverPath}></img>
      </div>
      <div className={Styles.treeImgs}>
        {rightImgs.map((img) => (
          <div key={img.id} className={Styles.cuarterContainer}>
            <img src={img.serverPath} />
          </div>
        ))}
      </div>
    </>
  )
}

export default TreeImgs
