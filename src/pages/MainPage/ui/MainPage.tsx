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
import { useSearchParams } from 'react-router-dom'
import { Controller } from '@widgets/Controller'
import { PostSkeleton } from '@entities/PostSkeleton'
import { BlockSideInfo, blockSideInfo } from '@widgets/BlockSideInfo'
import { useTranslation } from 'react-i18next'
import { i18Chunks } from '@widgets/LangSwitcher/types/i18Keys'
import { clsx } from '@shared/utils'
import { ScrollUp } from '@widgets/ScrollUp'
import { tagClasses } from '@entities/Tag'

const MainPage = observer(() => {
  const [spinner, setSpinner] = useState(true)
  const [searchParams] = useSearchParams()
  const [showNewSkeletons, setShowNewSkeletons] = useState(false)
  const { t } = useTranslation(i18Chunks.TAGS)

  useEffect(() => {
    posts.resetCurrentPage()
    HeaderPage.setCurrentPage(RouterPaths.MAIN)
    ;(async () => {
      await posts.getPosts([
        [QueryParams.TAG, searchParams.get(QueryParams.TAG)],
      ])
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
      await posts.getNextPosts([
        [QueryParams.TAG, searchParams.get(QueryParams.TAG)],
      ])

      setShowNewSkeletons(false)
    })()
  }

  return (
    <div className={classes.MainPage}>
      {/* <Controller /> */}
      <ScrollUp />
      <div className={classes.content_wrapper}>
        <div className={classes.posts}>
          {searchParams.get(QueryParams.TAG) && (
            <h3 className={classes.filter_block}>
              Поиск по тегу:{' '}
              <span
                className={clsx([
                  tagClasses[searchParams.get(QueryParams.TAG) as string],
                  classes.tag,
                ])}
              >
                {t(searchParams.get(QueryParams.TAG) as string)}
              </span>
            </h3>
          )}
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
})

export default withHeader(MainPage)
