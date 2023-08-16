import { HeaderPage, withHeader } from '@shared/hocs/withHeader'
import classes from './SubscriptionsPage.module.scss'
import { QueryParams, RouterPaths } from '@app/config/router'
import { useEffect, useState } from 'react'
import { PostSkeleton } from '@entities/PostSkeleton'
import { Post, posts } from '@entities/Post'
import { BlockSideInfo, blockSideInfo } from '@widgets/BlockSideInfo'
import { Modal } from '@widgets/Modal'
import { Login } from '@widgets/Login'

const SubscriptionsPage = () => {
  const [spinner, setSpinner] = useState(true)
  const [showNewSkeletons, setShowNewSkeletons] = useState(false)

  useEffect(() => {
    posts.resetCurrentPage()
    HeaderPage.setCurrentPage(RouterPaths.SUBSCRIPTIONS)
    ;(async () => {
      await posts.getPosts([[QueryParams.SUBSCRIPTIONS, 'true']])
      setSpinner(false)
    })()
  }, [])

  const closeModal = () => {
    blockSideInfo.toggleLoginModal()
  }

  const onLogin = () => {
    blockSideInfo.toggleLoginModal()
    const body = document.getElementsByTagName('body')[0]
    body.style.overflow = 'auto'
    location.reload()
  }

  const getNextPosts = () => {
    setShowNewSkeletons(true)
    ;(async () => {
      await posts.getNextPosts([[QueryParams.SUBSCRIPTIONS, 'true']])
      setShowNewSkeletons(false)
    })()
  }

  return (
    <div className={classes.SubscriptionsPage}>
      <div className={classes.content_wrapper}>
        <div className={classes.posts}>
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
        <BlockSideInfo />
      </div>

      {blockSideInfo.showLoginModal && (
        <Modal onclose={closeModal}>
          <Login onLogin={onLogin} />
        </Modal>
      )}
    </div>
  )
}

export default withHeader(SubscriptionsPage)
