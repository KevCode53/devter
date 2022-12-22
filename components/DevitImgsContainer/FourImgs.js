const FourImgs = ({ imgs }) => {
  const leftImg = imgs.pop()
  return (
    <>
      <div>
        <img src={leftImg.serverPath}></img>
      </div>
    </>
  )
}

export default FourImgs
