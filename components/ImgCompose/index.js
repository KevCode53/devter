const inedx = ({ src, obj, remove }) => {
  return (
    <div>
      <i onClick={() => remove(obj)}>X</i>
      <img src={src} />
    </div>
  )
}

export default inedx
