import classes from './Post.module.scss'
import PostContent from './PostContent'
import { PostFooter } from './PostFooter'
import PostHeader from './PostHeader'
import { INewPost } from './schema'

const Post = (props: INewPost) => {
  const {
    id,
    title,
    author,
    commentsAmount,
    content,
    likesAmount,
    tags,
    timestamp,
    views,
    poll,
  } = props

  return (
    <div className={classes.Post}>
      <PostHeader {...{ id, author, timestamp, title }} />
      <PostContent {...{ content, poll }} />
      <PostFooter {...{ id, commentsAmount, likesAmount, tags, views }} />
    </div>
  )
}

export default Post
