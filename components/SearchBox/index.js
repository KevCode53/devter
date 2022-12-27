import Styles from './styles.module.scss'

const index = () => {
    return (
        <div className={Styles.container}>
            <form>
                <div>
                    <label><span>🔍</span></label>
                    <input />
                    <button>X</button>
                </div>
            </form>
        </div>
    );
}

export default index;