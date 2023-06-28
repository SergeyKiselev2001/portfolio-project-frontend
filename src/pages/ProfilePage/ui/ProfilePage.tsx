import { useParams } from 'react-router'
import classes from './ProfilePage.module.scss'
import { ErrorPage } from '@pages/ErrorPage'
import { HeaderPage, withHeader } from '@shared/hocs/withHeader'
import { useEffect, useState } from 'react'
import { user } from '@entities/user'
import { Spinner } from '@widgets/Spinner'
import { ProfileInfo } from '@widgets/ProfileInfo'
import { useTranslation } from 'react-i18next'
import { i18Keys } from '@widgets/LangSwitcher'

const ProfilePage = () => {
  const params = useParams() as {
    user: string
  }

  const { t } = useTranslation()

  const [spinner, setSpinner] = useState(true)

  useEffect(() => {
    setSpinner(true)
    HeaderPage.currentPage = params?.user
    ;(async () => {
      await user.getUserInfo(params?.user.replace('@', ''))
      setSpinner(false)
    })()
  }, [params])

  if (params?.user[0] != '@') {
    return <ErrorPage message={`${t(i18Keys.PAGE_NOT_FOUND)}`} />
  }

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

      {!spinner && !user.login && (
        <ErrorPage message={`${t(i18Keys.USER_NOT_FOUND)}`} />
      )}
    </div>
  )
}

export default withHeader(ProfilePage)
