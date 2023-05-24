import { withHeader } from '@shared/hocs/withHeader'
import classes from './MainPage.module.scss'
import { useEffect } from 'react'
import { api } from '@app/api'
import { Modal } from '@widgets/Modal'

const MainPage = () => {
  useEffect(() => {
    ;(async () => {
      const result = await api.get('users')
      console.log(result)
    })()
  }, [])

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
