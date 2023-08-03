import { withHeader } from '@shared/hocs/withHeader'
import classes from './PostPage.module.scss'
import { useParams } from 'react-router'
import { useEffect, useState } from 'react'
import { Comments, comments } from '@entities/Comments'
import { QueryParams } from '@app/config/router'
import { Post, posts } from '@entities/Post'
import { observer } from 'mobx-react-lite'
import { PostSkeleton } from '@entities/PostSkeleton'
import { BlockSideInfo, blockSideInfo } from '@widgets/BlockSideInfo'
import { Modal } from '@widgets/Modal'
import { Login } from '@widgets/Login'

const PostPage = observer(() => {
  const params = useParams() as unknown as {
    id: string
  }

  const [myComment, setMyComment] = useState('')

  const changeComment = (e: InputChange) => {
    setMyComment(e.target.value)
  }

  const sendComment = (e: React.MouseEvent) => {
    e.preventDefault()
    comments.sendComment({
      post_id: +params.id,
      text: myComment,
    })
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

  return (
    <div className={classes.PostPage}>
      <div className={classes.content_wrapper}>
        <div className={classes.content}>
          {posts.posts.length > 0 ? (
            <Post isPostPage {...posts.posts[0]} isLast={false} />
          ) : (
            <PostSkeleton />
          )}
          <Comments comments={comments.comments} />
          <form className={classes.sendComment}>
            <input value={myComment} onChange={changeComment} type="text" />
            <button onClick={sendComment}>send comment</button>
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
