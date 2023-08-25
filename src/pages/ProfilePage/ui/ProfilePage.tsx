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
import { me } from '@entities/me'
import { clsx } from '@shared/utils'
import { UserPosts } from './UserPosts'
import { UserSaved } from './UserSaved'
import { UserSubscriptions } from './UserSubscriptions'
import { blockSideInfo } from '@widgets/BlockSideInfo'
import { Modal } from '@widgets/Modal'
import { Login } from '@widgets/Login'
import { observer } from 'mobx-react-lite'
import { ScrollUp } from '@widgets/ScrollUp'
import { UserSubscribers } from './UserSubscribers'
import {
  i18Chunks,
  i18KeysHeader,
  i18KeysProfile,
} from '@widgets/LangSwitcher/types/i18Keys'

const ProfilePage = observer(() => {
  const params = useParams() as {
    user: string
  }

  enum ActivePage {
    POSTS,
    SUBSCRIBERS,
    SUBSCRIPTIONS,
    SAVED,
  }

  const [activePage, setActivePage] = useState(ActivePage.POSTS)
  const [spinner, setSpinner] = useState(true)
  const { t } = useTranslation()

  const isMe = me.login == user.login

  useEffect(() => {
    if (params?.user[0] != '@') {
      return
    }

    setActivePage(ActivePage.POSTS)

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

  const setActive = (page: ActivePage) => {
    setActivePage(page)
  }

  const closeModal = () => {
    blockSideInfo.toggleLoginModal()
  }

  const onLogin = () => {
    blockSideInfo.toggleLoginModal()
    const body = document.getElementsByTagName('body')[0]
    body.style.overflow = 'auto'
    location.reload()
  }

  return (
    <div className={classes.ProfilePage}>
      {!spinner && !user.login && (
        <ErrorPage message={`${t(i18Keys.USER_NOT_FOUND)}`} />
      )}

      {spinner && <Spinner />}
      {!spinner && user.login && (
        <>
          <ScrollUp />
          <div className={classes.profileInfoWrapper}>
            <ProfileInfo
              isSubscribed={Boolean(
                me.subscriptions.users.find((el) => el == user.login)
              )}
              user={user}
            />
          </div>
          <div className={classes.filters}>
            <button
              onClick={() => setActive(ActivePage.POSTS)}
              className={clsx({
                [classes.active_btn]: activePage == ActivePage.POSTS,
              })}
            >
              {t(i18KeysProfile.USER_POSTS, { ns: i18Chunks.PROFILE })}
            </button>
            <button
              onClick={() => setActive(ActivePage.SUBSCRIPTIONS)}
              className={clsx({
                [classes.active_btn]: activePage == ActivePage.SUBSCRIPTIONS,
              })}
            >
              {t(i18Keys.MY_SUBSCRIPTIONS)}
            </button>
            <button
              onClick={() => setActive(ActivePage.SUBSCRIBERS)}
              className={clsx({
                [classes.active_btn]: activePage == ActivePage.SUBSCRIBERS,
              })}
            >
              {t(i18Keys.SUBSCRIBERS)}
            </button>
            {isMe && (
              <button
                onClick={() => setActive(ActivePage.SAVED)}
                className={clsx({
                  [classes.active_btn]: activePage == ActivePage.SAVED,
                })}
              >
                {t(i18KeysProfile.SAVED, { ns: i18Chunks.PROFILE })}
              </button>
            )}
          </div>
          <div
            className={clsx(
              {
                [classes.hide_bgc]:
                  activePage == ActivePage.POSTS ||
                  activePage == ActivePage.SAVED,
              },
              classes.posts
            )}
          >
            {activePage == ActivePage.POSTS && (
              <UserPosts userName={user.login} />
            )}
            {activePage == ActivePage.SUBSCRIPTIONS && (
              <UserSubscriptions subscriptions={user.subscriptions} />
            )}
            {activePage == ActivePage.SUBSCRIBERS && <UserSubscribers />}
            {activePage == ActivePage.SAVED && <UserSaved />}
          </div>
        </>
      )}

      {blockSideInfo.showLoginModal && (
        <Modal onclose={closeModal}>
          <Login onLogin={onLogin} />
        </Modal>
      )}
    </div>
  )
})

export default withHeader(ProfilePage)
