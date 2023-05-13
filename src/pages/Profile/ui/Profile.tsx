import { withHeader } from '@shared/hocs/withHeader'
import classes from './Profile.module.scss'

const Profile = () => {
  return <div className={classes.Profile}>profile</div>
}

export default withHeader(Profile)
