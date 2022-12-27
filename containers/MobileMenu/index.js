import { useUser } from 'hooks/useUser';
import Styles from './styles.module.scss'

const index = () => {
  const {user} = useUser()
    return (
      <div className={`${Styles.mobileMenuContainer}`}>
        
        {/* Container Menu */}
        <div className={Styles.menuContainer}>
          
          {/* Informacion de la cuenta */}
          <div className={Styles.acount}>
            <div><h2><span>Informacion de la cuenta</span></h2></div>
            <div><button>X</button></div>
          </div>

          {/* Informacion de Usuario */}
          <div className={Styles.userInfo}>
            <div className={Styles.first}>
              <div>
                <picture>
                  <img src={`${user && user.avatar && user.avatar}`} />
                </picture>
                <div>
                  <a></a>
                </div>
              </div>
            </div>
            <div className={Styles.second}>
              <div>
                <h2>Kevin Palma Ralda</h2>
                <span>@{`${user && user.username ? user.username : 'example'}`}</span>
              </div>
            </div>
            <div className={Styles.third}>
              <div>
                <a><strong>18</strong><span>Siguiendo</span></a>
              </div>
              <div>
                <a><strong>2</strong><span>Seguidores</span></a>
              </div>
            </div>
          </div>

          <div className={Styles.menuItem}><a><span>Perfil</span></a></div>
          <div className={Styles.menuItem}><a><span>Temas</span></a></div>
          <div className={Styles.menuItem}><a><span>Guardados</span></a></div>
          <div className={Styles.menuItem}><a><span>Listas</span></a></div>
          <div className={Styles.menuItem}><a><span>Circulo de Devit</span></a></div>
          <div className={Styles.separetor}></div>
        </div>

      </div>
  )}

export default index;