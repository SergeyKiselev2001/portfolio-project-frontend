/* eslint-disable max-len */
import { withHeader } from '@shared/hocs/withHeader'
import classes from './MainPage.module.scss'
import { Post, posts } from '@entities/Post'
import { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { HeaderPage } from '@shared/hocs/withHeader'
import { QueryParams, RouterPaths } from '@app/config/router'
import { Modal } from '@widgets/Modal'
import { Login } from '@widgets/Login'
import { mainPage } from '..'
import { useSearchParams } from 'react-router-dom'
import { Controller } from '@widgets/Controller'
import { PostSkeleton } from '@entities/PostSkeleton'

const MainPage = observer(() => {
  const [spinner, setSpinner] = useState(true)
  const [searchParams] = useSearchParams()
  const [showNewSkeletons, setShowNewSkeletons] = useState(false)

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

  const getNextPosts = () => {
    setShowNewSkeletons(true)
    ;(async () => {
      await posts.getNextPosts([
        [QueryParams.TAGS, searchParams.get(QueryParams.TAGS)],
      ])

      setShowNewSkeletons(false)
    })()
  }

  return (
    <div className={classes.MainPage}>
      <Controller />
      <div className={classes.content_wrapper}>
        {spinner && (
          <>
            <PostSkeleton />
            <PostSkeleton />
            <PostSkeleton />
          </>
        )}
        {!spinner &&
          (posts.posts.length ? (
            posts.posts.map((post, index) => (
              <Post
                key={post.id}
                {...post}
                {...{ getNextPosts }}
                isLast={index == posts.posts.length - 1}
              />
            ))
          ) : (
            <h1>Посты не найдены</h1>
          ))}
        {showNewSkeletons && (
          <>
            <PostSkeleton />
            <PostSkeleton />
          </>
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
