import Styles from './styles.module.scss'


const index = () => {
    return (
        <dvi className={Styles.loginBar} >
            <div className={`btn primaryBtn`}>
                <a><span>Inciar Sesión</span></a>
            </div>
            <div className={`btn secondaryBtn`}>
                <a><span>Registrarse</span></a>
            </div>
        </dvi>
    );
}

export default index;