import classes from './Post.module.scss'
import { ContentType } from './schema'

interface IPostContent {
  title: string
  id: number
  content: {
    type: ContentType
    text: string
    image?: {
      src: string
      alt: string
    }
  }[]
  poll?: {
    id: number
    name: string
    options: {
      id: number
      text: string
      numberOfVotes: number
    }[]
  }
}

const PostContent = (props: IPostContent) => {
  const { content, title, id, poll } = props

  console.log(id, content)

  return (
    <div className={classes.PostContent}>
      <div className={classes.title}>
        <a target="_blank" rel="noreferrer" href={`/media/${id}`}>
          {title}
        </a>
      </div>
      {content.map(({ text, type, image }) => (
        <>
          {type == ContentType.TEXT && (
            <span className={classes.text}>{text}</span>
          )}
          {type == ContentType.IMAGE && (
            <img src={image?.src} alt={image?.alt} />
          )}
          {type == ContentType.QUOTE && (
            <span className={classes.quote}>{text}</span>
          )}
        </>
      ))}
    </div>
  )
}

export default PostContent
