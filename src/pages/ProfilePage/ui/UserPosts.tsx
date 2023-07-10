import { QueryParams } from '@app/config/router'
import { Post, posts } from '@entities/Post'
import { PostSkeleton } from '@entities/PostSkeleton'
import { useState, useEffect } from 'react'

interface IUserPosts {
  userName: string
}

export const UserPosts = (props: IUserPosts) => {
  const { userName } = props

  const [spinner, setSpinner] = useState(true)
  const [showNewSkeletons, setShowNewSkeletons] = useState(false)

  useEffect(() => {
    posts.resetCurrentPage()
    ;(async () => {
      await posts.getPosts([[QueryParams.LOGIN, userName]])
      setSpinner(false)
    })()
  }, [])

  const getNextPosts = () => {
    setShowNewSkeletons(true)
    ;(async () => {
      await posts.getNextPosts([[QueryParams.LOGIN, userName]])

      setShowNewSkeletons(false)
    })()
  }

  return (
    <>
      {spinner && (
        <>
          <PostSkeleton isProfilePage />
          <PostSkeleton isProfilePage />
          <PostSkeleton isProfilePage />
        </>
      )}
      {!spinner &&
        (posts.posts.length ? (
          posts.posts.map((post, index) => (
            <Post
              isProfilePage
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
          <PostSkeleton isProfilePage />
          <PostSkeleton isProfilePage />
        </>
      )}
    </>
  )
}
