const ImgPreview = ({ name, src, id }) => {
  return (
    <div>
      <a>
        <div>
          <img key={id} alt={name} src={src} />
        </div>
      </a>
    </div>
  )
}

export default ImgPreview
