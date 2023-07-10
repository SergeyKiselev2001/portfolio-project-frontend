import { HeaderPage, withHeader } from '@shared/hocs/withHeader'
import classes from './CreatePostPage.module.scss'
import { useEffect, useState } from 'react'
import { RouterPaths } from '@app/config/router'
import { me } from '@entities/me'
import { observer } from 'mobx-react-lite'
import { Spinner } from '@widgets/Spinner'

const CreatePostPage = observer(() => {
  const [spinner, setSpinner] = useState(true)

  useEffect(() => {
    HeaderPage.setCurrentPage(RouterPaths.CREATE_POST)
    ;(async () => {
      await me.getUserInfoByJWT()
      setSpinner(false)
    })()
  }, [])

  return (
    <div className={classes.CreatePostPage}>
      {spinner && <Spinner />}
      {!spinner && me.login && 'good'}
      {!spinner && !me.login && 'bad'}
    </div>
  )
})

export default withHeader(CreatePostPage)
