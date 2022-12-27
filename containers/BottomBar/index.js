import Styles from './styles.module.scss'

import LoginBar from 'components/LoginBar'
const index = () => {
    return (
        <div className={Styles.container}>
            <div></div>
            <div>
                <LoginBar />
            </div>
        </div>
    );
}

export default index;