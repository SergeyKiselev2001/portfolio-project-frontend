import { withHeader } from '@shared/hocs/withHeader'
import classes from './About.module.scss'

const About = () => {
  return <div className={classes.About}>about</div>
}

export default withHeader(About)
