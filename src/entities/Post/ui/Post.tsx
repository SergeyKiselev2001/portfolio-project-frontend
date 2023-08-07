import { MutableRefObject, useEffect, useRef } from 'react'
import classes from './Post.module.scss'
import PostContent from './PostContent'
import { PostFooter } from './PostFooter'
import PostHeader from './PostHeader'
import { INewPost } from './schema'
import { useIntersection } from '@shared/hooks'
import { clsx } from '@shared/utils'
import { me } from '@entities/me'

const Post = (props: INewPost) => {
  const {
    isPostPage,
    isProfilePage,
    isLast,
    getNextPosts,
    id,
    title,
    author,
    commentsAmount,
    content,
    likesAmount,
    tags,
    timestamp,
    views,
    isLiked,
    isSaved,
  } = props

  const ref = useRef() as MutableRefObject<HTMLDivElement>
  const inViewport = useIntersection(ref, '-150px')

  useEffect(() => {
    if (inViewport && isLast) {
      getNextPosts()
    }
  }, [isLast, inViewport])

  return (
    <div
      ref={ref}
      className={clsx(
        { [classes.isProfilePage]: !!isProfilePage },
        classes.Post
      )}
      id={`post-${id}`}
    >
      <PostHeader {...{ author, isPostPage, id, timestamp }} />
      <PostContent {...{ content, id, title }} />
      <PostFooter
        {...{
          id,
          commentsAmount,
          isPostPage,
          likesAmount,
          tags,
          views,
          isLiked,
          isSaved,
        }}
      />
    </div>
  )
}

export default Post
