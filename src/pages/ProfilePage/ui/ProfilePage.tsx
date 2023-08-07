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

const ProfilePage = observer(() => {
  const params = useParams() as {
    user: string
  }

  enum ActivePage {
    POSTS,
    SUBSCRIPTIONS,
    SAVED,
  }

  const [activePage, setActivePage] = useState(ActivePage.POSTS)

  const { t } = useTranslation()

  const [spinner, setSpinner] = useState(true)

  const isMe = me.login == user.login

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
      {spinner && <Spinner />}
      {!spinner && user.login && (
        <>
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
              Посты пользователя
            </button>
            <button
              onClick={() => setActive(ActivePage.SUBSCRIPTIONS)}
              className={clsx({
                [classes.active_btn]: activePage == ActivePage.SUBSCRIPTIONS,
              })}
            >
              Список подписок
            </button>
            {isMe && (
              <button
                onClick={() => setActive(ActivePage.SAVED)}
                className={clsx({
                  [classes.active_btn]: activePage == ActivePage.SAVED,
                })}
              >
                Сохраненные
              </button>
            )}
          </div>
          <div
            className={clsx(
              { [classes.hide_bgc]: activePage == ActivePage.POSTS },
              classes.posts
            )}
          >
            {activePage == ActivePage.POSTS && (
              <UserPosts userName={user.login} />
            )}
            {activePage == ActivePage.SUBSCRIPTIONS && (
              <UserSubscriptions subscriptions={user.subscriptions} />
            )}
            {activePage == ActivePage.SAVED && <UserSaved />}
          </div>
        </>
      )}

      {!spinner && !user.login && (
        <ErrorPage message={`${t(i18Keys.USER_NOT_FOUND)}`} />
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
