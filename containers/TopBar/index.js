import Styles from './styles.module.scss'
import SearchBox from 'components/SearchBox'

const index = () => {
    return (
        <div className={Styles.container}>
            <picture>
                <img src="Logo.png" />
            </picture>
            <SearchBox />
            <div>
                <button>...</button>
            </div>
        </div>
    )
}

export default index;