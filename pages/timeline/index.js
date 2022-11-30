import styles from '../../styles/Home.module.css'
import Link from 'next/link'


const Timeline = ({userName}) => {
  return (
    <div className={styles.container}>
      <h1>Welcome to timeline of ${userName}</h1>
      <Link href='/'>Go Home</Link>
    </div>
  )
}

Timeline.getInitialProps = () => {
  return { userName: '@kp53'}
}

export default Timeline;