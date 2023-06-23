import { useParams } from 'react-router'
import classes from './ProfilePage.module.scss'
import { ErrorPage } from '@pages/ErrorPage'
import { HeaderPage, withHeader } from '@shared/hocs/withHeader'
import { useEffect, useState } from 'react'
import { user } from '@entities/user'
import { Spinner } from '@widgets/Spinner'
import { ProfileInfo } from '@widgets/ProfileInfo'

const ProfilePage = () => {
  const params = useParams() as {
    user: string
  }

  const [spinner, setSpinner] = useState(true)

  if (params.user[0] != '@') {
    return <ErrorPage />
  }

  useEffect(() => {
    HeaderPage.currentPage = params.user
    ;(async () => {
      await user.getUserInfo(params.user.replace('@', ''))
      setSpinner(false)
    })()
  }, [])

  return (
    <div className={classes.ProfilePage}>
      {spinner && <Spinner />}
      {!spinner && user.login && (
        <>
          <div className={classes.profileInfoWrapper}>
            <ProfileInfo user={user} />
          </div>
          <div className={classes.filters}></div>
          <div className={classes.posts}></div>
        </>
      )}
      {!spinner && !user.login && <h1>Пользователь не найден!</h1>}
    </div>
  )
}

export default withHeader(ProfilePage)
