import { withHeader } from '@shared/hocs/withHeader'
import classes from './MainPage.module.scss'

const MainPage = () => {
  return <div className={classes.MainPage}>main page</div>
}

export default withHeader(MainPage)
