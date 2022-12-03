import styles from "./styles"

const AppLayout = ({ children }) => {
  return (
    <>
      <div>
        <main>{children}</main>
      </div>
      <style jsx>{styles}</style>
    </>
  )
}

export default AppLayout
