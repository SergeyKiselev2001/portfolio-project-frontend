import classes from './Post.module.scss'
import { IPost } from './schema'

const Post = (props: IPost) => {
  const { id, title, authorId, authorName, text, image } = props

  return (
    <div className={classes.Post}>
      <a href={`/media/${id}`} rel="noreferrer" target="_blank">
        {title}
      </a>
      <img {...image} />
    </div>
  )
}

export default Post
