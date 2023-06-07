/* eslint-disable max-len */
import { withHeader } from '@shared/hocs/withHeader'
import classes from './MainPage.module.scss'
import { Post, posts } from '@entities/Post'
import { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { HeaderPage } from '@shared/hocs/withHeader'
import { Spinner } from '@widgets/Spinner'
import { QueryParams, RouterPaths } from '@app/config/router'
import { Modal } from '@widgets/Modal'
import { Login } from '@widgets/Login'
import { mainPage } from '..'
import { useSearchParams } from 'react-router-dom'

const MainPage = observer(() => {
  const [spinner, setSpinner] = useState(true)
  const [searchParams] = useSearchParams()

  useEffect(() => {
    HeaderPage.setCurrentPage(RouterPaths.MAIN)
    ;(async () => {
      await posts.getPosts([
        [QueryParams.TAGS, searchParams.get(QueryParams.TAGS)],
      ])
      setSpinner(false)
    })()
  }, [])

  const closeModal = () => {
    mainPage.toggleLoginModal()
  }

  const onLogin = () => {
    mainPage.toggleLoginModal()
    const body = document.getElementsByTagName('body')[0]
    body.style.overflow = 'auto'
  }

  return (
    <div className={classes.MainPage}>
      <div className={classes.content_wrapper}>
        {spinner ? (
          <Spinner />
        ) : (
          posts.posts.map((post) => <Post key={post.id} {...post} />)
        )}
      </div>
      {mainPage.showLoginModal && (
        <Modal onclose={closeModal}>
          <Login onLogin={onLogin} />
        </Modal>
      )}
    </div>
  )
})

export default withHeader(MainPage)
