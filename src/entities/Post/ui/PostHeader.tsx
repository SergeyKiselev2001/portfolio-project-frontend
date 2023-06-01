import classes from './Post.module.scss'

interface IPostHeader {
  id: number
  title: string
  timestamp: number
  author: {
    name: string
    id: number
    avatar: {
      src: string
      alt: string
    }
  }
}

const PostHeader = (props: IPostHeader) => {
  const { id, title, timestamp, author } = props
  const { avatar, name } = author

  return (
    <div className={classes.PostHeader}>
      <div className={classes.leftHeader}>
        <img className={classes.avatar} {...avatar} />
        <div className={classes.info}>
          <a rel="noreferrer" target="_blank" href={`/user/${name}`}>
            {name}
          </a>
          <time dateTime="<дата и время>">{timestamp}</time>
        </div>
      </div>
      <div className={classes.rightHeader}>right</div>
    </div>
  )
}

export default PostHeader
