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
import { IComment, ICreateCommentDto } from '@entities/Comments/store/schema'
import { me } from '@entities/me'
import { clsx } from '@shared/utils'
import { toast } from 'react-toastify'
import { ScrollUp } from '@widgets/ScrollUp'

const PostPage = observer(() => {
  const params = useParams() as {
    id: string
  }

  const [currentComments, setCurrentComments] = useState([] as IComment[])
  const [showAllButton, setShowAllButton] = useState(false)
  const [isCommentPending, setIsCommentPending] = useState(false)
  const [isGettingRestComments, setIsGettingRestComments] = useState(false)
  const showRestRef = useRef(true)
  const addCommentRef = useRef() as React.MutableRefObject<HTMLFormElement>

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

    const myNewComment = {
      text: myComment,
      post_id: +params.id,
      user_id: me.id,
    } as ICreateCommentDto

    const onCreate = (createdComment: IComment) => {
      setCurrentComments([...currentComments, { ...createdComment }])
      setMyComment('')
      setIsCommentPending(false)
    }

    comments.sendComment(myNewComment, onCreate)
  }

  useEffect(() => {
    if (!comments.isCommentsReceived) {
      return
    }

    if (window.location.hash == '#comments') {
      setTimeout(() => {
        window.scrollTo({
          top:
            addCommentRef.current.getBoundingClientRect().top + window.scrollY,
          behavior: 'smooth',
        })
      }, 100)
    }
  }, [posts.posts, comments])

  useEffect(() => {
    comments.getComments([[QueryParams.POST_ID, params.id]])
    posts.getPostById(params.id)
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

  const showAllComments = async () => {
    setIsGettingRestComments(true)
    await comments.getRestComments([[QueryParams.POST_ID, params.id]])
    setIsGettingRestComments(false)
    setShowAllButton(false)
  }

  return (
    <div className={classes.PostPage}>
      <ScrollUp />
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
            <button
              disabled={isGettingRestComments}
              onClick={showAllComments}
              className={classes.show_all}
            >
              {`Показать оставшиеся комментарии (${
                comments.amountOfComments - comments.limit
              })`}
            </button>
          )}

          <form ref={addCommentRef} className={classes.sendComment}>
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
      </div>
    </div>
  )
})

export default withHeader(PostPage)
