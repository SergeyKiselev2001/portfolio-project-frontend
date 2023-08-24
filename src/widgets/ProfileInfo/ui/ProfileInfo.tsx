import { HeaderTheme, IUserState } from '@entities/user'
import classes from './ProfileInfo.module.scss'
import { me } from '@entities/me'
import { LangSwitcher } from '@widgets/LangSwitcher'
import { ThemeSwitcher } from '@widgets/ThemeSwitcher'
import { useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { user as currentProfile } from '@entities/user'
import { useTranslation } from 'react-i18next'
import {
  i18Chunks,
  i18Keys,
  i18KeysProfile,
} from '@widgets/LangSwitcher/types/i18Keys'
import { DEFAULT_NS } from '@shared/constants'
import { Modal } from '@widgets/Modal'
import { HeaderColor } from '@entities/HeaderColor'
import { StorageKeys } from '@entities/clientStorage'
import { clsx } from '@shared/utils'
import { useDebounce } from '@shared/hooks'
import { toast } from 'react-toastify'
import { user as userStore } from '@entities/user'

interface IProfileInfo {
  user: IUserState
  isSubscribed: boolean
}

const ProfileInfo = observer(({ user, isSubscribed }: IProfileInfo) => {
  const { login, status, avatar, systemRole, headerTheme } = user

  const isMe = me.login == login

  const [subscribed, setSubscribed] = useState(isSubscribed)
  const [showHeaderModal, setShowHeaderModal] = useState(false)
  const [newStatus, setNewStatus] = useState(status || '')
  const { t } = useTranslation(i18Chunks.PROFILE)

  const [isSubscribedOnServer, setIsSubscribedOnServer] = useState(isSubscribed)
  const setCallbackForSubscription = useDebounce(500)

  useEffect(() => {
    userStore.updateSubscribers(subscribed)
  }, [subscribed])

  const toggleSubscribe = () => {
    if (subscribed) {
      setCallbackForSubscription(() => {
        if (isSubscribedOnServer) {
          currentProfile.unsubscribeFromUser()
          setIsSubscribedOnServer(false)
        }
      })

      setSubscribed(false)
    } else {
      setCallbackForSubscription(() => {
        if (!isSubscribedOnServer) {
          currentProfile.subscribeOnUser()
          setIsSubscribedOnServer(true)
        }
      })
      setSubscribed(true)
    }
  }

  const newStatusHandle = (e: InputChange) => {
    setNewStatus(e.target.value)
  }

  const updateStatus = async () => {
    if (newStatus.length > 50) {
      toast.warn(`Слишком много символов: ${newStatus.length} из 50`)
      return
    }
    await me.updateStatus(newStatus.trim())
    toggleHeaderModalHandle()
  }

  const toggleHeaderModalHandle = () => {
    setShowHeaderModal((prev) => !prev)
  }

  const changeThemeHandle = async (color: HeaderTheme) => {
    await me.updateTheme(color)
    toggleHeaderModalHandle()
  }

  const logoutHandle = () => {
    localStorage.removeItem(StorageKeys.AUTH)
    sessionStorage.removeItem(StorageKeys.AUTH)
    location.reload()
  }

  return (
    <div className={classes.ProfileInfo}>
      <div className={`${classes.header} ${classes[`${headerTheme}`]}`}>
        {isMe && (
          <button
            onClick={toggleHeaderModalHandle}
            className={classes.changeHeaderTheme}
          />
        )}
        <img className={classes.avatar} src={avatar?.src} alt={avatar?.alt} />
        <div className={classes.texts}>
          <h3 className={classes.name}>{login}</h3>
          <span className={classes.status}>🔥 {status} 🔥</span>
        </div>
        {!isMe && me.login && (
          <div className={classes.subscribe}>
            <button
              className={clsx({ [classes.active]: subscribed })}
              onClick={toggleSubscribe}
            >
              {subscribed
                ? t(i18Keys.UNSUBSCRIBE, DEFAULT_NS)
                : t(i18Keys.SUBSCRIBE, DEFAULT_NS)}
            </button>
          </div>
        )}
      </div>
      <div className={classes.content}>
        <div className={classes.stats}>
          <span>{t(i18KeysProfile.REGISTRATION_DATE)}: 20.12.2023</span>
          <span>
            {t(i18KeysProfile.ROLE)}:{' '}
            {t(systemRole as keyof typeof i18Keys, DEFAULT_NS)}
          </span>
        </div>
        {isMe && (
          <div className={classes.settings}>
            <div className={classes.widgets}>
              <LangSwitcher />
              <ThemeSwitcher />
            </div>

            <button onClick={logoutHandle} className={classes.logout}>
              Выйти из профиля
            </button>
          </div>
        )}
      </div>
      {showHeaderModal && (
        <Modal onclose={toggleHeaderModalHandle}>
          <div className={classes.modal_wrapper}>
            <div className={classes.themes}>
              {[
                ...Object.values(HeaderTheme).map((color) => (
                  <HeaderColor
                    color={color}
                    isChecked
                    key={color}
                    onChange={changeThemeHandle}
                  />
                )),
              ]}
            </div>
            <div className={classes.newStatus}>
              <input type="text" value={newStatus} onChange={newStatusHandle} />
              <button onClick={updateStatus}>Save</button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
})

export default ProfileInfo
