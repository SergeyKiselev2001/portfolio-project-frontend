import { HeaderPage, withHeader } from '@shared/hocs/withHeader'
import classes from './Profile.module.scss'
import { ProfileContent } from '@widgets/ProfileContent'
import { Login } from '@widgets/Login'
import { useState, useEffect } from 'react'
import { StorageKeys, getStorageItem } from '@entities/clientStorage'
import { Spinner } from '@widgets/Spinner'
import { RouterPaths } from '@app/config/router'

const Profile = () => {
  useEffect(() => {
    HeaderPage.setCurrentPage(RouterPaths.PROFILE)

    if (getStorageItem(StorageKeys.AUTH)) {
      setSpinner(false)
      setShowProfile(true)
    } else {
      setSpinner(false)
    }
  }, [])

  const [showProfile, setShowProfile] = useState(false)
  const [spinner, setSpinner] = useState(true)

  return (
    <div className={classes.Profile}>
      {spinner ? (
        <Spinner />
      ) : showProfile ? (
        <ProfileContent />
      ) : (
        <Login setShowProfile={setShowProfile} />
      )}
    </div>
  )
}

export default withHeader(Profile)
