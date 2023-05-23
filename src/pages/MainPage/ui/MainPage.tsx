import { withHeader } from '@shared/hocs/withHeader'
import classes from './MainPage.module.scss'
import { useEffect } from 'react'
import { api } from '@app/api'

const MainPage = () => {
  useEffect(() => {
    ;(async () => {
      const result = await api.get('users')
      console.log(result)
    })()
  }, [])

  return <div className={classes.MainPage}>main page</div>
}

export default withHeader(MainPage)
