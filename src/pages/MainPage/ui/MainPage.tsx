import { withHeader } from '@shared/hocs/withHeader'
import classes from './MainPage.module.scss'
import { Modal } from '@widgets/Modal'

const MainPage = () => {
  return (
    <div className={classes.MainPage}>
      main page
      <Modal>
        <h1>ДА</h1>
      </Modal>
    </div>
  )
}

export default withHeader(MainPage)
