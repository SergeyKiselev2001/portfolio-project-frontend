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
    isLiked,
  } = props

  return (
    <div className={classes.Post} id={`post-${id}`}>
      <PostHeader {...{ author, id, timestamp }} />
      <PostContent {...{ content, id, poll, title }} />
      <PostFooter
        {...{ id, isLiked, commentsAmount, likesAmount, tags, views }}
      />
    </div>
  )
}

export default Post
