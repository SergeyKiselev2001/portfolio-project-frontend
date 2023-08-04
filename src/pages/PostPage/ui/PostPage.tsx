import { withHeader } from '@shared/hocs/withHeader'
import classes from './PostPage.module.scss'
import { useParams } from 'react-router'
import { useEffect, useState, useRef } from 'react'
import { Comments, comments } from '@entities/Comments'
import { QueryParams } from '@app/config/router'
import { Post, posts } from '@entities/Post'
import { observer } from 'mobx-react-lite'
import { PostSkeleton } from '@entities/PostSkeleton'
import { BlockSideInfo, blockSideInfo } from '@widgets/BlockSideInfo'
import { Modal } from '@widgets/Modal'
import { Login } from '@widgets/Login'
import { IComment } from '@entities/Comments/store/schema'
import { me } from '@entities/me'
import { clsx } from '@shared/utils'
import { toast } from 'react-toastify'

const PostPage = observer(() => {
  const params = useParams() as unknown as {
    id: string
  }

  const [currentComments, setCurrentComments] = useState([] as IComment[])
  const [showAllButton, setShowAllButton] = useState(false)
  const [isCommentPending, setIsCommentPending] = useState(false)
  const showRestRef = useRef(true)

  useEffect(() => {
    setCurrentComments(comments.comments)

    if (showRestRef.current && comments.amountOfComments) {
      setShowAllButton(comments.amountOfComments > comments.limit)
      showRestRef.current = false
    }
  }, [comments.comments])

  const [myComment, setMyComment] = useState('')

  const changeComment = (e: InputChange) => {
    setMyComment(e.target.value)
  }

  const sendComment = async () => {
    if (!me.login) {
      blockSideInfo.toggleLoginModal()
      return
    }

    if (myComment.length < 3) {
      toast.error('Комментарий должен содержать более 3х символов')
      return
    }

    setIsCommentPending(true)

    const { avatar, id, login } = me

    const myNewComment = {
      text: myComment,
      post_id: +params.id,
      likes: 0,
      timestamp: +new Date(),
      author: { name: login, id, avatar },
    } as Omit<IComment, 'id'>

    await comments.sendComment(myNewComment)

    setCurrentComments([
      ...currentComments,
      { ...myNewComment, id: Math.random() },
    ])

    setMyComment('')
    setIsCommentPending(false)
  }

  useEffect(() => {
    comments.getComments([[QueryParams.POST_ID, params.id]])
    posts.getPostById(params.id)
    posts.addViewCounter(params.id)
  }, [])

  const closeModal = () => {
    blockSideInfo.toggleLoginModal()
  }

  const onLogin = () => {
    blockSideInfo.toggleLoginModal()
    const body = document.getElementsByTagName('body')[0]
    body.style.overflow = 'auto'
  }

  const showAllComments = async () => {
    await comments.getRestComments([[QueryParams.POST_ID, params.id]])
    setShowAllButton(false)
  }

  return (
    <div className={classes.PostPage}>
      <div className={classes.content_wrapper}>
        <div className={classes.content}>
          {posts.posts.length > 0 ? (
            <Post isPostPage {...posts.posts[0]} isLast={false} />
          ) : (
            <PostSkeleton />
          )}
          {currentComments.length > 0 && (
            <Comments comments={currentComments} />
          )}
          {showAllButton && (
            <button onClick={showAllComments} className={classes.show_all}>
              {`Показать оставшиеся комментарии (${
                comments.amountOfComments - comments.limit
              })`}
            </button>
          )}

          <form className={classes.sendComment}>
            <textarea
              placeholder="Введите текст комментария..."
              className={classes.textarea}
              value={myComment}
              onChange={changeComment}
            />
            <button
              className={clsx({ [classes.pending]: isCommentPending })}
              type="button"
              disabled={isCommentPending}
              onClick={sendComment}
            >
              Отправить
            </button>
          </form>
        </div>
        <BlockSideInfo />

        {blockSideInfo.showLoginModal && (
          <Modal onclose={closeModal}>
            <Login onLogin={onLogin} />
          </Modal>
        )}
        {/* <h1>Comments section</h1>
        <h1>Send comment</h1> */}
      </div>
    </div>
  )
})

export default withHeader(PostPage)
