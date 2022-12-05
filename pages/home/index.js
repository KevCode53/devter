import AppLayout from "components/AppLayout"
import Avatar from "components/Avatar"
import Styles from "./styles.module.css"

const HomePage = () => {
  return (
    <AppLayout>
      <header className={Styles.header}>
        <Avatar />
        <h2>Inicio</h2>
      </header>
      <section className={Styles.section}>
        <h1>Home</h1>
      </section>
      <nav className={Styles.nav}>
        <ul>
          <li>
            <a>Hola</a>
          </li>
        </ul>
      </nav>
    </AppLayout>
  )
}

export default HomePage
